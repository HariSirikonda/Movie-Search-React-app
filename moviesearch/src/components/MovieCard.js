import React from 'react';
import ImageNotFound from '../assets/imagenotfound.png';
import SaveButton from '../assets/save-instagram.png';
import SavedButton from '../assets/bookmark.png';
import Star from '../assets/star.png';

function MovieCard({ movie, isSaved, onSaveClick }) {
    return (
        <div className="col">
            <div className="card-img card h-100 shadow-sm position-relative">
                {/* Movie Poster */}
                <img
                    src={movie.Poster !== "N/A" ? movie.Poster : ImageNotFound}
                    alt={movie.Title}
                    className="card-img-top"
                    style={{ height: "445px", objectFit: "cover" }}
                />
                {/* Rating  */}
                <div className='Rating-overlay d-flex rounded bg-light'>
                    <div className='ms-2'>
                        <h6>{movie.imdbRating}</h6>
                    </div>
                    <div className='ms-2'>
                        <img src={Star} />
                    </div>
                </div>
                {/* Watch Trailer */}
                <div className='Trailer-overlay text-center rounded bg-light'>
                    <h6><a href='https://www.google.com' target='_blank'>Trailer</a></h6>
                </div>
                {/* Save Button Overlay */}
                <div className="save-button-overlay no-select rounded bg-light position-absolute">
                    <img
                        src={isSaved ? SavedButton : SaveButton}
                        className="img-fluid"
                        alt="Save"
                        onClick={() => onSaveClick(movie.imdbID)}
                        style={{ cursor: "pointer" }}
                    />
                </div>
                {/* Overlay Text */}
                <div className="overlay-text">
                    <p>
                        <b>Country : </b>{movie.Country}<br />
                        <b>Director : </b>{movie.Director}<br />
                        <b>Actors : </b>{movie.Actors}<br />
                        <b>Genre : </b>{movie.Genre}<br />
                        <b>Box Office : </b>{movie.BoxOffice}<br />
                        <b>Actors : </b>{movie.Actors}<br />
                        <b>Languages : </b>{movie.Language}<br />
                        <b>Plot : </b>{movie.Plot}<br />
                        <b>Runtime : </b>{movie.Runtime}<br />
                        <b>Release Date : </b>{movie.Released}<br />
                    </p>
                </div>

                {/* Movie Info */}
                <div className="card-body">
                    <h6 className="card-title text-wrap">
                        {movie.Title} - {movie.Year}
                    </h6>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;
