export default interface BookingRequest {
    showtimeId: string;
    movieID:string,
    userUID: string;
    bookingDate: Date;
    noOfSeats: number;
    seatUIDs:String[]
  }
