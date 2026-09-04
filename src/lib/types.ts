export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

export const FAV_LISTS = ['favorite', 'watchlist', 'watched'] as const;
export type FavList = (typeof FAV_LISTS)[number];

export function isFavList(value: unknown): value is FavList {
  return typeof value === 'string' && (FAV_LISTS as readonly string[]).includes(value);
}

export interface UserFavItem {
  movieId: string;
  title: string;
  image: string;
  description: string;
  dateReleased: string;
  rating: string;
  list: FavList;
}

export interface RecentlyViewedItem {
  movieId: string;
  title: string;
  image: string;
  year: string;
}

export interface MovieDetail extends Movie {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: { Source: string; Value: string }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
}

export function toMovie(movie: Pick<MovieDetail, keyof Movie>): Movie {
  return {
    imdbID: movie.imdbID,
    Title: movie.Title,
    Year: movie.Year,
    Type: movie.Type,
    Poster: movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : '',
  };
}

export function favItemToMovie(fav: UserFavItem): Movie {
  return {
    imdbID: fav.movieId,
    Title: fav.title,
    Year: fav.dateReleased,
    Type: 'movie',
    Poster: fav.image || '',
  };
}
