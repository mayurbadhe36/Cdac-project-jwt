import React from 'react';
import {NavLink , useNavigate} from 'react-router-dom';

function AdminNavBar() {
    
    const navigate = useNavigate()
 
  const handleLogout  = function(){
    sessionStorage.clear();
    navigate('/logout');
  }
  return (
    <div>

<div className='navbar bg-dark px-5' >
    <div className='flex-grow'><img className='img' src="/image/images_low.png"></img> </div>
   <a href="#"  style={{ textDecoration: 'none' }}><span className='fs-3 text-white ' style={{fontFamily:'monospace'}} >E-Vidyalaya</span></a>
   
   <NavLink to="/admin"  style={{ textDecoration: 'none' }}><span className='fs-5 text-white'>Home</span></NavLink>

  {/* <span><h3 className='text-white'>{state.user.data.name}</h3></span> */}
  {/* <div className='badge badge-success'><span><h3 className='text-white'>&#x2709; {sessionStorage.getItem("userName")}</h3></span></div> */}
 {/* <span><h3 className='text-white'>&#x2709; {sessionStorage.getItem("userName")}</h3></span> */}
   
   {/* <button className='btn btn-primary' onClick={handleLogout}><span className='fs-6'>Logout</span></button> */}

   <div className='badge '><span><h3 className='text-white'><i class="bi bi-person-circle"></i>  {sessionStorage.getItem("userName")}</h3></span></div>
   <button className='btn btn-primary' onClick={handleLogout}><span className='fs-6'>Logout</span></button>
   


    </div>



    </div>
  )
}

export default AdminNavBar;