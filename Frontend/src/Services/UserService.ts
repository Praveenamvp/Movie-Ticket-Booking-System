import axios from "axios";
import { useDispatch } from "react-redux";
import { updateLoggedInUser } from "../Redux/Action";
import LoginRequest from "../Models/LoginRequest";
class LocationService {
  http = axios.create({
    baseURL: " https://localhost:7016/api/User/",
  });
  async loginUser(userData: any) {
    console.log(userData+"login data");
    
    const response = await this.http.post("Login", userData);
    console.log(response.data.name+ "result");
    return response;
  }
  async registerUser(userData: any) {
    const response = await this.http.post("Register", userData);
    console.log(response.status + "result");

    return response.data;
  }
}

export default new LocationService();
