import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Create_Project.css";

function CreateProjectModal() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectType, setProjectType] = useState('fyp1');
  const [editIndex, setEditIndex] = useState(null); // added editIndex state

  const addProject = () => {
    const project = { name: projectName, description: projectDescription, type: projectType};
    if (editIndex !== null) {
      const updatedProjects = [...projects];
      updatedProjects[editIndex] = project;
      setProjects(updatedProjects);
      setEditIndex(null);
    } else {
      setProjects([...projects, project]);
    }
    setShowModal(false);
    setProjectName('');
    setProjectDescription('');
    setProjectType('fyp1');
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('projects', JSON.stringify([...projects, project]));
    }
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
    setEditIndex(null);
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

  const handleEditClick = (index) => {
    setEditIndex(index);
    const { name, description, type, members } = projects[index];
    setProjectName(name);
    setProjectDescription(description);
    setProjectType(type);
    setShowModal(true);
  };

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
              <button name ="edit" onClick={() => handleEditClick(index)}>Edit</button>
              <button name="addmember">Add Members</button>
              <button name = "delete" onClick={() => deleteProject(index)}>Delete</button>
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
      <select value={projectType} onChange={handleProjectTypeChange}>
        <option value="fyp1">FYP 1</option>
        <option value="fyp2">FYP 2</option>
      </select>
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

