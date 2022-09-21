import '../Components1/Style.css'
import React from 'react'
import {NavLink, useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//useLocation
function  FacultyNavBar() {
  const navigate = useNavigate()
 // const {state}=useLocation()
  //console.log(state.user)
  const handleLogout  = function(){
    sessionStorage.clear();
    navigate('/signin');
    toast.info('Signed Out Successfully', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });

  }
  return (

    <div className='navbar  px-5 bg-dark' >
    <div className='flex-grow'><img className='img' src="/image/images_low.png"></img> </div>
   <a href="#"  style={{ textDecoration: 'none' }}><span className='fs-3 text-white fw-semibold' style={{fontFamily:'cursive'}} >E-Vidyalaya</span></a>
   <NavLink to="/faculty" style={{ textDecoration: 'none' }}><span className='fs-3 text-white fw-semibold'>DashBoard</span></NavLink>
   

 {/* <span><h3 className='text-white'>{state.user.data.name}</h3></span> */}
 <div className='badge '><span><h3 className='fs-3 text-white fw-semibold'><i className="bi bi-person-circle"></i> {sessionStorage.getItem("userName")}</h3></span></div>
   <button className='btn btn-primary ' onClick={handleLogout}><span className='fs-6'><i class="bi bi-box-arrow-right"></i>Logout</span></button>
    </div>
  )
}

export default  FacultyNavBar ;