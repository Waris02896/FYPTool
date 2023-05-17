import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Create_Project.css";

function CreateProjectModal() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectType, setProjectType] = useState('');
  // const [editIndex, setEditIndex] = useState(null); // added editIndex state
  const [projectMembers, setProjectMembers] = useState([]);

  const addProject = async () => {
    const project = { name: projectName, description: projectDescription, type: projectType, members: projectMembers };
    // if (editIndex !== null) {
    //   const updatedProjects = [...projects];
    //   updatedProjects[editIndex] = project;
    //   setProjects(updatedProjects);
    //   setEditIndex(null);
    // } else {
    //   setProjects([...projects, project]);
    // }
    setShowModal(false);
    setProjectName('');
    setProjectDescription('');
    setProjectType('');
    setProjects([...projects, project]);

    await fetch(
      'http://localhost:3000/fyp/project',
      {
        method: 'POST',
        body: JSON.stringify(project),
        headers: {
          'Content-Type': 'application/json',
          "authorization": `"${localStorage.getItem("token")}"`,
        }
      })
      .then(response => response.json())
      .then((response) => {
        if (response.data.response != null) {

          alert(response.data.response)
        }
        else if (response.error.errorMessage != null) {
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
        alert("not created.");
      })

    if (typeof window !== 'undefined') {
      localStorage.setItem('projects', JSON.stringify([...projects, project]));
    }
  };

  const handleAddMember = (userEmail, userRole) => {
    const members = { email: userEmail, role: userRole };
    setProjectMembers([...projectMembers, members]);
  };

  const deleteMember = (index) => {
    const updatedMembers = [...projectMembers];
    updatedMembers.splice(index, 1);
    setProjectMembers(updatedMembers);
  };

  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
  };

  const handleProjectDescriptionChange = (event) => {
    setProjectDescription(event.target.value);
  };

  const handleProjectTypeChange = (event) => {
    setProjectType(event.target.value);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    //setEditIndex(null);
    setShowModal(false);
  };

  const deleteProject = (index) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  const getProjectsFromLocalStorage = () => {
    let projectsFromLocalStorage;
    if (typeof window !== 'undefined') {
      projectsFromLocalStorage = localStorage.getItem('projects');
    }
    if (projectsFromLocalStorage) {
      setProjects(JSON.parse(projectsFromLocalStorage));
    }
  };

  React.useEffect(() => {
    getProjectsFromLocalStorage();
  }, []);

  // const handleEditClick = (index) => {
  //   setEditIndex(index);
  //   const { name, description, type } = projects[index];
  //   setProjectName(name);
  //   setProjectDescription(description);
  //   setProjectType(type);
  //   setShowModal(true);
  // };

  return (
    <div>
      <h1>Projects</h1>
      <button onClick={openModal}>Add Project</button>
      <ul>
        {projects.map((project, index) => (
          <li key={index}>
            <div><strong>Name:</strong> {project.name}</div>
            <div><strong>Description:</strong> {project.description}</div>
            <div><strong>Type:</strong> {project.type}</div>
            <div>
              <Link to={`/student-board`}>View</Link>
              {/* <button name ="edit" onClick={() => handleEditClick(index)}>Edit</button> */}
              <Link to={'/addmember'}>Add Member</Link>
              <Link to={'/processcard'}>Add Process Card</Link>
              <button name="delete" onClick={() => deleteProject(index)}>Delete</button>
            </div>
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
                    <button onClick={() => deleteMember(index)}>
                      Remove Member
                    </button>
                  </li>
                ))}
              </ul>
            </div>

          </li>
        ))}
      </ul>
      {showModal && (
        <div className="backdrop">
          <div className="modal">
            <div>Project Name:</div>
            <input value={projectName} onChange={handleProjectNameChange} />
            <div>Project Description:</div>
            <textarea value={projectDescription} onChange={handleProjectDescriptionChange} />
            <div>Project Type:</div>
            <input value={projectType} onChange={handleProjectTypeChange} />
            <div className="modal-buttons">
              <button onClick={addProject}>Add</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default CreateProjectModal;

