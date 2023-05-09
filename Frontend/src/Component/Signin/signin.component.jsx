import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

import "./signinstyles.css";

const SignIn = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileType, setProfileType] = useState("");
  const [isSignInClicked, setIsSignInClicked] = useState(false);

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleProfileSelect = (type) => {
    setProfileType(type);
    handleModalClose();
    localStorage.setItem("profileType", type);
    navigate(`/${type}-board`);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      const savedProfileType = localStorage.getItem("profileType");
      if (savedProfileType) {
        navigate(`/${savedProfileType}-board`);
      } else {
        setIsModalOpen(true);
      }
    } else {
      // handle invalid email or password
    }
  };

  return (
    <div className="signin-page">
      <div className="form-container">
        <h2>Sign In</h2>
        <form onSubmit={handleSignIn}>
          <label>
            Email:
            <br />
            <input type="email" name="email" placeholder="Enter your email" />
          </label>
          <br />
          <label>
            Password:
            <br />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
            />
          </label>
          <br />
          <button type="submit" className="sign-in-button">Sign In</button>
        </form>
      </div>
      <div className="button-container">
        <label>New Here?</label>
        <div>
          <button type="button" className="sign-up-button" onClick={handleSignUp}>
            Sign Up
          </button>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="Profile Selection Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Select Your Profile Type</h2>
        <div className="button-container">
          <button onClick={() => handleProfileSelect("student")}>Student</button>
          <button onClick={() => handleProfileSelect("supervisor")}>
            Supervisor
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SignIn;




