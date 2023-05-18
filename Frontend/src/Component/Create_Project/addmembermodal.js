import React, { useState } from 'react';

const AddMembers = ({ onAddMember }) => {
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [projectMembers, setProjectMembers] = useState([]);


  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const deleteMember = (index) => {
    const updatedMembers = [...projectMembers];
    updatedMembers.splice(index, 1);
    setProjectMembers(updatedMembers);
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

      <div>
        <h3>Members:</h3>
        <ul>
          {projectMembers.map((members, index) => (
            <li key={index}>
              <div>
                <strong>Email:</strong> {members.email}
              </div>
              <div>
                <strong>Role:</strong> {members.role}
              </div>
              {/* <div>
                      {handleAddMember()}
                    </div> */}
              {/* <AddMembers onAddMember={handleAddMember}/> */}
              <button onClick={() => deleteMember(index)}>
                Remove Member
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddMembers;
