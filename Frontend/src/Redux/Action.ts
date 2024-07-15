import DateTimeRequest from "../Models/DateTime";
import Login from "../Models/Login";
import Movie from "../Models/Movie";
import ShowTime from "../Models/ShowTime";

export const UPDATE_LOCATIONUID="UPDATE_LCATIONUID";
export const UPDATE_LOCATIONNAME="UPDATE_LCATIONNAME";
export const UPDATE_MODELSTATE="UPDATE_MODELSTATE";
export const UPDATE_TICKICON_STATE="UPDATE_TICKICON_STATE";
export const UPDATE_NAME="UPDATE_NAME";
export const UPDATE_SHOWTIME="UPDATE_SHOWTIME";
export const UPDATE_DATETIMEREQUEST="UPDATE_DATETIMEREQUEST";
export const UPDATE_SHOWTIMELIKESTATE="UPDATE_SHOWTIMELIKESTATE"
export const UPDATE_BOOKSHOWTIME="UPDATE_BOOKSHOWTIME";
export const UPDATE_MOVIES="UPDATE_MOVIES";
export const UPDATE_LOGGEDINUSER="UPDATE_LOGGEDINUSER";
export const UPDATE_LOGIN_MODELSTATE="UPDATE_LOGIN_MODELSTATE";
export const UPDATE_REGISTER_MODELSTATE="UPDATE_REGISTER_MODELSTATE";
export const UPDATE_SEATNUMBER_MODELSTATE="UPDATE_SEATNUMBER_MODELSTATE";
export const UPDATE_SHOWTIME_UID="UPDATE_SHOWTIME_UID";
export const UPDATE_SEATCOUNT="UPDATE_SEATCOUNT";
export const UPDATE_SELECTED_SEATS="UPDATE_SELECTED_SEATS";
export const UPDATE_BOOKING_MODELSTATE="UPDATE_BOOKING_MODELSTATE";



export const updateLocationUID = (filterLocationUID:string) =>{
    return{
        type:UPDATE_LOCATIONUID,
        payload:filterLocationUID
    }
}
export const updateLocationName = (filterLocationName:string) =>{
    return{
        type:UPDATE_LOCATIONNAME,
        payload:filterLocationName
    }
}
export const updateModelState = (modelState:boolean) =>{
    return{
        type:UPDATE_MODELSTATE,
        payload:modelState
    }
}
export const updateTicketState = (tickState:boolean) =>{
    return{
        type:UPDATE_TICKICON_STATE,
        payload:tickState
    }
}
export const updateName = (name:string) =>{
    return{
        type:UPDATE_NAME,
        payload:name
    }
}
export const updateShowTime = (showTime:ShowTime[]) =>{
    return{
        type:UPDATE_SHOWTIME,
        payload:showTime
    }
}
export const updateDateTime = (dateTime:DateTimeRequest) =>{
    return{
        type:UPDATE_DATETIMEREQUEST,
        payload:dateTime
    }
}
export const updateBookShowTime = (booShowTime:ShowTime) =>{
    return{
        type:UPDATE_BOOKSHOWTIME,
        payload:booShowTime
    }
}
export const updateShowTimeLikeState = (showTimeLikeState:ShowTime) =>{

    return{
        type:UPDATE_SHOWTIMELIKESTATE,
        payload:showTimeLikeState,
        
    }
}
export const updateMovies = (moviesData:Movie) =>{

    return{
        type:UPDATE_MOVIES,
        payload:moviesData,
        
    }
}
export const updateLoggedInUser = (userData:Login) =>{

    return{
        type:UPDATE_LOGGEDINUSER,
        payload:userData,
        
    }
}

export const updateLoginModelState = (loginModelState:boolean) =>{

    return{
        type:UPDATE_LOGIN_MODELSTATE,
        payload:loginModelState,
        
    }
}

export const updateRegisterModelState = (registerModelState:boolean) =>{

    return{
        type:UPDATE_REGISTER_MODELSTATE,
        payload:registerModelState,
        
    }
}
export const updateBookingModelState = (bookingModelState:boolean) =>{

    return{
        type:UPDATE_BOOKING_MODELSTATE,
        payload:bookingModelState,
        
    }
}
export const updateSeatNumberModelState = (seatNumberModelState:boolean) =>{

    return{
        type:UPDATE_SEATNUMBER_MODELSTATE,
        payload:seatNumberModelState,
        
    }
}
export const updateShowTimeUID=(showTimeUID:string)=>{
    return{
        type:UPDATE_SHOWTIME_UID,
        payload:showTimeUID
    }
}
export const updateSeatCount=(seatCount:any)=>{
    return{
        type:UPDATE_SEATCOUNT,
        payload:seatCount
    }
}
export const updateSeletedSeats=(selectedSeats:any)=>{
    return{
        type:UPDATE_SELECTED_SEATS,
        payload:selectedSeats
    }
}

