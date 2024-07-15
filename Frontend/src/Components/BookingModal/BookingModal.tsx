

import ShowTime from "../../Models/ShowTime";
import "../ShowTime/ShowTime.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Modal from "react-modal";
import BookingRequest from "../../Models/Booking";
import BookingService from "../../Services/BookingService";
import { useDispatch, useSelector } from "react-redux";
import booking from "../../Images/booking.png"
import { useState } from "react";
import TicketBooking from "../../Models/StateModels";
import ShowTimeIdSeats from "../../Models/ShowTimeIdSeats";
import { updateBookingModelState } from "../../Redux/Action";
function BookingModalComponent() {
    const dispatch = useDispatch();
    const closeModal = () => {

        dispatch(updateBookingModelState(false))
      };
      const [idSeats, setIdSeats] = useState<ShowTimeIdSeats>({
        seats: 0,
        showTimeId:""
      });

      const [bookingDetails, setBookingDetails] = useState<BookingRequest>({
        showtimeId: "B1AAF67A-E8DC-40E2-ACA4-018CD1D84140" || "",
        movieID:"FA3FA156-D452-4243-9E50-4EBD0ADF36DB",
        userUID:"",
        bookingDate: new Date(),
        noOfSeats: 0,
        seatUIDs:[]
      });
      
      const ticketBooking = useSelector((state: TicketBooking) => state);
      var [seats, setSeats] = useState<number>(10);

      const handleDecreaseSeats = () => {
        if (seats > 1) {
          setSeats(seats - 1);
          bookingDetails.noOfSeats--;
        }
      };
      const bookMovie = async () => {
        console.log("Book");
        const updatedBookingDetails: BookingRequest = {
          ...bookingDetails,
          showtimeId: ticketBooking.showTimeID, 
          userUID:ticketBooking.loggedInUser.uid,
          bookingDate:new Date(),
          movieID:localStorage.getItem("id") || "",
          seatUIDs: ["seat_uid_1", "seat_uid_2"] 
          
      };
        var bookingResult = await BookingService.addBooking(bookingDetails);
        if(bookingResult.status==200){
          alert("success")
        }
        else{
          alert("failure")
        }
        // var checkSeatsAvailable = ticketBooking.showTime.find(
        //   (nod: ShowTime) => nod.uid === id
        // );
        // console.log();
        
        // if (checkSeatsAvailable) {
         
        //     if (checkSeatsAvailable.availableSeats < bookingDetails.noOfSeats) {
        //       toast.warning("Your selected seats exceeded the maximum seats");
        //     } else {
        //       var bookingResult = await BookingService.addBooking(bookingDetails);
      
        //       if (bookingResult.status === 200) {
        //         toast.success("Booking successful");
        //         setIsModalOpen(false);
        //         setIdSeats((prev) => ({
        //           ...prev,
        //           seats: bookingDetails.noOfSeats,
        //           showTimeId: bookingDetails.showtimeId,
        //         }));
        //         var resultUpdate=ShowTimeService.updateSeats(idSeats);
        
        //       } else {
        //         toast.warning("Booking unsuccessful");
        //       }
            
        //   }
          
        // }
      };
      const handleIncreaseSeats = () => {
        setSeats(seats + 1);
        bookingDetails.noOfSeats++;
      };
  return (
    <div>
         <Modal
        isOpen={ticketBooking.bookingModelState}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "50%",
            left: "50%",
            height: "225px",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            backgroundColor: "#fff",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
            borderRadius: 0,
          },
        }}
      >
        <div className="booking-content">
          <div>
            <img className="booking-image" src={booking}></img>
          </div>
          <div className="booking-text">
            <span className="booking-close-icon" onClick={closeModal}>
              <IoIosCloseCircleOutline />
            </span>
            <table>
              <tr>
                <td>
                  {" "}
                  <label>UserName</label>
                </td>
                <td></td>
                <td>
                  <input
                    type="text"
                    value={ticketBooking.loggedInUser.name}
                   
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Email</label>
                </td>
                <td></td>
                <td>
                  <input
                    type="email"
                    value={ticketBooking.loggedInUser.email}
                   
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Phone Number</label>
                </td>
                <td></td>
                <td>
                  <input
                    type="number"
                    value={ticketBooking.loggedInUser.phoneNumber}
                    
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Selected- Seats</label>
                </td>
                <td></td>
                <td>
                {ticketBooking.selectedSeats.map((data: any, index: number) => (
    <span key={index}><button>{data}</button></span>
  ))}
                </td>
              </tr>
              <tr>
                {/* <td>
                  <label> Seats</label>
                </td>

                <div>
                  <td>
                    {" "}
                    <button onClick={handleDecreaseSeats}>-</button>
                  </td>
                </div>
                <td>
                  {" "}
                  <input
                    type="number"
                    value={bookingDetails.noOfSeats}
                    onChange={(e) =>
                      setBookingDetails({
                        ...bookingDetails,
                        noOfSeats: parseInt(e.target.value, 10) || 0,
                      })
                    }
                  ></input>
                </td>
                <td>
                  {" "}
                  <button onClick={handleIncreaseSeats}>+</button>
                </td> */}
              </tr>
            </table>
            <br />
            <button className="book" onClick={bookMovie}>
              Book
            </button>
            <br />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default BookingModalComponent;
