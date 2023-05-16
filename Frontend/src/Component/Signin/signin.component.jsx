// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import Modal from "react-modal";

// import "./signinstyles.css";

// const SignIn = () => {
//   const navigate = useNavigate();
//   // const [isModalOpen, setIsModalOpen] = useState(false);
//   // const [profileType, setProfileType] = useState("");
//   // const [isSignInClicked, setIsSignInClicked] = useState(false);

//   const handleSignUp = () => {
//     navigate("/signup");
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//   };

//   // const handleProfileSelect = (type) => {
//   //   setProfileType(type);
//   //   handleModalClose();
//   //   localStorage.setItem("profileType", type);
//   //   navigate(`/${type}-board`);
//   // };

//   const handleSignIn = (e) => {
//     e.preventDefault();
//     const email = e.target.email.value;
//     const password = e.target.password.value;
//     const users = JSON.parse(localStorage.getItem("users")) || [];

//     const user = users.find((u) => u.email === email && u.password === password);

//     if (user) {
//       const savedProfileType = localStorage.getItem("profileType");
//       if (savedProfileType) {
//         navigate(`/${savedProfileType}-board`);
//       } else {
//         setIsModalOpen(true);
//       }
//     } else {
//       // handle invalid email or password
//     }
//   };

//   return (
//     <div className="signin-page">
//       <div className="form-container">
//         <h2>Sign In</h2>
//         <form onSubmit={handleSignIn}>
//           <label>
//             Email:
//             <br />
//             <input type="email" name="email" placeholder="Enter your email" />
//           </label>
//           <br />
//           <label>
//             Password:
//             <br />
//             <input
//               type="password"
//               name="password"
//               placeholder="Enter your password"
//             />
//           </label>
//           <br />
//           <button type="submit" className="sign-in-button">Sign In</button>
//         </form>
//       </div>
//       <div className="button-container">
//         <label>New Here?</label>
//         <div>
//           <button type="button" className="sign-up-button" onClick={handleSignUp}>
//             Sign Up
//           </button>
//         </div>
//       </div>
//       {/* <Modal
//         isOpen={isModalOpen}
//         onRequestClose={handleModalClose}
//         contentLabel="Profile Selection Modal"
//         className="modal"
//         overlayClassName="modal-overlay"
//       >
//         <h2>Select Your Profile Type</h2>
//         <div className="button-container">
//           <button onClick={() => handleProfileSelect("student")}>Student</button>
//           <button onClick={() => handleProfileSelect("supervisor")}>
//             Supervisor
//           </button>
//         </div>
//       </Modal> */}
//     </div>
//   );
// };

// export default SignIn;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signinstyles.css";
import ForgotPassword from "../Forgot Password/forgotpass.component";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const [profileType, setProfileType] = useState("");
  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    // const email = e.target.email.value;
    // const password = e.target.password.value;
    // const users = JSON.parse(localStorage.getItem("users")) || [];

    // const user = users.find((u) => u.email === email && u.password === password);

    // if (profileType === "") {
    //   alert("Please select a profile type.");
    //   return;
    // }

    const userData = {
      user: {
        email,
        password
        // profileType
      }
    };
    await fetch(
      'http://localhost:3000/fyp/login',
      {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body:JSON.stringify(userData.user)
      })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        if (data.error && data.error.errorMessage) {
          alert(data.error.errorMessage)
        }
        else if (data.data && data.data.response) {
          // alert(data.data.response);
          navigate("/student-board");
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
    <div className="signin-page">
      <div className="form-container">
        <h2>Sign In</h2>
        <form onSubmit={handleSignIn}>
          <label>
            Email:
            <br />
            <input
              type="email"
              name="Email"
              placeholder="Enter your Email"
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
              name="Password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
      {/* <button type="submit">Sign Up</button>
      </form> */}
    </div>
  );
};

export default SignIn;

