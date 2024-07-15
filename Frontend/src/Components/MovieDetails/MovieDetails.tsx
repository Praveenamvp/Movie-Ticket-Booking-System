import React, { useEffect, useState } from "react";
import "../MovieDetails/MovieDetails.css";
import Movie from "../../Models/Movie";
import MovieService from "../../Services/MovieService";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState<Movie>();
  const navigate = useNavigate();

  useEffect(() => {
    var uid = localStorage.getItem("id");
    let func = async (id: string) => {
      var moviesData = await MovieService.fetchMovieDetails(id || "");

      setMovieDetails(moviesData);
    };

    if (uid) {
      func(uid);
    }
  }, []);

  const openBooking = (name: string) => {
    navigate("/moviedetails/showtime");
    localStorage.setItem("name", name);
  };

  return (
    <div>
      {movieDetails ? (
        <div>
          <div className="movie-main-content">
            <div className="movie-left">
              <img
                className="movie-image"
                src={`../../Images/${movieDetails.image}`}
              />{" "}
            </div>

            <div className="movie-right">
              <h1>{movieDetails.title}</h1>
              <p>
                <FaStar className="start-icon" />
                &nbsp;{movieDetails.likes}
              </p>
              <button>{movieDetails.certification}</button>&nbsp;
              <button>{movieDetails.language}</button>
              <p>
                {movieDetails.duration}&nbsp;,{movieDetails.genre}&nbsp;,{" "}
                {new Date(movieDetails.releaseDate)
                  .toLocaleDateString("en-US", {
                    month: "short",
                    weekday: "short",
                    day: "numeric",
                  })
                  .replace(/,/g, "")}{" "}
              </p>
              <button
                className="book-tickets-button"
                onClick={() => openBooking(movieDetails.title)}
              >
                Book Tickets
              </button>
            </div>
          </div>
          <h1>About the movie</h1>
          <p>{movieDetails.description}</p>
        </div>
      ) : (
        <p>Loading movie details...</p>
      )}
    </div>
  );
};

export default MovieDetails;
