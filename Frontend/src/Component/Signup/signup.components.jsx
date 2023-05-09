import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signupstyles.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileType, setProfileType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (profileType === "") {
      alert("Please select a profile type.");
      return;
    }

    const userData = { name, email, password, profileType };
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));

    if (profileType === "student") {
      navigate("/student-board");
    } else {
      navigate("/supervisor-board");
    }
  };

  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/");
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          FullName:
          <br />
          <input
            type="text"
            name="name"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <br />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <br />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <label>
          Confirm Password:
          <br />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <br />
        <label>
          Profile Type:
          <br />
          <select
            value={profileType}
            onChange={(e) => setProfileType(e.target.value)}
          >
            <option value="">Select a profile type</option>
            <option value="student">Student</option>
            <option value="supervisor">Supervisor</option>
          </select>
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
