import React, { useEffect, useState } from 'react';

function MovieApp() {
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Fetch popular movies on component mount
    useEffect(() => {
        const fetchTrendingMovies = async () => {
            setLoading(true);
            try {
                const tmdbUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=2f70ddbb8e5f352e1f1519357c2c43f7`;
                const response = await fetch(tmdbUrl);
                const data = await response.json();

                if (response.ok) {
                    setMovies(data.results); // Save the movie list in state
                } else {
                    console.error("Error fetching movies:", data.message);
                    alert("Failed to fetch trending movies.");
                }
            } catch (error) {
                console.error("Error fetching trending movies:", error);
                alert("An error occurred while fetching data.");
            } finally {
                setLoading(false);
            }
        };

        fetchTrendingMovies();
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
            <div className="container">
                {loading ? (
                    <p>Loading trending movies...</p>
                ) : movies.length > 0 ? (
                    <div className="row">
                        {movies.map((movie) => (
                            <div key={movie.id} className="col-md-3 mb-4">
                                <div className="card h-100 shadow-sm">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        className="card-img-top"
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{movie.title}</h5>
                                        <p className="card-text">
                                            Release Date: {movie.release_date || "N/A"}
                                        </p>
                                        <p className="card-text">
                                            Rating: {movie.vote_average}/10
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No movies found.</p>
                )}
            </div>

        </div>
    );
}

export default MovieApp;
