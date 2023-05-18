import React, { useState } from 'react';

const AddMembers = ({ onAddMember }) => {
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleAddMember = async () => {
    const members = { email: selectedUser, role: selectedRole};
    // if (editIndex !== null) {
    //   const updatedProjects = [...projects];
    //   updatedProjects[editIndex] = project;
    //   setProjects(updatedProjects);
    //   setEditIndex(null);
    // } else {
    //   setProjects([...projects, project]);
    // }
    //setShowModal(false);
    setSelectedUser('');
    setSelectedRole('');
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
        user: selectedUser,
        role: selectedRole,
      }),
    })
    .then((response) => {
      if(response.ok) {
        console.log("Member added succesfully");
        onAddMember(selectedUser, selectedRole);
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
        Email:
        <input
          type="email"
          value={selectedUser}
          onChange={handleUserChange}
          placeholder="Enter email"
        />
      </label>
      <label>
        Role:
        <select value={selectedRole} onChange={handleRoleChange}>
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
