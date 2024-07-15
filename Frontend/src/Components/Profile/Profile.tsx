import "../Profile/Profile.css";
import profile from "../../Images/profile-picture.png";
import helloimg from "../../Images/helloCute.gif";

import { useSelector } from "react-redux";
import NavBarComponent from "../Navbar/Navbar";
function ProfileComponent() {
  const ticketBooking = useSelector((state: any) => state);

  return (
    <div>
        <NavBarComponent/>
        <br/>
         <div className="profile-main-content">
        
      <div>
        <div className="p-main-content">
          {/* <img className="profile-img" src={profile}></img> */}
          <h1 className="profile-name">
            Hey! {ticketBooking.loggedInUser.name}
          </h1>
        </div>
      </div>
      <div className="profile-content">
        <div className="profile-left-content">
          <img className="hello-img" src={helloimg}></img>
        </div>
        <div className="profile-rigth-content">
          <div>
            <h2>Account Details</h2>
            <table>
              <tr>
                <td>
                  <p>Email Address</p>
                </td>
                <td>
                  <button className="profile-button">{ticketBooking.loggedInUser.email}</button>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Mobile Number</p>
                </td>
                <td>
                  <button className="profile-button">{ticketBooking.loggedInUser.phoneNumber}</button>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
   
  );
}

export default ProfileComponent;
