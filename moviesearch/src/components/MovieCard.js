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
                {/* Save Button Overlay */}
                <div className="save-button-overlay no-select rounded position-absolute">
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
                        <b>Genre : </b>{movie.Genre}<br />
                        <b>Box Office : </b>{movie.BoxOffice}<br />
                        <b>Actors : </b>{movie.Actors}<br />
                        <b>IMDB Rating : </b>{movie.imdbRating} / 10<br />
                        <b>Languages : </b>{movie.Language}<br />
                        <b>Plot : </b>{movie.Plot}<br />
                        <b>Runtime : </b>{movie.Runtime}<br />
                        <b>Release Date : </b>{movie.Released}<br />
                    </p>
                </div>

                {/* Movie Info */}
                <div className="card-body">
                    <h6 className="card-title text-wrap">
                        {movie.Title}
                        ({movie.Year})
                    </h6>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;
