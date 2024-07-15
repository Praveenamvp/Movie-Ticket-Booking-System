import { useSelector } from "react-redux";
import TicketBooking from "../../Models/StateModels";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const ticketBooking = useSelector((state: TicketBooking) => state);
  return ticketBooking.loggedInUser.token;
};
const navigate = useNavigate();

const ProtectedRoutes = () => {
  if (!useAuth()) {
    navigate("/");
  }
  
};
export default ProtectedRoutes();
