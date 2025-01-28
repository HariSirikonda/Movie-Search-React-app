import React, { useState } from 'react';

function MovieApp() {
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = async () => {
        if (!searchQuery.trim()) {
            alert('Please enter a movie name.');
            return;
        }

        setLoading(true);

        try {
            const url = `https://www.omdbapi.com/?apikey=6afed51a&s=${searchQuery}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data)

            if (!response.ok || data.Response === "False") {
                alert(data.Error || "Movie not found.");
                setMovies([]);
                return;
            }

            setMovies(data.Search);
        } catch (error) {
            console.error("Error fetching movies:", error.message);
            alert("Failed to fetch movie data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="movie-app">
            <header className="text-center m-4">
                <h1 className="text-success">Movies Hub</h1>
            </header>
            <div className="container d-flex align-items-center justify-content-center mb-1 border">
                <input
                    className="form-control m-2 rounded-pill shadow-none"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Enter movie name"
                    type="text"
                />
                <button
                    className="btn btn-primary rounded-pill"
                    onClick={handleSearchSubmit}
                    disabled={loading}
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>

            <div className="container">
                {loading ? (
                    <p>Loading movies...</p>
                ) : movies.length > 0 ? (
                    <ul className="list-group">
                        {movies.map((movie) => (
                            <li key={movie.imdbID} className="list-group-item">
                                {movie.Title} ({movie.Year})
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No movies found. Try searching for something else!</p>
                )}
            </div>
        </div>
    );
}

export default MovieApp;
