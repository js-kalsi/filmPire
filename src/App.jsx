import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./assets/search.svg";
import MovieCard from "./MovieCard";

const API_URL = "https://www.omdbapi.com?apikey=<ADD API KEY>";

function App() {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState("");
  const searchMovies = async (title) => {
    setMovie(title);
    if (title === "") {
      setMovies([]);
      return;
    }
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    if (data.Search === null || data.Search === undefined) return;
    setMovies(data.Search);
  };

  const MovieContainer = () =>
    movies.map((m) => <MovieCard key={movie.imdbID} movie={m} />);

  useEffect(() => {
    searchMovies(movie);
  }, [movie]);

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Search for movies"
          value={movie}
          onChange={(e) => {
            setMovie(e.target.value);
          }}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => {
            searchMovies(movie);
          }}
        />
      </div>
      <div className="container">
        {movies.length > 0 ? (
          <MovieContainer />
        ) : (
          <div className="empty">
            <h2>No movies found!</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
