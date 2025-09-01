import React, { useState } from 'react'
import { FiMenu } from "react-icons/fi";
import { FaUserGraduate } from "react-icons/fa";
import { NavLink } from 'react-router-dom';


const Navbar = () => {
  const [menu,setMenu] = useState(false);
  
  return (
  <div className="header">
      <nav>
        <div className="logo">
          <div className='std-icn'>
            <FaUserGraduate className="card-icon" />
          </div>
          <div>
             <h1>Student ERP</h1>
          </div>
        </div>
        <div className="links flex" style={{left:menu? "0":"-800px"}}>
        <ul className='text-xl font-semibold nav-links'>
             <li onClick={()=>setMenu(false)}>
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active-link" : "")}>
            Home
          </NavLink>
        </li>
        <li  onClick={()=>setMenu(false)}>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "active-link" : "")}>
            About
          </NavLink>
        </li>
        <li  onClick={()=>setMenu(false)}>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Contact
          </NavLink>
        </li>
          </ul>
        </div>
        <FiMenu className='menu-icn text-3xl' onClick={()=>setMenu(!menu)}/>
      </nav>
  </div>
  )
}   


export default Navbar;