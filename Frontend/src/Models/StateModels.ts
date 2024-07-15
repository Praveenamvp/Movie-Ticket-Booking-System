import DateTimeRequest from "./DateTime";
import Login from "./Login";
import Movie from "./Movie";
import ShowTime from "./ShowTime";

export default interface TicketBooking{
    filterLocationUID: string;
    filterLocationName: string;
    modelState:boolean;
    loginModelState:boolean;
    registerModelState:boolean;
    seatNumberModelState:boolean;
    filterTickIcon:boolean;
    name:string;
    showTime:ShowTime[];
    dateTime:DateTimeRequest;
    bookShowTime:ShowTime;
    moviesData:Movie[];
    loggedInUser:Login;
    showTimeID:string;
    seatCount:number;
    selectedSeats:any;
    bookingModelState:boolean
}
export interface Organization {
    nodes : TicketBooking,
  }