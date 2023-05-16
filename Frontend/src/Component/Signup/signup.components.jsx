import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signupstyles.css";

const SignUp = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [profileType, setProfileType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (profileType === "") {
    //   alert("Please select a profile type.");
    //   return;
    // }

    const userData = {
      user: {
        firstname,
        lastname,
        email,
        password,
        confirmPassword
        // profileType
      }
    };
    await fetch(
      'http://localhost:3000/fyp/register',
      {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then((response) => {
        console.log(response);
        if (response.data.response != null) {
         
          alert(response.data.response)
        }
        else if ( response.error.errorMessage != null) {
          alert(response.error.errorMessage);
        }
        // else 
      })
      // const data = await response.json();

      // if (data.data.response != null) {
      //   alert(data.data.response);

      // }
      .catch((error) => {
        console.log(error);
          alert("Connection Failed.");
      })

  };

  const navigate = useNavigate();
  // .then((response) => {
  //   console.log(`Response: ${response}`);
  // })
  // .catch((err) => {
  //   console.log(`Error: ${response}`);
  // })
  // const users = JSON.parse(localStorage.getItem("users")) || [];
  // users.push(userData);
  // localStorage.setItem("users", JSON.stringify(users));

  // if (profileType === "student") {
  //   navigate("/student-board");
  // } else {
  //   navigate("/supervisor-board");
  // }
  // };

  // const handleSignIn = () => {
  //   navigate("/");
  // };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <br />
          <input
            type="text"
            name="First Name"
            placeholder="Enter your First Name"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          Last Name:
          <br />
          <input
            type="text"
            name="name"
            placeholder="Enter your Last Name"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
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
        {/* <label>
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
        </label> */}
        {/* <br /> */}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
