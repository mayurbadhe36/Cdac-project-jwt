import React, { useEffect } from 'react';
import FacultyNavBar from './FacultyNavBar';
import './Faculty';
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AddNoticeBoard() {

  useEffect(() => {
    if (sessionStorage.getItem("userName") === null) {
      navigate("/");
    }
    if (sessionStorage.getItem("userRole") === "ROLE_ADMIN") {
      navigate("/admin")
    }
    if (sessionStorage.getItem("userRole") === "ROLE_STUDENT") {
      navigate("/student")
    }
  });

  const id = sessionStorage.getItem("userId");
  const url = `http://localhost:8080/faculty/addnoticeboard/${id}`
  const config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
    },
  };

  const navigate = useNavigate();
  const [data, setData] = useState({
    facultyName: "",
    date: "",
    description: "",
    moduleName: ""
  })


  function submit(e) {
    e.preventDefault();
    axios.post(url, {
      facultyName: sessionStorage.getItem("userName"),
      date: data.date,
      description: data.description,
      moduleName: data.moduleName
    }, config).then(res =>
      console.log(res.data)
    ).catch(
      alert("date should be in future ")
    )
    navigate('/faculty')
    toast.success('TimeTable Added Succesfully!!!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  }
  function handle(e) {
    const newData = { ...data }
    newData[e.target.id] = e.target.value
    setData(newData)
    console.log(newData)
  }

  return (
    <div>
      <FacultyNavBar />
      <div className='cotainer-fluid'>
        <div className="row justify-content-around align-items-center" style={{ height: "98vh", marginTop: 0 }}>
          <div className="col-4 p-5 shadow bg-white rounded">
            <span className='fs-3 mb-3 fw-bolder'><center><h2>Add Noticeboard</h2></center></span>
            <br></br>
            <form onSubmit={submit}>
              <div className='mb-3'>
                <label>Module Name</label>
                <input type='text' className='form-control' placeholder='Enter Module Name' onChange={(e) => handle(e)} id='moduleName' value={data.value}></input>
              </div>
              <div className='mb-3'>
                <label>Date</label>
                <input type='date' className='form-control' placeholder='Enter date' onChange={(e) => handle(e)} id='date' value={data.value}></input>
              </div>
              <div className='mb-3'>
                <label>Description</label><br></br>
                <textarea className='col-100  form-control' onChange={(e) => handle(e)} id='description' value={data.value} > </textarea>
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
  )
}

export default AddNoticeBoard