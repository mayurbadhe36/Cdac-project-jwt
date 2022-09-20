import React from 'react'
import FacultyNavBar from './FacultyNavBar'
import { useEffect ,useState} from 'react';
import axios from 'axios';

function ViewAssignment() {
  const [searchText, setSearchText] = useState('')

  const handleSearchText = (e) => {
    setSearchText(e.target.value)
    console.log(searchText);
}

  const [data, setData] = useState({assignments: [], isFetching: false});
    useEffect(() => {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };
      const fetchassignments= async () => {
          try {
            setData((data)=>({assignments:data.assignments,isFetching:true}));
            console.log(sessionStorage.getItem("userId"));
           const url=`http://localhost:8080/faculty/viewassignment/${sessionStorage.getItem("userId")}`
            const response =await axios.get(url,config);
            setData({assignments:response.data,isFetching:false});
            console.log(response);
            return response;
          } catch (e) {
              console.log(e);
              setData((data)=>({assignments:data.assignments,isFetching:false}));
          }
      };
      fetchassignments();
  }, []);
  return(
    <div>
      <FacultyNavBar/>
      <div className='container-fluid'>
       <div className="row justify-content-around align-items-center" style={{height :"98vh" , marginTop:0}}>
       <div className="col-8 p-5 shadow bg-white">
           <center><span><h1>View Assignment </h1></span></center>
           <div className='ui icon input'>
              <input type='text' placeholder='Enter module name' className='prompt' name="searchText" onChange={handleSearchText} value= {searchText}></input>
              <button ><i class="bi bi-search"></i></button>
            </div>
            <br></br>
           <table className="table table-striped table-secondary">
                 <thead className='table-dark'>
                   <tr>
                <th>Sr No.</th>
                <th>Module Name</th>
                <th>Description</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
        {
             data.assignments.filter((val)=>{
              if(searchText==""){
                return val
              }else if(val.moduleName.toLowerCase().includes(searchText.toLowerCase()) || val.facultyName.toLowerCase().includes(searchText.toLowerCase())){
              return val
            }
             })
            .map(({id,moduleName,description})=>
         <tr>
          <td>{id}</td>
          <td>{moduleName}</td>
          <td>{description}</td>
          <td>
              <button className="button muted-button">Edit</button>
              <button className="button muted-button">Delete</button>        
            </td>
         </tr>)}
        </tbody>
    </table> </div>
    </div>
 </div></div>  
)
}

export default ViewAssignment