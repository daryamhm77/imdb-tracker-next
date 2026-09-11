# IMDb Tracker

A personal movie companion for logging watches, saving favorites, and discovering what to watch next. Search the OMDb catalog, keep lists in MongoDB, and sign in with Clerk.

## What it does

IMDb Tracker is a Next.js app for film fans who want a persistent, private log of what they watch.

- Browse curated **Trending** and **Top Rated** lists
- Search OMDb by title, year, and type (movie, series, episode)
- Open a title for full plot, cast, ratings, and poster
- Sign in to save **favorites**, a **watchlist**, and **watched** titles
- See a **dashboard** of stats, recently viewed, and top-rated picks
- Get **recommendations** from your high-rated titles

Public catalog pages work without an account. Lists, dashboard, and recommendations require sign-in.

## Features

| Feature | Details |
| --- | --- |
| Catalog | Curated trending / top-rated IDs, search with filters and pagination |
| Title pages | Full OMDb metadata, ISR cache (1 hour) for popular IDs |
| Auth | Clerk sign-in / sign-up, middleware protection for private routes |
| Lists | Toggle favorite, watchlist, and watched independently per title |
| History | Recently viewed is recorded when you open a title |
| Dashboard | Counts, average rating, recently viewed, top-rated favorites |
| Home | Marketing shell plus streamed watchlist, stats, and recommendations |
| Theme | Light / dark via `next-themes` |

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 4 |
| Auth | Clerk (`@clerk/nextjs`) |
| Database | MongoDB + Mongoose |
| Movie data | [OMDb API](https://www.omdbapi.com/) |
| Hosting | Vercel (Node 20+) |
| Local DB | Docker Compose (`mongo:7` on port 27017) |

## Architecture

Data and UI are split so pages stay thin and fetching lives in one place.

```
src/
├── app/                 # Routes, layouts, API handlers
├── components/
│   ├── templates/       # Page shells (marketing, app, catalog, auth)
│   ├── ui/              # Primitives (Button, MovieGrid, Section, …)
│   ├── home/            # Home sections
│   ├── layout/          # Header, search, theme switch
│   ├── movie/           # Cards, detail, lists, recommendations
│   ├── user/            # Dashboard, favorites, stats, watchlist
│   ├── search/          # Filters and pagination
│   ├── marketing/       # Feature/step grids, auth CTAs
│   └── providers/       # Theme and toast
├── content/             # Static copy for home and about
├── lib/
│   ├── api/             # OMDb client and curated collections
│   ├── services/        # Recommendations, user lists, home personal data
│   ├── actions/         # Clerk ↔ Mongo user sync
│   ├── mongodb/         # Connection cache (serverless-safe)
│   ├── models/          # Mongoose schemas
│   └── constants/       # Curated IMDb IDs, poster fallbacks
└── middleware.ts        # Clerk auth for private routes
```

### Rendering

| Route | Strategy |
| --- | --- |
| `/about` | Static |
| `/top/trending`, `/top/top_rated` | SSG + ISR |
| `/movie/[id]` | ISR; popular IDs prerendered, others on demand |
| `/` | Dynamic; catalog islands stream in Suspense |
| `/search/[term]` | SSR (query-specific) |
| `/dashboard`, `/favorites` | SSR (auth + Mongo) |
| `/api/user/*`, `/api/webhooks` | Dynamic API |

### Data flow

- **OMDb** is the source of truth for public movie metadata. Successful responses are cached; failures are not, so a rate limit does not stick for an hour.
- **MongoDB** stores each user’s lists and recently viewed items. Clerk `id` maps to `clerkId`; Mongo `_id` is stored in Clerk `publicMetadata.userMongoId`.
- **Clerk** handles sessions. Middleware protects `/dashboard`, `/favorites`, and `/api/user/*`. Webhooks keep Mongo users in sync on create / update / delete.

Private reads on the home page run on the server (`getHomePersonalData`) instead of three client waterfalls. List toggles still go through `/api/user/fav` because they are interactive.

## Clean code conventions

- **Pages compose templates.** They fetch data and pass props; layout and empty states live in `components/templates`.
- **Services own business rules.** Recommendations, list toggles, and dashboard stats are not inlined in route handlers.
- **Shared types.** `FavList`, `Movie`, and `UserFavItem` live in `src/lib/types.ts`.
- **Env is lazy.** `OMDB_API_KEY` and `MONGODB_URI` load on first use so importing a module does not crash the whole app.
- **UI is grouped by role** (`ui`, `layout`, `movie`, `user`, …), not a flat component dump.
- **Auth is centralized.** API routes use `requireApiUser()`; pages use `currentUser()` plus middleware.

## Getting started

**Requirements:** Node 20+, Docker (for local Mongo), an [OMDb API key](https://www.omdbapi.com/apikey.aspx), and a [Clerk](https://dashboard.clerk.com/) application.

```bash
git clone https://github.com/daryamhm77/imdb-tracker-next.git
cd imdb-tracker-next
npm install
cp .env.example .env.local
```

Fill `.env.local` (see below), start Mongo, then run the app:

```bash
docker compose up -d
npm run dev
```

Open [http://localhost:4001](http://localhost:4001).

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on port 4001 |
| `npm run build` | Production build |
| `npm start` | Serve the production build on port 4001 |
| `npm run lint` | ESLint |

## Environment variables

Copy `.env.example` to `.env.local`. Never commit `.env.local`.

| Variable | Required | Notes |
| --- | --- | --- |
| `MONGODB_URI` | Yes | Local: `mongodb://localhost:27017/imdb-tracker`. On Vercel use MongoDB Atlas. |
| `OMDB_API_KEY` | Yes | Needed at **build and runtime** (movie pages are prerendered). |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes | Clerk Frontend API key |
| `CLERK_SECRET_KEY` | Yes | Clerk secret key |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Yes | `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Yes | `/sign-up` |
| `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL` | Yes | `/` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL` | Yes | `/` |
| `CLERK_WEBHOOK_SIGNING_SECRET` | For sync | Clerk → Webhooks → signing secret |

Clerk webhook endpoint: `https://YOUR_DOMAIN/api/webhooks` (local: your tunnel, production: `https://YOUR_APP.vercel.app/api/webhooks`).

## Deploy on Vercel

1. Import the GitHub repo. Framework: **Next.js**, Node **20**.
2. Add the env vars above for Production, Preview, and Development.
3. Set `MONGODB_URI` to an Atlas connection string (allow `0.0.0.0/0` in Atlas Network Access). Localhost will not work on Vercel.
4. In Clerk → **Domains**, add `https://YOUR_APP.vercel.app`.
5. In Clerk → **Webhooks**, point to `https://YOUR_APP.vercel.app/api/webhooks`.
6. Redeploy after saving `NEXT_PUBLIC_*` keys so they are inlined in the client bundle.

## License

Private project. All rights reserved.
