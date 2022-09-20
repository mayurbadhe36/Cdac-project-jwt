import './Style.css';
import React from 'react'
import {NavLink} from 'react-router-dom';

function  NavBar() {
  return (
    <div className='navbar px-5 trans' >
    <div><img  className='img' src="./image/images_low.png" ></img> </div>
   <div className='text-white'><a href="#" style={{ textDecoration: 'none' }}><span className='text-white fs-1' >E-Vidyalaya</span></a></div>
   <NavLink to="/"  style={{ textDecoration: 'none' }}><span className="letter fs-3 text-white">Home</span></NavLink>
   <NavLink to="/about"  style={{ textDecoration: 'none' }}><span className="letter fs-3  text-white">About</span></NavLink>
   <NavLink to="/contact"  style={{ textDecoration: 'none' }}><span className="letter fs-3  text-white">Contact</span></NavLink>
   <NavLink to="/signin"  style={{ textDecoration: 'none' }}><span className="letter fs-3  text-white">Login</span></NavLink>

   
    
    </div>
  )
}

export default   NavBar ;

