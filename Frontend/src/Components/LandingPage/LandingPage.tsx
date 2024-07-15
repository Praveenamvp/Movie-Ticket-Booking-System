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
import {  updateMovies } from "../../Redux/Action";
import { FaStar } from "react-icons/fa";
import NavBarComponent from "../Navbar/Navbar";

const LandingPage = () => {
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
  var [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  var [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  let func = async (id: string) => {
    var moviesData = await MovieService.fetchMovieDetailsByLocation(id || "");
    setMovies(moviesData.result);
    dispatch(updateMovies(moviesData.result));
  };

  useEffect(() => {
    func(ticketBooking.filterLocationUID);
    let fetchLanguages = async () => {
      var languageDatas = await MovieService.fetchAllLanguages();
      setLanguages(languageDatas);
    };
    fetchLanguages();
    let fetchGenres = async () => {
      var genreDatas = await MovieService.fetchAllGenres();
      setGenres(genreDatas);
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    console.log(ticketBooking.loggedInUser.name);
  }, [ticketBooking.loggedInUser]);

  useEffect(() => {
    func(ticketBooking.filterLocationUID);
  }, [ticketBooking.filterLocationUID]);

  useEffect(() => {
    const filtered = movies.filter((movie) =>
      (movie.title.toLowerCase()).includes(
        searchItem.toLowerCase()
      )||(movie.language.toLowerCase()).includes(
        searchItem.toLowerCase()
      )
    );
    setFilteredMovies(filtered);
  }, [searchItem, movies]);

  useEffect(() => {
    const filtered = movies.filter((movie) => {
      const match =
        (!selectedLanguage || movie.language === selectedLanguage) &&
        (!selectedGenre || movie.genre === selectedGenre);
      return match;
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
    selectedLanguage = null;
    setClickedLanguage(null);
    setFilteredMovies(movies);
  };
  const clearFilterGenre = () => {
    selectedGenre = null;
    setClickedGenre(null);
    setFilteredMovies(movies);
  };
 


  return (
    <div>
      {/* <div className="nav-bar">
        <img className="logo" src={logo} alt="Logo" />
        <div className="nav-bar-search">
          <i>
            <IoIosSearch />
          </i>

          <input
            type="text"
            id="searchInput"
            placeholder="🔍 Search for movies, language etc.."
            value={searchItem}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
        <div className="nav-bar-right">
          {ticketBooking ? (
            <button className="nav-button" onClick={() => openModal()}>
              {ticketBooking.filterLocationName} <span>▾</span>
            </button>
          ) : (
            <div></div>
          )}
          {ticketBooking.loggedInUser.name ? (
            <div>
              {" "}
              <button
                className="nav-button-signin"
                onClick={() => handleProfile()}
              >
                {ticketBooking.loggedInUser.name}&nbsp;
                <FaUserAstronaut />
              </button>
            </div>
          ) : (
            <div>
              <button className="nav-button-signin"  onClick={() => handleSignIn()}>sign in</button>
            </div>
          )}
        </div>
      </div> */}
<NavBarComponent/>
      <div className="main-content">
        <div className="left-sidebar">
          <h3>Filters</h3>
          <div className="filters">
            <div className="filter-heading">
              Languages
              <button
                className="filter-clear"
                onClick={() => clearFilterLanguage()}
              >
                Clear
              </button>
            </div>
            <div className="language-filters">
              {languages.map((languageData: Language, index) => (
                <button
                  key={index}
                  className={`filter-button${
                    index === clickedLanguage ? " active-button" : ""
                  }`}
                  onClick={() =>
                    handleLanguageClick(languageData.language, index)
                  }
                >
                  {languageData.language}
                </button>
              ))}
            </div>
          </div>
          <br />
          <div className="filters">
            <div className="filter-heading">
              Genre
              <button
                className="filter-clear"
                style={{ marginLeft: "45%" }}
                onClick={() => clearFilterGenre()}
              >
                Clear
              </button>
            </div>
            <div className="language-filters">
              {genres.map((genreData: Genre, index) => (
                <button
                  key={index}
                  className={`filter-button${
                    index === clickedGenre ? " active-button" : ""
                  }`}
                  onClick={() => handleGenreClick(genreData.name, index)}
                >
                  {genreData.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="right-content">
          {filteredMovies.length == 0 ? (
            <div>
              <h1>
                {" "}
                <i className="oops-icon">
                  <RiFileCloseFill />
                </i>
                OOPS! There is no from the selected options
              </h1>
            </div>
          ) : (
            <div className="movie-display">
              {filteredMovies.length > 0 &&
                filteredMovies.map((movie: any) => (
                  <div className="movie-overview">
                    <div
                      className="movie-card"
                      onClick={() => GetMovieDetails(movie.uid)}
                    >
                      {filteredMovies.length > 0 && (
                        <img
                          className="movie-image"
                          src={movie.image}
                        />
                      )}

                      <h3>{movie.title}</h3>
                      <h4>{movie.language}</h4>
                      <p className="likes">
                        <i className="star-icon">
                          <FaStar />
                        </i>
                      
                        {movie.likes}
                      </p>
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
