import React, { Component } from 'react';
import nutrackiya from './imagesiconslogos/nutrackiya.png';
import Navbar from './Component/Navbar/Navbar.component';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import SignIn from './Pages/Signin/signinpage.component';
import Signup from './Pages/Signup/signuppage.component';
import Processcard from './Pages/Process CardPage/processcardpage.component';
import Dashboard from './Pages/Dashboard Page/dashboardpage.component';
import Comment from './Pages/Comments/commentspage.component';
import About from './Pages/About project/aboutpage.component';

import FileManagerTool from './Component/FIle_Manager/file_manager';
import Sidebar from './Component/Side Bar/sidebar.component';
import Createproject from './Pages/Create Project/createprojectpage.component';
import Boards_Display from './Pages/Boards_Display/Boards_Display';
import ForgotPassword from './Pages/Forgot_password/forgotpasswordpage';
import ProfileForm from './Pages/ProfilesPage/profilespage';
import ProfileView from './Pages/ProfilesPage/profileviewpage';
import SupervisorBoards_Display from './Pages/Supervisor_Board Page/Supervisorpage';
import StudentBoards_Display from './Pages/Student_Board Page/Studentpage';
import AddMembers from './Component/Create_Project/addmembermodal';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showLandingPage: true,
      showSidebar: false,

    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ showLandingPage: false });
    }, 6000); // Set the time for the landing page to display (in milliseconds)
  }

  handleSignIn = () => {
    this.setState({ showSidebar: true });
  };

  render() {

    const { showLandingPage, showSidebar } = this.state;

    return (
      <Router>
        <div className="App">
        {showLandingPage ? (
            // Landing Page Component
            <div className='landingpage'>
              <div className="landing-content">
                <img src={nutrackiya} alt="NU Trackiya" className="landing-image" />
                <h1 className="landing-text">FYP Management Tool</h1>
              </div>
            </div>
          ) : (
          
        <>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<SignIn />}></Route>
            <Route exact path='/signup' element={< Signup />}></Route>
            <Route exact path='/fp' element={<ForgotPassword />}></Route>
          </Routes>
          
          <Sidebar>
            <Routes>
              <Route exact path='/processcard' element={< Processcard />}></Route>
              <Route exact path='/dashboard' element={< Dashboard />}></Route>
              <Route exact path='/comments' element={< Comment />}></Route>
              <Route exact path='/about' element={< About />}></Route>
              <Route exact path='/createproject' element={<Createproject />}></Route>
              <Route exact path='/board' element={<Boards_Display />}></Route>
              <Route exact path='/filemanager' element={< FileManagerTool/>}></Route>

              <Route exact path='/pf' element={<ProfileForm />}></Route>
              <Route exact path='/profile' element={<ProfileView />}></Route>
              <Route exact path='/supervisor-board' element={<SupervisorBoards_Display />}></Route>
              <Route exact path='/student-board' element={<StudentBoards_Display />}></Route>
              <Route exact path='/addmember' element={<AddMembers />}></Route>
            </Routes>
          </Sidebar>
        
          </>
          )}
        </div>
      </Router>
    );

  }
}

export default App;