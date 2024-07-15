import React, { useEffect, useState } from "react";
import ShowTimeService from "../../Services/ShowTimeService";
import DateModal from "../../Models/DateModal";
import DateTimeRequest from "../../Models/DateTime";
import ShowTime from "../../Models/ShowTime";
import "../ShowTime/ShowTime.css";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Modal from "react-modal";
import BookingRequest from "../../Models/Booking";
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
import emailjs from "emailjs-com";
import ShowTimeIdSeats from "../../Models/ShowTimeIdSeats";
import booking from "../../Images/booking.png"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoginComponent from "../Login/Login";
import RegisterComponent from "../Register/Register";
import { log } from "console";
import SeatsModalComponent from "../SeatsModal/SeatsModal";
const ShowTimeComponent = () => {
  const [date, setDates] = useState([]);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [iconClickedIndex] = useState<number | null>(null);
  const [id, setId] = useState<string>();
  const [likeState, setlikeState] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  var [seats, setSeats] = useState<number>(10);
  const navigate = useNavigate();

  var movieName = localStorage.getItem("name");
  const [idSeats, setIdSeats] = useState<ShowTimeIdSeats>({
    seats: 0,
    showTimeId:""
  });
  const [showTimeLikeRequest, setShowTimeLikeRequest] = useState<ShowTime>({
    uid: "",
    movieID: "",
    startTime: new Date(),
    locationName: "",
    likeState: false,
    availableSeats: 0,
  });
  const ticketBooking = useSelector((state: TicketBooking) => state);

  // const [bookingDetails, setBookingDetails] = useState<BookingRequest>({
  //   showtimeId: "B1AAF67A-E8DC-40E2-ACA4-018CD1D84140" || "",
  //   movieID:"FA3FA156-D452-4243-9E50-4EBD0ADF36DB",
  //   userName: "",
  //   email: "",
  //   phoneNumber: "",
  //   bookingDate: new Date(),
  //   noOfSeats: 0,
  // });

  const closeModal = () => {
    setIsModalOpen(false);
  };
  // const handleIncreaseSeats = () => {
  //   setSeats(seats + 1);
  //   bookingDetails.noOfSeats++;
  // };

  // const handleDecreaseSeats = () => {
  //   if (seats > 1) {
  //     setSeats(seats - 1);
  //     bookingDetails.noOfSeats--;
  //   }
  // };
  // const bookMovie = async () => {
  //   var checkSeatsAvailable = ticketBooking.showTime.find(
  //     (nod: ShowTime) => nod.uid === id
  //   );
  //   if (checkSeatsAvailable) {
     
  //       if (checkSeatsAvailable.availableSeats < bookingDetails.noOfSeats) {
  //         toast.warning("Your selected seats exceeded the maximum seats");
  //       } else {
  //         var bookingResult = await BookingService.addBooking(bookingDetails);
  
  //         if (bookingResult.status === 200) {
  //           toast.success("Booking successful");
  //           setIsModalOpen(false);
  //           setIdSeats((prev) => ({
  //             ...prev,
  //             seats: bookingDetails.noOfSeats,
  //             showTimeId: bookingDetails.showtimeId,
  //           }));
  //           var resultUpdate=ShowTimeService.updateSeats(idSeats);
    
  //         } else {
  //           toast.warning("Booking unsuccessful");
  //         }
        
  //     }
      
  //   }
  // };
  const openBooking = (id: string) => {
    dispatch(updateShowTimeUID(id))
    if(!ticketBooking.loggedInUser.token){
      toast.warning("you dont have access please sign in")
      dispatch(updateLoginModelState(true));
      

    }else{
      // setId(id);
      dispatch(updateSeatNumberModelState(true));
      console.log(id);
      
      
    }
    
  };

  const fetchShowTime = async (dateData: string, index: number) => {
    var uid = localStorage.getItem("id");

    var showTimeDate: DateTimeRequest = {
      movieUID: uid || "",
      date: dateData,
    };
    var showTimeDetails = await ShowTimeService.fetchShowTime(showTimeDate);
    setClickedIndex(index);
    dispatch(updateShowTime(showTimeDetails));
    console.log(showTimeDetails);
    
  };

  useEffect(() => {
    var uid = localStorage.getItem("id");
    let func = async (id: string) => {
      var dates = await ShowTimeService.fetchDates(uid || "");
      setDates(dates);
    };

    if (uid) {
      func(uid);
      fetchShowTime("2023-01-01T00:00:00", 0);
    }
  }, []);
  return (
    <div className="booking-container">
      <h1>{movieName}</h1>
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
            .replace(/,/g, "")}{" "}
        </button>
      ))}
      <div>
        {ticketBooking.showTime.map((dateDetails: ShowTime, index: number) => (
          <p key={index} className="showTimeButton">
            <hr className="hr-line" />
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
            &nbsp;
            {dateDetails.locationName}{" "}
            <span
              data-tooltip-id="seats-detail"
              data-tooltip-content={`Available Seats: ${dateDetails.availableSeats}`}
              data-tooltip-place="top"
              className="button-name"
              onClick={() => openBooking(dateDetails.uid)}
            >
              {new Date(dateDetails.startTime).toLocaleTimeString()}
            </span>
            <i id="tool-tip">
              <Tooltip  className="button-name g" id="seats-detail" />
            </i>
          </p>
        ))}
      </div>
     
      <LoginComponent/>
      <RegisterComponent/>
      <SeatsModalComponent/>

    </div>
  );
};

export default ShowTimeComponent;
