function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

let omdbApiKey: string | null = null;
export function getOmdbApiKey(): string {
  if (!omdbApiKey) {
    omdbApiKey = requireEnv('OMDB_API_KEY');
  }
  return omdbApiKey;
}

let mongoUri: string | null = null;
export function getMongoUri(): string {
  if (!mongoUri) {
    mongoUri = requireEnv('MONGODB_URI');
  }
  return mongoUri;
}
