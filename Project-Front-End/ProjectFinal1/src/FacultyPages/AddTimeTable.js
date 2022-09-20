import FacultyNavBar from './FacultyNavBar';
import React, { useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function AddTimeTable() {
  const config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
    },
  };
  const id=sessionStorage.getItem("userId");
  const url=`http://localhost:8080/faculty/addtimetable/${id}`
  const navigate = useNavigate();
  const[data,setData]=useState({
      facultyName:"",
      date:"",
      startTime:"",
      endTime:"",
      moduleName:"",
      platform:"",
      link:""
  })
  function submit(e){
      e.preventDefault();
      axios.post(url,{
          facultyName:sessionStorage.getItem("userName"),
          date: data.date,
          startTime:data.startTime,
          endTime:data.endTime,
          moduleName:data.moduleName,
          platform:data.platform,
          link:data.link
      },config).then(res=>
          console.log(res.data)
          )  
          alert("TimeTable Added Successfully!!")
          navigate('/faculty')
          navigate('/faculty')
  }
  function handle(e){
      const newData={...data}
      newData[e.target.id]=e.target.value
      setData(newData)
      console.log(newData)
  }

  return (

     <div>
        <FacultyNavBar/>
        <div className='cotainer-fluid'>
       <div className="row justify-content-around align-items-center" style={{height :"98vh" , marginTop:0}}>
       <div className="col-4 p-5 shadow bg-white">
            <span className='fs-3 mb-3'><center>Add TimeTable</center></span>
            <form onSubmit={submit}>
          {/* <div className='mb-3'>
           <lable>Faculty Name</lable><br></br>
            <input type='text' placeholder='Enter Faculty Name' className='form-control' onChange={(e)=>handle(e)} id='facultyName' value={sessionStorage.getItem("userName")}></input>
           </div> */}
           <div className='mb-3'>
             <label>Date</label>
             <input type ='date' className='form-control' placeholder='Enter date' onChange={(e)=>handle(e)} id='date' value={data.value}></input>
           </div>
           {/* <div className='mb-3'>
             <label>Description</label><br></br>
             <textarea className='col-100  form-control' onChange={(e)=>handle(e)} id='description' value={data.value}> </textarea>
           </div> */}
           <div className='mb-3'>
              <label>Start Time: </label>
              <input type='time' className='col-3' onChange={(e)=>handle(e)} id='startTime' value={data.value}></input>
                &nbsp;   &nbsp;   &nbsp;
              <label>End Time:</label> 
              <input type='time' className='col-3' onChange={(e)=>handle(e)} id='endTime' value={data.value}></input><br></br>
              
           </div>

           <div className='mb-3'>
               <lable>Module Name</lable>
              <input type='text' className='form-control' onChange={(e)=>handle(e)} id='moduleName' value={data.value}></input>
           </div>

           <div className='mb-3'>
               <lable>Platform</lable>
              <input type='text'  className='form-control' onChange={(e)=>handle(e)} id='platform' value={data.value}></input>
           </div>

           <div className='mb-3'>
               <lable>Link</lable>
              <input type='text'  className='form-control' onChange={(e)=>handle(e)} id='link' value={data.value}></input>
           </div>
           <br></br>
           <div className='mb-3'>
           <button className='btn btn-primary form-control'> Submit</button>
           </div>
           </form>
       </div>
       </div>
       </div>
        </div>
  
  );
}

export default AddTimeTable