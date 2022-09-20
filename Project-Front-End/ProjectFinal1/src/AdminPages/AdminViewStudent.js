import React from 'react'
import AdminNavBar from './AdminNavBar';
import {useNavigate} from 'react-router-dom';
import { useEffect ,useState} from 'react';
import axios from 'axios';

function AdminViewStudent() {
  const [data, setData] = useState({students: [], isFetching: false});
  const [searchText, setSearchText] = useState('')

  const handleSearchText = (e) => {
    setSearchText(e.target.value)
    console.log(searchText);
}
  const navigate = useNavigate();
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };
    const fetchstudents= async () => {
        try {
          setData((data)=>({students:data.students,isFetching:true}));
          const response =await axios.get('http://localhost:8080/admin/viewstudent',config)
          setData({students:response.data,isFetching:false});
          console.log(response);
          return response;
        } catch (e) {
            console.log(e);
            setData((data)=>({students:data.students,isFetching:false}));
        }
    };
          fetchstudents();
      }, []);

 const removeStudent=(id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
    },
  };
  axios.delete(`http://localhost:8080/admin/viewstudent/delete/${id}`,config).then((response) => {
   
  alert("Student record with Id " + id + " deleted!");
    navigate('/admin/viewstudent')
    navigate('/admin/viewstudent')
  }).catch(error => {
    alert("Error Ocurred in remove Student :" + error);
  });

}

  return(
    <div>
           <AdminNavBar></AdminNavBar>
           <form>
      <div className='cotainer-fluid'>
       <div className="row justify-content-around align-items-center" style={{height :"98vh" , marginTop:0}}>
       <div className="col-8 p-5 shadow bg-white">
           <center><span><h1>View Student Details </h1></span></center>
           <div className='ui search'>
            <div className='ui icon input'>
            <button><i class="bi bi-search"></i></button>
              <input type='text' placeholder='Enter name or gmail' className='prompt' name="searchText" onChange={handleSearchText} value= {searchText}></input>
              
            </div>
            <br></br>
          </div>
           <table className="table table-striped table-secondary">
                 <thead className='table-dark'>
                   <tr>
                <th>Sr No.</th>
                <th>Name</th>
                <th>Date of Birth</th>
                <th>Mobile Number</th>
                <th>Email</th>
                <th>Address</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
         
        {
             data.students.filter((val)=>{
              if(searchText==""){
                return val
              }else if(val.name.toLowerCase().includes(searchText.toLowerCase()) ||val.email.toLowerCase().includes(searchText.toLowerCase())){
              return val
            }
             })
        .map(({id,name,dob,mobNo,email,address})=>
             <tr>
              <td>
                {id}
              </td>
              <td>
                {name}
              </td>
              <td>
                {dob}
              </td>
              <td>
                {mobNo}
              </td>
              <td>
                {email}
              </td>
              <td>
                {address}
              </td>
           <td>
              <button className="button muted-button" onClick={()=>navigate(`/admin/editstudent/${id}`)}>Edit</button>
              {/* <button className="button muted-button" onClick={() => removeFaculty({id})}>Delete</button> */}
              <button className="button muted-button" onClick={() => removeStudent(id)}>Delete</button>
            </td>
          </tr>
          )}
        </tbody>
    </table> 
    </div>
    </div>
 </div>
 </form>
 </div>  
)
}

export default AdminViewStudent;