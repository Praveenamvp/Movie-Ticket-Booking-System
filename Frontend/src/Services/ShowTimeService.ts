import axios from "axios";
import DateTimeRequest from "../Models/DateTime";
import ShowTimeIdSeats from "../Models/ShowTimeIdSeats";

class ShowTimeService {
  http = axios.create({
    baseURL: "https://localhost:7016/api/ShowTime",
  });

  async fetchDates(uid: string) {
    const response = await this.http.get(`/AllDates?id=${uid}`);

    return response.data;
  }

  async fetchShowTime(dateTime: DateTimeRequest) {
    const response = await this.http.post("/ShowTimesByMovie", dateTime);
    return response.data;
  }
  async updateSeats(movieIdDate: ShowTimeIdSeats) {
    const response = await this.http.post("/UpdateSeats", movieIdDate);
    return response.data;
  }

  async fetchSeatsByShowTimeID(uid: string) {
    const response = await this.http.get(`/GetAllSeats?id=${uid}`);
    console.log(response);
    return response.data;
  }
}
export default new ShowTimeService();
