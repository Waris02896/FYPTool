// import { useState } from 'react';

// function AddProfile() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [userType, setUserType] = useState('Teacher');

//   function handleSubmit(event) {
//     event.preventDefault();
//     const profile = { name, email, userType };
//     let profiles = JSON.parse(localStorage.getItem('profiles')) || [];
//     profiles.push(profile);
//     localStorage.setItem('profiles', JSON.stringify(profiles));
//     setName('');
//     setEmail('');
//     setUserType('Teacher');
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="name">Name:</label>
//         <input
//           type="text"
//           id="name"
//           value={name}
//           onChange={(event) => setName(event.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={(event) => setEmail(event.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="userType">User Type:</label>
//         <select
//           id="userType"
//           value={userType}
//           onChange={(event) => setUserType(event.target.value)}
//         >
//           <option value="Teacher">Teacher</option>
//           <option value="Student">Student</option>
//         </select>
//       </div>
//       <button type="submit">Add Profile</button>
//     </form>
//   );
// }
// export default AddProfile;

import React, { useState } from 'react';

function ProfileModal({ closeModal }) {
  const [profileType, setProfileType] = useState('');

  const handleProfileTypeChange = (event) => {
    setProfileType(event.target.value);
  };

  const saveProfileType = () => {
    localStorage.setItem('profileType', profileType);
    closeModal();
  };

  return (
    <div className="backdrop">
      <div className="modal">
        <h2>Choose Your Profile Type</h2>
        <div>
          <label>
            <input
              type="radio"
              name="profileType"
              value="student"
              checked={profileType === 'student'}
              onChange={handleProfileTypeChange}
            />
            Student
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="profileType"
              value="supervisor"
              checked={profileType === 'supervisor'}
              onChange={handleProfileTypeChange}
            />
            Supervisor
          </label>
        </div>
        <div className="modal-buttons">
          <button onClick={saveProfileType}>Save</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;