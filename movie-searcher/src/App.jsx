import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import { useState, useRef, useEffect } from "react";

function useSearch() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState();
  const isFirstInput = useRef(true);

  function updateSearch(newSearch) {
    setSearch(newSearch);
  }

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }

    if (search === "") {
      setError("You can't search for a movie without a title.");
      return;
    }

    if (search.match(/^\d+$/)) {
      setError("You can't search for a movie using a number.");
      return;
    }

    if (search.length < 3) {
      setError("You must enter at least 3 characters.");
      return;
    }

    setError(null);
  }, [search]);

  return { search, updateSearch, error };
}

function App() {
  const { search, updateSearch, error } = useSearch();
  const { movies, getMovies, loading } = useMovies({ search });

  function handleSubmit(event) {
    event.preventDefault();
    getMovies();
  }

  function handleChange(event) {
    updateSearch(event.target.value);
  }

  return (
    <div className="page">
      <h1>Movie Searcher</h1>

      <header>
        <form onSubmit={handleSubmit} className="form">
          <input
            name="search"
            onChange={handleChange}
            value={search}
            style={{
              border: "1px solid",
              borderColor: error ? "red" : "transparent",
            }}
            placeholder="Star Wars, Sinners, The Godfather ..."
          />

          <button type="submit">Search</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>

      <main>{loading ? <p>Loading...</p> : <Movies movies={movies} />}</main>
    </div>
  );
}

export default App;
