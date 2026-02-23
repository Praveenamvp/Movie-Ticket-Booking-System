import { useState } from "react";
import Modal from "react-modal";
import UserService from "../../Services/UserService";
import { useDispatch, useSelector } from "react-redux";
import {
  updateLoggedInUser,
  updateLoginModelState,
  updateRegisterModelState,
} from "../../Redux/Action";
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
    } else {
      setEmailError("");
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
            width: "420px",
            height: "auto",
            minHeight: "500px",
            overflow: "visible",
            padding: "32px 44px 32px",
            backgroundColor: "#fff",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.18)",
            borderRadius: "16px",
          },
        }}
      >
        <div className="login-main-content">
          <div className="login-content">
            <img src="/Images/Login.png" loading="lazy" alt="Login" className="login-top-img" />
            <h2 className="login-title">Welcome Back!</h2>
            <div className="login-heart">♡</div>

            <div className="input-wrapper">
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => {
                  validateEmail(e.target.value);
                  setLogin({ ...login, email: e.target.value });
                }}
              />
              <span className="input-icon">👤</span>
            </div>
            {emailError && (
              <span className="emailAddress-span">{emailError}</span>
            )}

            <div className="input-wrapper">
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setLogin({ ...login, password: e.target.value });
                }}
              />
              <span className="input-icon">🔒</span>
            </div>
            {passwordError && (
              <span className="emailAddress-span">{passwordError}</span>
            )}

            <button onClick={handleLogin}>Log In</button>

            <p>
              Don't have the account?{" "}
              <span className="register-span" onClick={handleSignUp}>
                Register
              </span>
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default LoginComponent;
