import React, { useState } from 'react';
import {
    FaTh,
    FaBars
}from "react-icons/fa";
import {MdDashboardCustomize} from "react-icons/md";
import { NavLink } from 'react-router-dom';


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/createproject",
            name:"Create Project",
            icon:<FaTh/>
        },
        {
            path:"/board",
            name:"DashBoard",
            icon:<MdDashboardCustomize/>
        },
        {
            path:"/profile",
            name:"Profile View",
            icon:<MdDashboardCustomize/>
        }
    ]
    return (
        <div className="container">
           <div style={{backgroundColor:"skyblue", width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{fontSize:"12", color:"black", display: isOpen ? "block" : "none"}} className="logo">SideBar</h1>
                   <div style={{color:"black",marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               <div className='items'>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon" style={{color:"black"}}>{item.icon}</div>
                           <div style={{color:"black", display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
               </div>
           </div>
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;