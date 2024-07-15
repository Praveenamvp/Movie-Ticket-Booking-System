import TicketBooking from "../Models/StateModels";
import {
  UPDATE_LOCATIONUID,
  UPDATE_LOCATIONNAME,
  UPDATE_MODELSTATE,
  UPDATE_TICKICON_STATE,
  UPDATE_NAME,
  UPDATE_SHOWTIME,
  UPDATE_DATETIMEREQUEST,
  UPDATE_SHOWTIMELIKESTATE,
  UPDATE_BOOKSHOWTIME,
  UPDATE_MOVIES,
  UPDATE_LOGGEDINUSER,
  UPDATE_LOGIN_MODELSTATE,
  UPDATE_REGISTER_MODELSTATE,
  UPDATE_SEATNUMBER_MODELSTATE,
  UPDATE_SHOWTIME_UID,
  UPDATE_SEATCOUNT,
  UPDATE_SELECTED_SEATS,
  UPDATE_BOOKING_MODELSTATE
} from "./Action";

const intitialState: TicketBooking = {
  filterLocationUID: "FA3EE1D7-0924-4C60-8360-F73C8889A52D",
  filterLocationName: "Madurai",
  modelState: true,
  loginModelState:false,
  registerModelState:false,
  seatNumberModelState:false,
  filterTickIcon: false,
  name:"",
  showTime:[],
  bookShowTime : {
    uid: "",
    movieID: "",
    startTime: new Date(),
    locationName: "",
    likeState:false,
    availableSeats: 0
  },
  dateTime:{date:"",movieUID:""},
  moviesData:[],
  loggedInUser:{
    uid:"",
    token: "",
    email: "",
    name:"",
    phoneNumber:""
  },
  showTimeID:"",
  seatCount:0,
  selectedSeats:[],
  bookingModelState:false


};

export const movieReducer = (state = intitialState, action: any) => {
  switch (action.type) {
    case UPDATE_LOCATIONUID:
      return {
        ...state,
        filterLocationUID: action.payload,
      };
    case UPDATE_LOCATIONNAME:
      return {
        ...state,
        filterLocationName: action.payload,
      };
    case UPDATE_MODELSTATE:
      return {
        ...state,
        modelState: action.payload,
      };
      case UPDATE_LOGIN_MODELSTATE:
      return {
        ...state,
        loginModelState: action.payload,
      };
      case UPDATE_REGISTER_MODELSTATE:
        return {
          ...state,
          registerModelState: action.payload,
        };
        case   UPDATE_SEATNUMBER_MODELSTATE:
          return {
            ...state,
            seatNumberModelState: action.payload,
          };
    case UPDATE_TICKICON_STATE:
      return {
        ...state,
        filterTickIcon: action.payload,
      };
      case UPDATE_NAME:
      return {
        ...state,
        name: action.payload,
      };
      case UPDATE_BOOKSHOWTIME:
        return {
          ...state,
          bookShowTime: action.payload,
        };
      case UPDATE_SHOWTIME:
        return {
          ...state,
          showTime: action.payload,
        };
        case UPDATE_SHOWTIMELIKESTATE:
            const updatedShowTime = state.showTime.map((like) => {
                if (like.uid === action.payload.uid) {
                  
                    
                    return {
                        ...like,
                        likeState: action.payload.likeState
                    };
                } else {
                    return like;
                }
            });
        
            return {
                ...state,
                showTime: updatedShowTime
            };
        
    case UPDATE_DATETIMEREQUEST:
        return {
          ...state,
          dateTime: {
            movieUID:action.payload.movieUID,
            date:action.payload.date,

          },
        };
        case UPDATE_MOVIES:
          return {
            ...state,
            moviesData: action.payload,
          };
          case UPDATE_LOGGEDINUSER:
          return {
            ...state,
            loggedInUser: action.payload,
          };
          case UPDATE_SHOWTIME_UID:
            return {
              ...state,
              showTimeID: action.payload,
            };
            case UPDATE_SEATCOUNT:
            return {
              ...state,
              seatCount: action.payload,
            };
            case UPDATE_SELECTED_SEATS:
              return {
                ...state,
                selectedSeats: action.payload,
              };
              case UPDATE_BOOKING_MODELSTATE:
                return {
                  ...state,
                  bookingModelState: action.payload,
                };
             
           
    default:
      return state;
  }
};
