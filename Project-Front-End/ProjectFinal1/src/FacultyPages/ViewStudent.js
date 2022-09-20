import React from 'react'
import FacultyNavBar from './FacultyNavBar'
import { useEffect ,useState} from 'react';
import axios from 'axios';

function ViewStudent() {
  const [searchText, setSearchText] = useState('')

  const handleSearchText = (e) => {
    setSearchText(e.target.value)
    console.log(searchText);
}

  const [data, setData] = useState({students: [], isFetching: false});
    useEffect(() => {
      const fetchstudents= async () => {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };
          try {
            setData((data)=>({students:data.students,isFetching:true}));
            const response =await axios.get('http://localhost:8080/faculty/viewstudent',config)
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

  return (
    <div>
    <FacultyNavBar/>
   
    <div className='cotainer-fluid'>
    <div className="row justify-content-around align-items-center" style={{height :"98vh" , marginTop:0}}>
    <div className="col-8 p-5 shadow bg-white">
        <center><span><h1>View Student Details</h1></span></center>
          <div className='ui search'>
            <div className='ui icon input'>
              <input type='text' placeholder='Enter name or gmail' className='prompt' name="searchText" onChange={handleSearchText} value= {searchText}></input>
              <button ><i class="bi bi-search"></i></button>
            </div>
            <br></br>
          </div>
        <div className='contain-table'>
            <table className='table table-striped table-secondary'>
                <thead className='table-dark'>
                    <tr>
                        <th>Sr No.</th>
                        <th>Full Name</th>
                        <th>DOB</th>
                        <th>Mobile No.</th>
                        <th>Email</th>
                        <th>Address</th>
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
              <td>{id}</td>
              <td>{name}</td>
              <td>{dob}</td>
              <td>{mobNo}</td>
              <td>{email}</td>
              <td>{address}</td>
             </tr>
             )}
                </tbody>
            </table>  
        </div>
       
    </div>
    </div>
    </div>
    </div>
  )
}

export default ViewStudent