import React from 'react'
import AdminNavBar from './AdminNavBar';
import {useNavigate} from 'react-router-dom';
import { useEffect ,useState} from 'react';
import axios from 'axios';

function AdminViewFaculty() {
  const [data, setData] = useState({faculties: [], isFetching: false});
  const [searchText, setSearchText] = useState('')

  const handleSearchText = (e) => {
    setSearchText(e.target.value)
    console.log(searchText);
}

  const navigate = useNavigate();
  useEffect(() => {
    const fetchfaculties= async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };
        try {
          setData((data)=>({faculties:data.faculties,isFetching:true}));
          const response =await axios.get('http://localhost:8080/admin/viewfaculty',config)
          setData({faculties:response.data,isFetching:false});
          console.log(response);
          return response;
        } catch (e) {
            console.log(e);
            setData((data)=>({faculties:data.faculties,isFetching:false}));
        }
    };
          fetchfaculties();
      }, []);

 const removeFaculty =(id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
    },
  };
  axios.delete(`http://localhost:8080/admin/viewfaculty/delete/${id}`,config).then((response) => {
    
  alert("Faculty record " + id + " deleted!");
    //setEmployeeData();
    navigate('/admin/viewfaculty')
    navigate('/admin/viewfaculty')

  }).catch(error => {
    alert("Error Ocurred in remove User :" + error);
  });

}
  return(
    <div>
          <AdminNavBar></AdminNavBar>
      <div className='cotainer-fluid'>
       <div className="row justify-content-around align-items-center" style={{height :"98vh" , marginTop:0}}>
       <div className="col-8 p-5 shadow bg-white">
           <center><span><h1>View Faculty Details </h1></span></center>
           <div className='ui search'>
            <div className='ui icon input'>
              <input type='text' placeholder='Enter name or email' className='prompt' name="searchText" onChange={handleSearchText} value= {searchText}></input>
              <button ><i class="bi bi-search"></i></button>
            </div>
            <br></br>
            </div>
           <table className="table table-striped table-secondary">
                 <thead className='table-dark'>
                   <tr>
                <th>Sr No.</th>
                <th>Faculty Name</th>
                <th>Date of Birth</th>
                <th>Mobile Number</th>
                <th>Email</th>
                <th>Address</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
         
        {
             data.faculties.filter((val)=>{
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
              <button className="button muted-button" onClick={()=>navigate(`/admin/editfaculty/${id}`)}>Edit</button>
              {/* <button className="button muted-button" onClick={() => removeFaculty({id})}>Delete</button> */}
              <button className="button muted-button" onClick={() => removeFaculty(id)}>Delete</button>
            </td>
          </tr>
          )}
        </tbody>
    </table> </div>
    </div>
 </div></div>  
)
}

export default AdminViewFaculty;