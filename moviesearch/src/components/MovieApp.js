import React, { useState } from 'react';
import MovieCard from './MovieCard';

function MovieApp() {
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [savedMovies, setSavedMovies] = useState({});

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSaveClick = (imdbID) => {
        setSavedMovies((prevState) => ({
            ...prevState,
            [imdbID]: !prevState[imdbID], // Toggle state for only this movie
        }));
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

            if (data.Response === "True") {
                // Fetch detailed movie data for each movie in the search results
                const detailedMovies = await Promise.all(
                    data.Search.map(async (movie) => {
                        const detailedUrl = `https://www.omdbapi.com/?apikey=6afed51a&i=${movie.imdbID}&plot=short`;
                        const detailedResponse = await fetch(detailedUrl);
                        const detailedData = await detailedResponse.json();
                        return detailedData;
                    })
                );
                setMovies(detailedMovies);
            } else {
                alert(data.Error || "Movie not found.");
                setMovies([]);
            }
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
            <div className="container d-flex align-items-center justify-content-center mb-1">
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
            <div className="container mt-4 mb-4">
                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : movies.length > 0 ? (
                    <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
                        {movies.map((movie) => (
                            <MovieCard
                                key={movie.imdbID}
                                movie={movie}
                                isSaved={savedMovies[movie.imdbID]}
                                onSaveClick={handleSaveClick}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-center">No movies found.</p>
                )}
            </div>
        </div>
    );
}

export default MovieApp;
