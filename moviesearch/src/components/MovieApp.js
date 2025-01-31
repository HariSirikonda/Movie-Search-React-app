import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';

function MovieApp() {
    const API_KEY = "6afed51a";
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [savedMovies, setSavedMovies] = useState({});

    const popularTeluguMovies = [
        "Baahubali", "RRR", "Pushpa", "Ala Vaikunthapurramuloo", "Sarileru Neekevvaru",
        "Arjun Reddy", "Geetha Govindam", "Maharshi", "Eega", "Magadheera",
        "Gabbar Singh", "Pokiri", "Athadu", "Jalsa", "Temper"
    ];

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSaveClick = (imdbID) => {
        setSavedMovies((prevState) => ({
            ...prevState,
            [imdbID]: !prevState[imdbID], // Toggle saved state
        }));
    };



    // Fetch movies using a given keyword
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

                if (fetchedMovies.length >= 100) break; // Stop if we have enough movies
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
        return fetchedMovies;
    };

    // Fetch popular Telugu movies on initial load
    useEffect(() => {
        const fetchPopularMovies = async () => {
            setLoading(true);
            try {
                let allMovies = [];

                for (const keyword of popularTeluguMovies) {
                    const movies = await fetchMoviesByKeyword(keyword);
                    allMovies = [...allMovies, ...movies];

                    if (allMovies.length >= 100) break; // Stop early if we have enough
                }

                // Fetch detailed movie data
                const detailedMovies = await Promise.all(
                    allMovies.slice(0, 100).map(async (movie) => {
                        const detailsUrl = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}&plot=short`;
                        const detailsResponse = await fetch(detailsUrl);
                        return await detailsResponse.json();
                    })
                );

                setMovies(detailedMovies);
                console.log(detailedMovies);
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
            const movies = await fetchMoviesByKeyword(searchQuery);

            if (movies.length > 0) {
                // Fetch detailed movie data
                const detailedMovies = await Promise.all(
                    movies.map(async (movie) => {
                        const detailedUrl = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}&plot=short`;
                        const detailedResponse = await fetch(detailedUrl);
                        return detailedResponse.json();
                    })
                );
                setMovies(detailedMovies);
                console.log(detailedMovies);
            } else {
                alert("Movie not found.");
                setMovies([]);
            }
        } catch (error) {
            console.error("Error fetching movies:", error.message);
            alert("Failed to fetch movie data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSearchSubmit();
        }
    };

    return (
        <div className="movie-app">
            <header className="text-center m-4">
                <h1 className="text-success">CHITRAVAHINI</h1>
            </header>
            <div className="container d-flex align-items-center justify-content-center mb-1">
                <input
                    className="form-control m-2 rounded-pill shadow-none"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Enter movie name"
                    onKeyDown={handleKeyDown}
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
            <div className='container d-flex align-items-center justify-content-center mb-4 p-2'>
                <div className='mx-2'>
                    <label className='mx-2'><b>Sort by : </b></label>
                    <select className='rounded-pill p-1 bg-light'>
                        <option className='p-2'>--</option>
                        <option className='p-2'>Popularity Descending</option>
                        <option className='p-2'>Popularity Ascending</option>
                        <option className='p-2'>Rating Descending</option>
                        <option className='p-2'>Rating Ascending</option>
                        <option className='p-2'>Release date Descending</option>
                        <option className='p-2'>Release date Ascending</option>
                    </select>
                </div>
                <div>
                    <label className='mx-2'><b>Genre : </b></label>
                    <select className='rounded-pill p-1 bg-light'>
                        <option className='p-2'>--</option>
                        <option className='p-2'>Action</option>
                        <option className='p-2'>Adventure</option>
                        <option className='p-2'>Animation</option>
                        <option className='p-2'>Comedy</option>
                        <option className='p-2'>Crime</option>
                        <option className='p-2'>Documentary</option>
                        <option className='p-2'>Drama</option>
                        <option className='p-2'>Family</option>
                        <option className='p-2'>Fantacy</option>
                        <option className='p-2'>History</option>
                        <option className='p-2'>Horror</option>
                        <option className='p-2'>Music</option>
                        <option className='p-2'>Mystery</option>
                        <option className='p-2'>Romance</option>
                        <option className='p-2'>Science Fiction</option>
                        <option className='p-2'>TV Movies</option>
                        <option className='p-2'>Thriller</option>
                        <option className='p-2'>War</option>
                        <option className='p-2'>Western</option>
                    </select>
                </div>
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
