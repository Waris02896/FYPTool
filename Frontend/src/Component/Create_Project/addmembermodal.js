import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const AddMembers = ({ onAddMember }) => {
  const [selectedUserId, setselectedUserId] = useState('');
  const [selectedRight, setselectedRight] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const projectId = searchParams.get('id');

  const handleUserChange = (event) => {
    setselectedUserId(event.target.value);
  };

  const handleRoleChange = (event) => {
    setselectedRight(event.target.value);
  };

  const handleAddMember = async () => {
    const members = { email: selectedUserId, role: selectedRight};
    // if (editIndex !== null) {
    //   const updatedProjects = [...projects];
    //   updatedProjects[editIndex] = project;
    //   setProjects(updatedProjects);
    //   setEditIndex(null);
    // } else {
    //   setProjects([...projects, project]);
    // }
    //setShowModal(false);
    setselectedUserId('');
    setselectedRight('');
    //setProjectType('');
    //setProjects([...projects, project]);
    
    await fetch('http://localhost:3000/fyp/addUser',
    {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'authorization':`"${localStorage.getItem("token")}"`,
      },
      body: JSON.stringify({
        user_id: selectedUserId,
        rights: selectedRight,
        project_id: projectId
      }),
    })
    .then((response) => {
      if(response.data.response != null) {
        console.log("Member added succesfully");
        onAddMember(selectedUserId, selectedRight);
      }
      else {
        console.log("Failed to add member");
      }
    }).catch((error) => {
      console.log(error);
    });

    if (typeof window !== 'undefined') {
      localStorage.setItem('members', JSON.stringify([...members, members]));
    }
  };

  return (
    <div>
      <h2>Add Members</h2>
      <label>
        User_id:
        <input
          type="email"
          value={selectedUserId}
          onChange={handleUserChange}
          placeholder="Enter user_id"
        />
      </label>
      <label>
        Rights:
        <select value={selectedRight} onChange={handleRoleChange}>
          <option value="">Select a role</option>
          <option value="owner">Owner</option>
          <option value="editor">Editor</option>
          <option value="viewer">Viewer</option>
        </select>
      </label>
      <button onClick={handleAddMember}>
        Add Member
      </button>
    </div>
  );
};

export default AddMembers;
