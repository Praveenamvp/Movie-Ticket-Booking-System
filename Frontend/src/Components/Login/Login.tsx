import { useState } from "react";
import Modal from "react-modal";
import UserService from "../../Services/UserService";
import { useDispatch, useSelector } from "react-redux";
import {
  updateLoggedInUser,
  updateLoginModelState,
  updateRegisterModelState,
} from "../../Redux/Action";
import reg from "../../Images/Wavy_Gen-01_Single-07.jpg";
import "../Login/Login.css";
import TicketBooking from "../../Models/StateModels";
import { toast } from "react-toastify";

function LoginComponent() {
  const dispatch = useDispatch();
  const ticketBooking = useSelector((state: TicketBooking) => state);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const validateEmail = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      setEmailError("Invalid email format");
    }
  };

  

  const handleLogin = async () => {
    try {
      const result = await UserService.loginUser(login);
      if (result.status === 200) {
        toast.success("Login Successful");
        dispatch(updateLoginModelState(false));
        dispatch(updateLoggedInUser(result.data));
      } else {
        toast.error("Login Unsuccessful");
      }
    } catch (error) {
      toast.error("An error occurred during login");
    }
  };

  const handleSignUp = () => {
    dispatch(updateLoginModelState(false));
    dispatch(updateRegisterModelState(true));
  };

  const closeModal = () => {
    dispatch(updateLoginModelState(false));
  };

  return (
    <div>
      <Modal
        isOpen={ticketBooking.loginModelState}
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
        <div className="login-main-content">
          <div className="login-left">
            <img className="login-img" src={reg} alt="Registration"></img>
          </div>
          <div className="login-content">
            <label>Email</label>
            <input
              type="email"
              onChange={(e) => {
                validateEmail(e.target.value);
                setLogin({
                  ...login,
                  email: e.target.value,
                });
              }}
            />
            {emailError && (
              <span className="emailAddress-span">{emailError}</span>
            )}
            <div>
              <label>Password</label>
              <input
                type="password"
                onChange={(e) => {
                  setLogin({
                    ...login,
                    password: e.target.value,
                  });
                }}
              />
              {passwordError && (
                <span className="emailAddress-span">{passwordError}</span>
              )}
            </div>

            <br />
            <br />

            <button onClick={handleLogin}>Login</button>
            <p>
              Not a registered user?{" "}
              <span className="register-span" onClick={handleSignUp}>
                Sign up
              </span>
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default LoginComponent;
