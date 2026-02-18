import React, { useEffect, useState } from "react";
import ShowTimeService from "../../Services/ShowTimeService";
import DateModal from "../../Models/DateModal";
import DateTimeRequest from "../../Models/DateTime";
import ShowTime from "../../Models/ShowTime";
import "../ShowTime/ShowTime.css";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import BookingService from "../../Services/BookingService";
import { useDispatch, useSelector } from "react-redux";
import {
  updateLoginModelState,
  updateSeatNumberModelState,
  updateShowTime,
  updateShowTimeLikeState,
  updateShowTimeUID,
} from "../../Redux/Action";
import TicketBooking from "../../Models/StateModels";
import ShowTimeIdSeats from "../../Models/ShowTimeIdSeats";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoginComponent from "../Login/Login";
import RegisterComponent from "../Register/Register";
import SeatsModalComponent from "../SeatsModal/SeatsModal";
import NavBarComponent from "../Navbar/Navbar";

const ShowTimeComponent: React.FC = () => {
  const [date, setDates] = useState<DateModal[]>([]);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [showTimeLikeRequest, setShowTimeLikeRequest] = useState<ShowTime>({
    uid: "",
    movieID: "",
    startTime: new Date(),
    locationName: "",
    likeState: false,
    availableSeats: 0,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ticketBooking = useSelector((state: TicketBooking) => state);
  const movieName = localStorage.getItem("name");

  const openBooking = (id: string) => {
    dispatch(updateShowTimeUID(id));
    if (!ticketBooking.loggedInUser.token) {
      toast.warning("You don't have access — please sign in.");
      dispatch(updateLoginModelState(true));
    } else {
      dispatch(updateSeatNumberModelState(true));
    }
  };

  const fetchShowTime = async (dateData: string, index: number) => {
    const uid = localStorage.getItem("id");
    const showTimeDate: DateTimeRequest = {
      movieUID: uid || "",
      date: dateData,
    };
    const showTimeDetails = await ShowTimeService.fetchShowTime(showTimeDate);
    setClickedIndex(index);
    dispatch(updateShowTime(showTimeDetails));
  };

  useEffect(() => {
    const uid = localStorage.getItem("id");
    const init = async () => {
      const dates = await ShowTimeService.fetchDates(uid || "");
      setDates(dates);
      fetchShowTime("2023-01-01T00:00:00", 0);
    };
    if (uid) init();
  }, []);

  return (
    <div>
      <NavBarComponent />

      <div className="booking-container">
        <h1>{movieName}</h1>

        <div className="date-row">
          {date.map((dateDetails: DateModal, index: number) => (
            <button
              key={index}
              className={`dates${index === clickedIndex ? " clicked" : ""}`}
              onClick={() => fetchShowTime(dateDetails.date, index)}
            >
              {new Date(dateDetails.date)
                .toLocaleDateString("en-US", {
                  month: "short",
                  weekday: "short",
                  day: "numeric",
                })
                .replace(/,/g, "")}
            </button>
          ))}
        </div>

        <div className="showtime-section">
          {ticketBooking.showTime.map((dateDetails: ShowTime, index: number) => (
            <p key={index} className="showTimeButton">

              {dateDetails.likeState ? (
                <FaHeart
                  className="heart-icon"
                  onClick={() => {
                    setShowTimeLikeRequest((prev) => ({
                      ...prev,
                      likeState: !prev.likeState,
                      uid: dateDetails.uid,
                    }));
                    dispatch(updateShowTimeLikeState(showTimeLikeRequest));
                  }}
                />
              ) : (
                <FaRegHeart
                  className="empty-heart-icon"
                  onClick={() => {
                    setShowTimeLikeRequest((prev) => ({
                      ...prev,
                      likeState: !prev.likeState,
                      uid: dateDetails.uid,
                    }));
                    dispatch(updateShowTimeLikeState(showTimeLikeRequest));
                  }}
                />
              )}

              <span className="theatre-name">{dateDetails.locationName}</span>

              <div className="showtimes-list">
                <span
                  data-tooltip-id="seats-detail"
                  data-tooltip-content={`Available Seats: ${dateDetails.availableSeats}`}
                  data-tooltip-place="top"
                  className="button-name"
                  onClick={() => openBooking(dateDetails.uid)}
                >
                  {new Date(dateDetails.startTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              <Tooltip className="button-name" id="seats-detail" />
            </p>
          ))}
        </div>

        <LoginComponent />
        <RegisterComponent />
        <SeatsModalComponent />
      </div>
    </div>
  );
};

export default ShowTimeComponent;