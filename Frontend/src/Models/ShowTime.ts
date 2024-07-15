export default interface ShowTime {
    uid: string;
    movieID: string;
    startTime: Date;
    locationName?: string | null;
    likeState:boolean;
    availableSeats:number | 0
  }