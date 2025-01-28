import React, { useEffect, useState } from 'react';
import ImageNotFound from '../assets/imagenotfound.png';
import Star from '../assets/star.png';

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

            if (data.Response === "True") {
                // Fetch detailed movie data for each movie in the search results
                const detailedMovies = await Promise.all(
                    data.Search.map(async (movie) => {
                        const detailedUrl = `https://www.omdbapi.com/?apikey=6afed51a&i=${movie.imdbID}&plot=short`;
                        const detailedResponse = await fetch(detailedUrl);
                        const detailedData = await detailedResponse.json();
                        return detailedData; // Return the detailed movie data
                    })
                );
                console.log(detailedMovies);
                setMovies(detailedMovies); // Set the detailed movie data
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
                            <div key={movie.imdbID} className="col">
                                <div className="card h-100 shadow-sm">
                                    {/* Movie Poster */}
                                    <img
                                        src={
                                            movie.Poster !== "N/A"
                                                ? movie.Poster
                                                : ImageNotFound
                                        }
                                        alt={movie.Title}
                                        className="card-img-top"
                                        style={{ height: "445px", objectFit: "cover" }}
                                    />
                                    {/* Movie Info */}
                                    <div className="card-body">
                                        <h5 className="card-title text-wrap">{movie.Title} ({movie.Year})</h5>
                                        <p className="card-text">
                                            {movie.Plot}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center">No movies found.</p>
                )}
            </div>
        </div >
    );
}

export default MovieApp;
