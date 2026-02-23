import React, { useState, useEffect } from "react";
import "../LandingPage/LandingPage.css";
import Movie from "../../Models/Movie";
import { useNavigate } from "react-router-dom";
import MovieService from "../../Services/MovieService";
import Language from "../../Models/Language";
import Genre from "../../Models/Genre";
import { RiFileCloseFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import TicketBooking from "../../Models/StateModels";
import { updateMovies } from "../../Redux/Action";
import { FaStar } from "react-icons/fa";
import NavBarComponent from "../Navbar/Navbar";

const LandingPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [clickedLanguage, setClickedLanguage] = useState<number | null>(null);
  const [clickedGenre, setClickedGenre] = useState<number | null>(null);
  const [searchItem, setSearchItem] = useState<string>("");

  const navigate = useNavigate();
  const ticketBooking = useSelector((state: TicketBooking) => state);
  const dispatch = useDispatch();

  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const fetchMovies = async (id: string) => {
    const moviesData = await MovieService.fetchMovieDetailsByLocation(id || "");
    setMovies(moviesData.result);
    dispatch(updateMovies(moviesData.result));
  };

  useEffect(() => {
    fetchMovies(ticketBooking.filterLocationUID);

    const fetchLanguages = async () => {
      const languageDatas = await MovieService.fetchAllLanguages();
      setLanguages(languageDatas);
    };
    fetchLanguages();

    const fetchGenres = async () => {
      const genreDatas = await MovieService.fetchAllGenres();
      setGenres(genreDatas);
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    fetchMovies(ticketBooking.filterLocationUID);
  }, [ticketBooking.filterLocationUID]);

  // Search filter
  useEffect(() => {
    if (!searchItem.trim()) {
      setFilteredMovies(movies);
      return;
    }
    const filtered = movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(searchItem.toLowerCase()) ||
        movie.language.toLowerCase().includes(searchItem.toLowerCase()),
    );
    setFilteredMovies(filtered);
  }, [searchItem, movies]);

  // Language + genre filter
  useEffect(() => {
    const filtered = movies.filter((movie) => {
      return (
        (!selectedLanguage || movie.language === selectedLanguage) &&
        (!selectedGenre || movie.genre === selectedGenre)
      );
    });
    setFilteredMovies(filtered);
  }, [movies, selectedLanguage, selectedGenre]);

  const GetMovieDetails = async (movieId: string) => {
    localStorage.setItem("id", movieId);
    navigate("/moviedetails");
  };

  const handleSearchChange = (searchData: string) => {
    setSearchItem(searchData);
  };

  const handleLanguageClick = (language: string, index: number) => {
    setSelectedLanguage(language);
    setClickedLanguage(index);
  };

  const handleGenreClick = (genre: string, index: number) => {
    setSelectedGenre(genre);
    setClickedGenre(index);
  };

  const clearFilterLanguage = () => {
    setSelectedLanguage(null);
    setClickedLanguage(null);
    setFilteredMovies(movies);
  };

  const clearFilterGenre = () => {
    setSelectedGenre(null);
    setClickedGenre(null);
    setFilteredMovies(movies);
  };

  const getImageSrc = (movie: any) => {
    const image = movie?.title || "";

    // If no title, return default image
    if (!image) return "/Images/default-movie.png";

    // // If no file extension, assume .jpg
    // if (!/\.[a-zA-Z0-9]+$/.test(image)) {
    //   console.log(`No file extension found for "${image}". Assuming .jpg.`);
    //   return `../../Images/${image}.jpg`;

    // }
    console.log(`Using image source: ${image}`);
    return `/Images/${image}.jpg`;
  };

  return (
    <div>
      <NavBarComponent />

      <div className="main-content">
        {/* ── Sidebar ───────────────────────────────────────────── */}
        <div className="left-sidebar">
          <h3>Filters</h3>

          {/* Language filter */}
          <div className="filters">
            <div className="filter-heading">
              Languages
              <button className="filter-clear" onClick={clearFilterLanguage}>
                Clear
              </button>
            </div>
            <div className="language-filters">
              {languages.map((languageData: Language, index: number) => (
                <button
                  key={index}
                  className={`filter-button${index === clickedLanguage ? " active-button" : ""}`}
                  onClick={() =>
                    handleLanguageClick(languageData.language, index)
                  }
                >
                  {languageData.language}
                </button>
              ))}
            </div>
          </div>

          {/* Genre filter */}
          <div className="filters">
            <div className="filter-heading">
              Genre
              <button className="filter-clear" onClick={clearFilterGenre}>
                Clear
              </button>
            </div>
            <div className="language-filters">
              {genres.map((genreData: Genre, index: number) => (
                <button
                  key={index}
                  className={`filter-button${index === clickedGenre ? " active-button" : ""}`}
                  onClick={() => handleGenreClick(genreData.name, index)}
                >
                  {genreData.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Movie Grid ────────────────────────────────────────── */}
        <div className="right-content">
          {filteredMovies.length === 0 ? (
            <div className="oops-wrapper">
              <i className="oops-icon">
                <RiFileCloseFill />
              </i>
              <h2>No movies found for the selected filters.</h2>
              <p>Try clearing a filter to discover more movies.</p>
            </div>
          ) : (
            <div className="movie-display">
              {filteredMovies.map((movie: Movie) => (
                <div className="movie-overview" key={movie.uid}>
                  <div
                    className="movie-card"
                    onClick={() => GetMovieDetails(movie.uid)}
                  >
                    <div className="movie-image-wrapper">
                      <img
                        className="movie-image"
                        src={getImageSrc(movie)}
                        alt={movie.title}
                      />
                      {/* <span className="book-now-overlay">Book Now</span> */}
                      <div className="movie-rating-bar">
                        <i className="star-icon">
                          <FaStar />
                        </i>
                        <span className="rating-text">{movie.likes}</span>
                        {/* <span className="rating-votes">Votes</span> */}
                      </div>
                    </div>

                    <div className="movie-card-body">
                      <h3>{movie.title}</h3>
                      <h4>{movie.genre}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
