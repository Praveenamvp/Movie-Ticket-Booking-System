import { useState } from "react";
import reg from "../../Images/Register.jpg"
import Modal from "react-modal";
import UserService from "../../Services/UserService";
import { useDispatch, useSelector } from "react-redux";
import TicketBooking from "../../Models/StateModels";
import { updateLoginModelState, updateRegisterModelState } from "../../Redux/Action";
import LoginComponent from "../Login/Login";
import "../Register/Register.css"
function RegisterComponent() {
  const [register, setRegister] = useState({});
  const handleRegister = () => {
    var result = UserService.registerUser(register);
    console.log(result + "result");
    dispatch(updateRegisterModelState(false));
  };

  const handleLogin = () => {
    dispatch(updateRegisterModelState(false));
    dispatch(updateLoginModelState(true));
  };
  const dispatch = useDispatch();

  const ticketBooking = useSelector((state: TicketBooking) => state);

  const closeModal = () => {
    dispatch(updateRegisterModelState(false));
  };
  return (
    <div >
      <Modal
        isOpen={ticketBooking.registerModelState}
        onRequestClose={closeModal}
        contentLabel="Popup Content"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: "50%",
            padding: "20px",
            backgroundColor: "#fff",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
            borderRadius: 10,
          },
        }}
      >
        <div className="register-main-content">
          <div className="register-left">
            <img className="register-img" src={reg}></img>
          </div>
          <div className="register-right">
          <label>UserName</label>
          <input
            type="text"
            onChange={(e) =>
              setRegister({
                ...register,
                userName: e.target.value,
              })
            }
          ></input>
          <label>Email</label>
          <input 
            type="email"
            onChange={(e) =>
              setRegister({
                ...register,
                email: e.target.value,
              })
            }
          ></input>
          <label>Phone Number</label>
          <input
            type="text"
            onChange={(e) =>
              setRegister({
                ...register,
                phoneNumber: e.target.value,
              })
            }
          ></input>
          <label>Password</label>
          <input
            type="password"
            onChange={(e) =>
              setRegister({
                ...register,
                password: e.target.value,
              })
            }
          ></input>
          <br/>
          <br/>

          <button className="register-button" onClick={() => handleRegister()}>Register</button>
          <p>registered user <span onClick={() => handleLogin()}>sign in</span></p>
          {/* <button className="register-button" >login</button> */}

        </div>
        </div>
      
      </Modal>
      <LoginComponent/>
    </div>
  );
}

export default RegisterComponent;
