import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./Components/LandingPage/LandingPage";
import MovieDetails from "./Components/MovieDetails/MovieDetails";
import ShowTimeComponent from "./Components/ShowTime/ShowTime";
import ProfileComponent from "./Components/Profile/Profile";
import NavBarComponent from "./Components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";
import SeatComponent from "./Components/Seats/Seat";


function App() {
  return (
    <div className="App">
            <ToastContainer />

      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<ParentComponent />} /> */}
          <Route path="/" element={<LandingPage />} />

          <Route path="/moviedetails" element={<MovieDetails />} />
          <Route path="/profile" element={<ProfileComponent />} />
          <Route path="/seatComponent" element={<SeatComponent />} />

          <Route path="/moviedetails/showtime" element={<ShowTimeComponent />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
