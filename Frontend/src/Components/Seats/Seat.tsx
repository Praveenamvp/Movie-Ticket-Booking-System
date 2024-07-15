import { useEffect, useState } from "react";
import ShowTimeService from "../../Services/ShowTimeService";
import { useDispatch, useSelector } from "react-redux";
import TicketBooking from "../../Models/StateModels";
import "../Seats/Seat.css";
import {
  UPDATE_SEATCOUNT,
  updateBookingModelState,
  updateSeatCount,
  updateSeletedSeats,
} from "../../Redux/Action";
import BookingModalComponent from "../BookingModal/BookingModal";
function SeatComponent() {
  const ticketBooking = useSelector((state: TicketBooking) => state);
  const [seatDetails, setSeatDetails] = useState<any>([]);
  var [selectedSeatUIDs, setSelectedSeatUIDs] = useState<any>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    func(ticketBooking.showTimeID);
  }, []);
  let func = async (id: string) => {
    var result = await ShowTimeService.fetchSeatsByShowTimeID(
      ticketBooking.showTimeID
    );
    console.log(result);

    setSeatDetails(result);
  };
  const handleSelectedSeats = (data: any) => {
    console.log(ticketBooking.selectedSeats);

    if (ticketBooking.selectedSeats.length + 1 > ticketBooking.seatCount) {
      const updatedSeats = [...ticketBooking.selectedSeats, data.seatNumber];

      if (
        updatedSeats.length > ticketBooking.seatCount &&
        !ticketBooking.selectedSeats.includes(data.seatNumber)
      ) {
        updatedSeats.splice(0, 1);
        dispatch(updateSeletedSeats(updatedSeats));
        selectedSeatUIDs=[...selectedSeatUIDs,updatedSeats]
      }
    } else {
      if (!ticketBooking.selectedSeats.includes(data.seatNumber)) {
        const updatedSeats = [...ticketBooking.selectedSeats, data.seatNumber];
        dispatch(updateSeletedSeats(updatedSeats));
        selectedSeatUIDs=[...selectedSeatUIDs,updatedSeats]
      }
    }
  };

  useEffect(() => {
    console.log(seatDetails);
  }, [seatDetails]);
  const handleBooking = () => {
    dispatch(updateBookingModelState(true));
  };
  return (
    <div>
      <div className="seats-main-content">
        <div className="content-seats">
          {" "}
          {seatDetails
            .sort((a: any, b: any) => a.seatNumber - b.seatNumber)
            .map((genreData: any) => (
              <button
                className={`${
                  !genreData.isAvailable ? "disabled" : "seat-button"
                } ${
                  ticketBooking.selectedSeats.includes(genreData.seatNumber)
                    ? "selected-seat"
                    : ""
                }`}
                key={genreData.seatNumber}
                disabled={!genreData.isAvailable}
                onClick={() => handleSelectedSeats(genreData.seatNumber)}
              >
                {genreData.seatNumber}
              </button>
            ))}
        </div>
      </div>
      <button onClick={handleBooking}>Book Now</button>
      <BookingModalComponent />
    </div>
  );
}

export default SeatComponent;
