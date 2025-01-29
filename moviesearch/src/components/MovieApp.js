import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';

function MovieApp() {
    const API_KEY = "6afed51a";
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [savedMovies, setSavedMovies] = useState({});

    const popularTeluguMovies = [
        "Avengers", "Batman", "Spider-Man", "Star Wars", "Harry Potter",
        "Superman", "Fast and Furious", "The Matrix", "Mission Impossible",
        "James Bond", "Deadpool", "Black Panther", "Inception", "Joker"
    ];

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSaveClick = (imdbID) => {
        setSavedMovies((prevState) => ({
            ...prevState,
            [imdbID]: !prevState[imdbID], // Toggle state for only this movie
        }));
    };

    const fetchMoviesByKeyword = async (keyword) => {
        let fetchedMovies = [];
        try {
            for (let page = 1; page <= 5; page++) { // Fetch multiple pages
                const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${keyword}&page=${page}`;
                const response = await fetch(url);
                const data = await response.json();

                if (data.Response === "True") {
                    fetchedMovies = [...fetchedMovies, ...data.Search];
                } else {
                    break; // Stop if no more results
                }

                // 🔹 Stop early if we already have enough movies
                if (fetchedMovies.length >= 100) break;
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
        return fetchedMovies;
    };

    useEffect(() => {
        const fetchPopularMovies = async () => {
            setLoading(true);
            try {
                let allMovies = [];

                // Fetch multiple pages to get more movies (OMDB allows only 10 results per page)
                for (let page = 1; page <= 5; page++) {
                    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=Telugu&page=${page}`;
                    const response = await fetch(url);
                    const data = await response.json();

                    if (data.Response === "True") {
                        allMovies = [...allMovies, ...data.Search];
                    } else {
                        break; // Stop fetching if no more results
                    }
                }

                // Fetch detailed data for each movie
                const detailedMovies = await Promise.all(
                    allMovies.slice(0, 20).map(async (movie) => { // Adjust count as needed
                        const detailsUrl = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}&plot=short`;
                        const detailsResponse = await fetch(detailsUrl);
                        return await detailsResponse.json();
                    })
                );

                setMovies(detailedMovies);
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPopularMovies();
    }, []);

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
