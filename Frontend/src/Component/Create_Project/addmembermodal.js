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

  const handleAddMember = () => {
    console.log('function chal raha hai');
    console.log(`Adding ${selectedUser} as ${selectedRole}`);
    onAddMember(selectedUser, selectedRole); // Pass the selected user and role to the parent component
    
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
