export const TRENDING_IDS = [
  'tt15398776', // Oppenheimer
  'tt15239678', // Dune: Part Two
  'tt1517268', // Barbie
  'tt1630029', // Avatar: The Way of Water
  'tt1877830', // The Batman
  'tt1745960', // Top Gun: Maverick
  'tt10872600', // Spider-Man: No Way Home
  'tt9362722', // Everything Everywhere All at Once
  'tt0468569', // The Dark Knight
  'tt4154756', // Avengers: Infinity War
] as const;

export const TOP_RATED_IDS = [
  'tt0111161', // The Shawshank Redemption
  'tt0068646', // The Godfather
  'tt0468569', // The Dark Knight
  'tt0071562', // The Godfather Part II
  'tt0050083', // 12 Angry Men
  'tt0108052', // Schindler's List
  'tt0167260', // The Lord of the Rings: The Return of the King
  'tt0110912', // Pulp Fiction
  'tt0080684', // Star Wars: Episode V - The Empire Strikes Back
  'tt0060196', // The Good, the Bad and the Ugly
] as const;

export const RECOMMENDATION_CANDIDATE_IDS = [
  'tt0111161',
  'tt0068646',
  'tt0468569',
  'tt0816692',
  'tt1630029',
  'tt1345836',
  'tt0109830',
  'tt0110357',
  'tt1375666',
  'tt0167260',
  'tt0120915',
  'tt0088763',
  'tt0477347',
  'tt5311514',
  'tt6751668',
] as const;

export const CLASSIC_IDS = TOP_RATED_IDS;

export const CURATED_MOVIE_IDS = [
  ...new Set([...TRENDING_IDS, ...TOP_RATED_IDS, ...RECOMMENDATION_CANDIDATE_IDS]),
];
