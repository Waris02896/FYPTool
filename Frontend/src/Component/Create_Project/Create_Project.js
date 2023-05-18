import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Create_Project.css";
import AddMembers from './addmembermodal';

function CreateProjectModal() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectType, setProjectType] = useState('');
  // const [editIndex, setEditIndex] = useState(null); // added editIndex state
  const [projectMembers, setProjectMembers] = useState([]);
  //const [selectedUser, setSelectedUser] = useState('');
  //const [selectedRole, setSelectedRole] = useState('');
  const [projectId, setProjectId] = useState(0);

  const fetchProjects = async () => {
   fetch('http://localhost:3000/fyp/projectList', {
        headers: {
          'Content-Type': 'application/json',
          'authorization': `${localStorage.getItem('token')}`,
        },
      }).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('error in fatching list');
        }
      }).then((data) => {
        console.log(data);
      })
      .catch ((error) => {
        console.error(error);
      });
    };
    useEffect(() => {
      fetchProjects();
    }, []);


  const addProject = async () => {
    const project = { id: projectId,name: projectName, description: projectDescription, type: projectType };
    // if (editIndex !== null) {
    //   const updatedProjects = [...projects];
    //   updatedProjects[editIndex] = project;
    //   setProjects(updatedProjects);
    //   setEditIndex(null);
    // } else {
    //   setProjects([...projects, project]);
    // }
    setProjectId(projectId + 1);
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
        },
      })
      .then(response => response.json())
      .then((response) => {
        console.log("Hi message")
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
      });
      fetchProjects();

    if (typeof window !== 'undefined') {
      localStorage.setItem('projects', JSON.stringify([...projects, project]));
    }
  };

  const handleAddMember = (userEmail, userRole) => {
    const members = { email: userEmail, role: userRole };
    setProjectMembers([...projectMembers, members]);
    if (typeof window !== 'undefined') {
      const storedProjectMembers = JSON.parse(localStorage.getItem('projectMembers')) || [];
      const updatedProjectMembers = [...storedProjectMembers, members];
      localStorage.setItem('projectMembers', JSON.stringify(updatedProjectMembers));
    }
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

  useEffect(() => {
    const projectsFromLocalStorage = localStorage.getItem('projects');
    if (projectsFromLocalStorage) {
      const parsedProjects = JSON.parse(projectsFromLocalStorage);
      setProjects(parsedProjects);

      const maxProjectId = parsedProjects.reduce((maxId, project) => Math.max(maxId, project.id), 0);
      setProjectId(maxProjectId + 1);

      console.log(localStorage);
    }
  }, []);

  // const getProjectsFromLocalStorage = () => {
  //   let projectsFromLocalStorage;
  //   if (typeof window !== 'undefined') {
  //     projectsFromLocalStorage = localStorage.getItem('projects');
  //   }
  //   if (projectsFromLocalStorage) {
  //     setProjects(JSON.parse(projectsFromLocalStorage));
  //   }
  // };

  // React.useEffect(() => {
  //   getProjectsFromLocalStorage();
  // }, []);

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
            <div><strong>Id:</strong> {project.id}</div>
            <div><strong>Name:</strong> {project.name}</div>
            <div><strong>Description:</strong> {project.description}</div>
            <div><strong>Type:</strong> {project.type}</div>
            <div>
              <Link to={`/student-board`}>View</Link>
              {/* <button name ="edit" onClick={() => handleEditClick(index)}>Edit</button> */}
              <Link to={`/addmember?id={project.project_id}`}>Add Member</Link>
              <Link to={`/processcard?id={project.id}`}>Add Process Card</Link>
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

