import React, { useEffect, useState } from "react";
import "../MovieDetails/MovieDetails.css";
import Movie from "../../Models/Movie";
import MovieService from "../../Services/MovieService";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import NavBarComponent from "../Navbar/Navbar";

const MovieDetails: React.FC = () => {
  const [movieDetails, setMovieDetails] = useState<Movie | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    const uid = localStorage.getItem("id");
    const fetchDetails = async (id: string) => {
      const moviesData = await MovieService.fetchMovieDetails(id);
      setMovieDetails(moviesData);
    };
    if (uid) fetchDetails(uid);
  }, []);

  const openBooking = (name: string) => {
    navigate("/moviedetails/showtime");
    localStorage.setItem("name", name);
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const getImageSrc = (img: string) => {
    if (!img) return "";
    if (/^(https?:\/\/|\/|data:)/.test(img)) return img;
    return `../../Images/${img}`;
  };

  if (!movieDetails) {
    return (
      <div className="movie-details-page">
        <NavBarComponent />
        <div className="movie-loading">
          <div className="loading-dot" />
          <div className="loading-dot" />
          <div className="loading-dot" />
          <span style={{ marginLeft: 8 }}>Loading movie details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-details-page">
      <NavBarComponent />

      {/* ── Dark Hero Banner ───────────────────────────────────── */}
      <div className="movie-hero">
        {/* Blurred background using the movie poster */}
        <div
          className="movie-hero-bg"
          style={{ backgroundImage: `url(${getImageSrc(movieDetails.image)})` }}
        />
        <div className="movie-hero-overlay" />

        <div className="movie-main-content">
          {/* Poster */}
          <div className="movie-left">
            <div className="movie-poster-wrapper">
              <img
                src={getImageSrc(movieDetails.image)}
                alt={movieDetails.title}
              />
            </div>
            <span className="in-cinemas-label">In cinemas</span>
          </div>

          {/* Info */}
          <div className="movie-right">
            <h1>{movieDetails.title}</h1>

            {/* Rating pill */}
            <div className="movie-rating-pill">
              <div className="rating-left">
                <FaStar className="star-icon" />
                <span className="rating-score">
                  {movieDetails.likes}&nbsp;
                  <span className="rating-votes">({movieDetails.likes ?? "14K+"}+ Votes)</span>
                </span>
              </div>
              <div className="rating-divider" />
              <button className="rate-now-btn">Rate now</button>
            </div>

            {/* Duration · Genre · Cert · Date */}
            <div className="movie-meta">
              <span>{movieDetails.duration}</span>
              <span className="meta-dot" />
              <span>{movieDetails.genre}</span>
              <span className="meta-dot" />
              <span>{movieDetails.certification}</span>
              <span className="meta-dot" />
              <span>{formatDate(movieDetails.releaseDate)}</span>
            </div>

            {/* Format + Language tags */}
            <div className="movie-tags">
              <span className="movie-tag">2D</span>
              <span className="movie-tag">{movieDetails.language}</span>
            </div>

            {/* Book button */}
            <button
              className="book-tickets-button"
              onClick={() => openBooking(movieDetails.title)}
            >
              Book tickets
            </button>
          </div>
        </div>
      </div>

      {/* ── About Section ─────────────────────────────────────── */}
      <div className="movie-about">
        <h2>About the movie</h2>
        <p>{movieDetails.description}</p>
      </div>
    </div>
  );
};

export default MovieDetails;