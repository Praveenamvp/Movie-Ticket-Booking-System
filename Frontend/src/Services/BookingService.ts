import axios from "axios";
import BookingRequest from "../Models/Booking";

class BookingService{
    http=axios.create({
        baseURL:"https://localhost:7016/api/"
    })  

   async addBooking(booking:BookingRequest){
    console.log(booking);
    
    const response= await this.http.post("Booking",booking);
    return response;
   }
}

export default new BookingService();