import React, { useState, useEffect } from "react";
import "../LandingPage/LandingPage.css";
import logo from "../../Images/Logo.png";
import { FaUserAstronaut } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import TicketBooking from "../../Models/StateModels";
import {
  updateLoginModelState,
  updateModelState,
  updateRegisterModelState,
} from "../../Redux/Action";
import { useNavigate } from "react-router-dom";
import LandingFilterComponent from "../LocationFilter/LocationFilter";
import RegisterComponent from "../Register/Register";

function NavBarComponent() {
  const ticketBooking = useSelector((state: TicketBooking) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = () => {
    dispatch(updateLoginModelState(true));
    console.log(ticketBooking.loginModelState + "login state");

  };
  const openModal = () => {
    dispatch(updateModelState(true));
  };
  const handleProfile = () => {
    navigate("/profile");
  };
  return (
    <div>
      <div className="nav-bar">
        <img className="logo" src={logo} alt="Logo" />
        <div className="nav-bar-search">
          <i>
            <IoIosSearch />
          </i>

          <input
            type="text"
            id="searchInput"
            placeholder="🔍 Search for movies, language etc.."
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
              <button
                className="nav-button-signin"
                onClick={() => handleSignIn()}
              >
                sign in
              </button>
            </div>
          )}
        </div>
      </div>
      <LandingFilterComponent />
      <RegisterComponent />
    </div>
  );
}

export default NavBarComponent;
