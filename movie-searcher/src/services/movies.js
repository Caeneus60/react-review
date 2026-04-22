const BASE_DATA_URL = "http://www.omdbapi.com/";
const OMDB_API_KEY = "970e37d1";

export const searchMovies = async ({ search }) => {
  if (search === "") return null;

  try {
    const response = await fetch(
      `${BASE_DATA_URL}?apikey=${OMDB_API_KEY}&s=${search}`,
    );
    const data = await response.json();
    const movies = data.Search;

    const mappedMovies = movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    }));

    return mappedMovies;
  } catch (error) {
    throw new Error(`Error searching movies: ${error}`);
  }
};
