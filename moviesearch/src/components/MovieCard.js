import React, { useState } from 'react';
import ImageNotFound from '../assets/imagenotfound.png';
import SaveButton from '../assets/save-instagram.png';
import SavedButton from '../assets/bookmark.png';
import Star from '../assets/star.png';
import Share from '../assets/share.png';
import axios from 'axios';

function MovieCard({ movie, isSaved, onSaveClick }) {
    const [trailerLink, setTrailerLink] = useState("");
    const [shareButtonClicked, setShareButtonClicked] = useState(false)
    const TMDB_API = "2f70ddbb8e5f352e1f1519357c2c43f7";

    const fetchTrailerLink = async () => {
        try {
            const tmbdResponse = await axios.get(
                `https://api.themoviedb.org/3/movie/${movie.imdbID}/videos?api_key=${TMDB_API}`
            );

            const trailer = tmbdResponse.data.results.find(
                (video) => video.site === "YouTube" && video.type === "Trailer"
            );

            if (trailer) {
                setShareButtonClicked(true)
                setTimeout(() => {
                    setShareButtonClicked(false);
                }, 1000);
                setTrailerLink(`https://www.youtube.com/watch?v=${trailer.key}`)
                console.log("Trailer Link Found", trailerLink);
            }
            else {
                setTrailerLink('Trailer not found!')
            }
        } catch (error) {
            alert("There is no Trailer link assosiated with the Movie")
        }
    }

    const handleShareClick = () => {
        fetchTrailerLink();
        navigator.clipboard.writeText(trailerLink);
    };


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
                <div className='Rating-overlay d-flex rounded bg-light shadow-sm'>
                    <div className='ms-2'>
                        <h6>{movie.imdbRating}</h6>
                    </div>
                    <div className='ms-1'>
                        <img src={Star} />
                    </div>
                </div>
                {/* Save Button Overlay */}
                <div className="save-button-overlay no-select rounded bg-light position-absolute shadow-sm">
                    <img
                        src={isSaved ? SavedButton : SaveButton}
                        className="img-fluid"
                        alt="Save"
                        onClick={() => onSaveClick(movie.imdbID)}
                        style={{ cursor: "pointer" }}
                    />
                </div>
                {/* Share Button Overlay */}
                <div className='share-button-overlay no-select rounded b-light position-absolute shadow-sm'>
                    <img
                        src={Share}
                        className='img-fluid'
                        alt='Share'
                        style={{ cursor: "pointer" }}
                        onClick={handleShareClick}
                    />
                </div>
                {/* COpied msg */}
                {shareButtonClicked && <div className='copied-msg-overlay text-center rounded'>
                    <p>Copied!</p>
                </div>}

                {/* Overlay Text */}
                <div className="overlay-text">
                    <p>
                        <b>Country : </b>{movie.Country}<br />
                        <b>Director : </b>{movie.Director}<br />
                        <b>Actors : </b>{movie.Actors}<br />
                        <b>Genre : </b>{movie.Genre}<br />
                        <b>Box Office : </b>{movie.BoxOffice}<br />
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
