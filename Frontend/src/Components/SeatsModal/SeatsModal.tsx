import { useEffect, useState } from "react";
import Modal from "react-modal";
import UserService from "../../Services/UserService";
import { useDispatch, useSelector } from "react-redux";
import {
  updateLoginModelState, updateSeatCount, updateSeatNumberModelState,
} from "../../Redux/Action";
import "../SeatsModal/SeatsModal.css";
import TicketBooking from "../../Models/StateModels";
import { Navigate, useNavigate } from "react-router-dom";

function SeatsModalComponent() {
  const dispatch = useDispatch();
  const ticketBooking = useSelector((state: TicketBooking) => state);
  const navigate = useNavigate();
  const [clickedIndex, setClickedIndex] = useState<number | null>(1);

  const [seatDetails, setSeatDetails] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ]);
  const [seatValue, setSeatValue] = useState<number>(2);
  useEffect(() => {
   dispatch(updateSeatCount(seatValue));
  }, []);

  const closeModal = () => {
    dispatch(updateLoginModelState(false));
  };
  const handleSeats = (seat:number,index:number) => {
    setSeatValue(seat);
    setClickedIndex(index);
  };
const handleSeatCount=()=>{
    dispatch(updateSeatCount(seatValue));
    dispatch(updateSeatNumberModelState(false))
    navigate("/seatComponent")
}
  return (
    <div>
      <Modal
        isOpen={ticketBooking.seatNumberModelState}
        onRequestClose={closeModal}
        contentLabel="Popup Content"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: "50%",
            padding: "20px",
            backgroundColor: "#fff",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
            borderRadius: 10,
          },
        }}
      >
        <div className="seatModal-main-content"> How Many Seats?</div>

        <div className="seatModal-content">
          {" "}
          {seatDetails.map((seatNumber: any,index) => (
            <button 
            // className="seat-number" 
            onClick={() => handleSeats(seatNumber,index)}
            className={`${index === clickedIndex ? "seat-number-clicked" : "seat-number"}`}
           

            >{seatNumber}</button>
          ))}
        </div>
        <button onClick={ handleSeatCount}>Select Seats</button>
      </Modal>
    </div>
  );
}

export default SeatsModalComponent;
