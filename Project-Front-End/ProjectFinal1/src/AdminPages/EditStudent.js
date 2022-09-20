import React from 'react'
import AdminNavBar from './AdminNavBar';
import {useParams, useNavigate} from "react-router-dom";
import { useEffect,useState } from 'react';
import axios from 'axios';

function EditStudent() {
  const navigate = useNavigate();
  const param = useParams();
  const studentId=param.id;
  const updateurl=`http://localhost:8080/admin/editstudent/${param.id}`;
  const editUrl = `http://localhost:8080/admin/editstudent/${param.id}`;

  const [name,setName]=useState('')
  const [dob,setDob]=useState('')
  const [mobNo,setMobNo]=useState('')
  const [email, setEmail] = useState('')
  const[address,setAddress]=useState('')

            const handleName = (e) => {
              setName(e.target.value)
          }
          const handleDob = (e) => {
              setDob(e.target.value)
          }
          const handleMobNo = (e) => {
              setMobNo(e.target.value)
          }
          const handleEmail = (e) => {
              setEmail(e.target.value)
          }
          const handleAddress = (e) => {
              setAddress(e.target.value)
          }

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };
    axios.get(editUrl,config).then((response) => {
      console.log(response.data);
      const studentData = response.data;
      console.log(studentData.data.name);
        setName(studentData.data.name)
        console.log(name);
        setDob(studentData.data.dob)
        setMobNo(studentData.data.mobNo)
        setAddress(studentData.data.address)
        setEmail(studentData.data.email)
        console.log(studentData.status);
    }).catch(error => {
      alert("Error Ocurred getting employee detail:"+ error);
    });
  }, []);

  function submit(e){
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };
     axios.put(updateurl,{
        name:name,
        dob:dob,
        mobNo:mobNo,
         email:email,
         address:address   
     },config).then(res=>
         console.log(res.data)
        )
        alert("Student With Id "+studentId+"Updated Succesfully!!!")
        navigate("/admin/viewstudent")
}
  return (

    <div>
    <AdminNavBar></AdminNavBar>
  <div className='cotainer-fluid'>
 <div className="row justify-content-around align-items-center" style={{height :"98vh" , marginTop:0}}>
 <div className="col-4 p-5 shadow bg-white">
      <span className='fs-3 mb-3'><center>Edit Faculty</center></span>

      <form onSubmit={(e)=>submit(e)}>
    <div className='mb-3'>
     <label for ="name">Student Name</label><br></br>
      <input type='text' placeholder='Enter Faculty Name'className='form-control' onChange={handleName}  value={name} name="name"></input>
     </div>
     <div className='mb-3'>
       <label for ="dob" >Date Of Birth</label>
       <input type ='date' className='form-control' placeholder='Enter date'onChange={handleDob} value={dob} name="dob"></input>
     </div>
    
     <div className='mb-3'>
        <label for ="mobNo">Mobile: </label>
        <input type='text' className='col-4' onChange={handleMobNo} value={mobNo} name="mobNo"></input>
          &nbsp;
        <label for ="email">Email:</label> 
        <input type='email' className='col-5' onChange={handleEmail}  value={email} name="email" ></input ><br></br>
        
     </div>
     <div className='mb-3'>
       <label for ="address">Address</label><br></br>
       <textarea className='col-100  form-control'onChange={handleAddress} value={address} name="address"> </textarea>
     </div>
     <br></br>
     <div className='mb-3'>
     <button className='btn btn-primary form-control'>Update</button>
     </div>

     </form>

 </div>
 </div>
 </div>
  </div>

);
}


export default EditStudent;