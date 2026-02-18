import { useState } from "react";
import reg from "../../Images/Login.png";
import Modal from "react-modal";
import UserService from "../../Services/UserService";
import { useDispatch, useSelector } from "react-redux";
import TicketBooking from "../../Models/StateModels";
import { updateLoginModelState, updateRegisterModelState } from "../../Redux/Action";
import LoginComponent from "../Login/Login";
import "../Register/Register.css";

function RegisterComponent() {
  const [register, setRegister] = useState({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleRegister = () => {
    if (!agreedToTerms) {
      alert("Please agree to the Terms & Conditions");
      return;
    }
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
    <div>
      <Modal
        isOpen={ticketBooking.registerModelState}
        onRequestClose={closeModal}
        contentLabel="Popup Content"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "55%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "420px",
            height: "auto",
            minHeight: "580px",
            overflow: "visible",
            padding: "32px 40px 28px",
            backgroundColor: "#fff",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.18)",
            borderRadius: "16px",
          },
        }}
      >
        <div className="register-main-content">
          <div className="register-right">

            {/* Top illustration */}
            <img src={reg} alt="Register" className="register-top-img" />

            {/* Title */}
            <h2 className="register-title">Join the Movie Club!</h2>

            {/* Heart */}
            <div className="register-heart">♡</div>

            {/* Full Name */}
            <div className="register-input-wrapper">
              <input
                type="text"
                placeholder="Full Name"
                onChange={(e) =>
                  setRegister({ ...register, userName: e.target.value })
                }
              />
              <span className="register-input-icon">👤</span>
            </div>

            {/* Email */}
            <div className="register-input-wrapper">
              <input
                type="email"
                placeholder="Email"
                onChange={(e) =>
                  setRegister({ ...register, email: e.target.value })
                }
              />
              <span className="register-input-icon">🔒</span>
            </div>

            {/* Phone Number */}
            <div className="register-input-wrapper">
              <input
                type="text"
                placeholder="Phone Number"
                onChange={(e) =>
                  setRegister({ ...register, phoneNumber: e.target.value })
                }
              />
              <span className="register-input-icon">📞</span>
            </div>

            {/* Password */}
            <div className="register-input-wrapper">
              <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setRegister({ ...register, password: e.target.value })
                }
              />
              <span className="register-input-icon">🔒</span>
            </div>

            {/* Terms & Conditions */}
            <div className="register-terms">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
              />
              <label htmlFor="terms" style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                I agree to the <a>Terms &amp; Conditions</a>
              </label>
            </div>

            {/* Register button */}
            <button className="register-button" onClick={() => handleRegister()}>
              Regular Account
            </button>

            {/* Sign in link */}
            <p>
              Don't have an account?{" "}
              <span onClick={() => handleLogin()}>Login</span>
            </p>

          </div>
        </div>
      </Modal>
      <LoginComponent />
    </div>
  );
}

export default RegisterComponent;