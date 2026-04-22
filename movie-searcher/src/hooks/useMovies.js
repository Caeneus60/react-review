import { useState } from "react";
import { searchMovies } from "../services/movies";
import { useRef } from "react";

export function useMovies({ search }) {
  const [movies, setmovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previousSearch = useRef(search);

  const getMovies = async () => {
    if (search === previousSearch.current) return;

    try {
      setLoading(true);
      setError(null);
      previousSearch.current = search;
      const newMovies = await searchMovies({ search });
      setmovies(newMovies);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  return { movies, getMovies, loading, error };
}
