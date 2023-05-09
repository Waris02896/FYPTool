import React, { useEffect, useState } from "react";

const ProfilesPage = ({ handleMemberAddition }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(savedUsers);
  }, []);

  const handleDeleteUser = (email) => {
    const newUsers = users.filter((user) => user.email !== email);
    setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
  };

  return (
    <div>
      {users.map((user, index) => (
        <div key={index}>
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Profile Type: {user.profileType}</p>
          <button
            onClick={() => {
              handleMemberAddition(user);
              handleDeleteUser(user.email);
            }}
          >
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProfilesPage;
