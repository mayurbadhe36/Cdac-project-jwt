import './Faculty.css';
import React from 'react'
import FacultyNavBar from './FacultyNavBar'
import {NavLink} from 'react-router-dom';

function Faculty
() {
  return (
    <div>
      <FacultyNavBar/>
      <div className='cotainer-fluid'>
    <div className="row justify-content-around align-items-center" style={{height :"98vh" , marginTop:-50}}>
    
    <div className="col-10 p-5 shadow bg-white" >
    <center><span className='fw-light fs-1'>Faculty DashBoard</span></center>
      <table  style={{marginLeft:40 , marginTop:20}}>
          <tr>
            <td className='px-3 ' >
            <div className="card text-bg-success mb-3" style={{maxWidth: '18rem'}}>
  {/* <div className="card-header">TimeTable</div> */}
  <div className="card-body">
  <NavLink to="/faculty/addtimetable/"  style={{ textDecoration: 'none' }}> <h5 className="card-title p-4 text-white">Add TimeTable</h5></NavLink>
    {/* <h5 className="card-title p-5">TimeTable</h5> */}
    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
  </div>
</div>
            </td>

            <td className='px-3' >
            <div className="card text-bg-success mb-3" style={{maxWidth: '18rem'}}>
  {/* <div className="card-header">NoticeBoard</div> */}
  <div className="card-body">
  <NavLink to="/faculty/viewtimetable"  style={{ textDecoration: 'none' }}><h5 className="card-title p-4 text-white">View &nbsp; TimeTable</h5> </NavLink>
    {/* <h5 className="card-title p-5">NoticeBoard</h5> */}
    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
  </div>
</div>
            </td>
            <td className='px-3 ' >
            <div className="card text-bg-success mb-3" style={{maxWidth: '18rem'}}>
  {/* <div className="card-header">NoticeBoard</div> */}
  <div className="card-body">
  <NavLink to="/faculty/addnoticeboard"  style={{ textDecoration: 'none' }}><h5 className="card-title p-4 text-white">Add &nbsp;NoticeBoard</h5> </NavLink>
    {/* <h5 className="card-title p-5">NoticeBoard</h5> */}
    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
  </div>
</div>
            </td>
            <td className=' px-3 ' >
            <div className="card text-bg-success mb-3" style={{maxWidth: '18rem'}}>
  {/* <div className="card-header">NoticeBoard</div> */}
  <div className="card-body">
  <NavLink to="/faculty/viewnoticeboard"  style={{ textDecoration: 'none' }}><h5 className="card-title p-4 text-white">View &nbsp; NoticeBoard</h5> </NavLink>
    {/* <h5 className="card-title p-5">NoticeBoard</h5> */}
    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
  </div>
</div>
            </td>
          </tr>
          <tr>
          <td className='px-3'>
            <div className="card text-bg-success mb-3" style={{maxWidth: '18rem'}}>
  {/* <div className="card-header">Faculty</div> */}
  <div className="card-body">
  <NavLink to="/faculty/viewstudent"  style={{ textDecoration: 'none' }}><h5 className="card-title p-4 text-white">View &nbsp;Student</h5> </NavLink>
    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
  </div>
</div>
            </td>

            <td className=' px-3 ' >
            <div className="card text-bg-success mb-3" style={{maxWidth: '18rem'}}>
  {/* <div className="card-header">Assignment</div> */}
  <div className="card-body">
  <NavLink to="/faculty/addassignment" style={{ textDecoration: 'none' }}><h5 className="card-title p-4 text-white">Upload Assignment</h5> </NavLink>
    {/* <h5 className="card-title p-5">Assignment</h5> */}
    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
  </div>
</div>
            </td>

            <td className=' px-3 ' >
            <div className="card text-bg-success mb-3" style={{maxWidth: '18rem'}}>
  {/* <div className="card-header">Assignment</div> */}
  <div className="card-body">
  <NavLink to="/faculty/viewassignment" style={{ textDecoration: 'none' }}><h5 className="card-title p-4 text-white">View Assignment</h5> </NavLink>
    {/* <h5 className="card-title p-5">Assignment</h5> */}
    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
  </div>
</div>
            </td>

            <td className=' px-3 '>
            <div className="card text-bg-success mb-3" style={{maxWidth: '18rem'}}>
  {/* <div className="card-header">Assignment</div> */}
  <div className="card-body">
  <NavLink to="/faculty/viewassignmentanswer"  style={{ textDecoration: 'none' }}><h5 className="card-title p-4 text-white"> View Assignment Answer</h5> </NavLink>
    {/* <h5 className="card-title p-5">Assignment</h5> */}
    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
  </div>
</div>
            </td>
          </tr>
      </table>
    </div>
    </div>
    </div>

    </div>
  )
}


export default Faculty;