import React from 'react'
import StudentNavBar from './StudentNavBar'
import { useEffect ,useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
function Result() {
    const [data, setData] = useState({results: [], isFetching: false});
    const [searchText, setSearchText] = useState('')
    const handleSearchText = (e) => {
        setSearchText(e.target.value)
        console.log(searchText);
    }
    useEffect(() => {
      const fetchresults= async () => {
          try {
            const config = {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
              },
            };
            setData((data)=>({results:data.results,isFetching:true}));
            const response =await axios.get(`http://localhost:8080/student/result/${sessionStorage.getItem("userId")}`,config)
            setData({results:response.data,isFetching:false});
            console.log(response);
            return response;
          } catch (e) {
              console.log(e);
              setData((data)=>({results:data.results,isFetching:false}));
          }
      };
      fetchresults();
  }, []);

  return (
    <div>
    <StudentNavBar/>
    {/* <h5>{state.user.data.name}</h5> */}
    <div className='cotainer-fluid'>
<div className="row justify-content-around align-items-center" style={{height :"98vh" , marginTop:0}}>
<div className="col-8 p-5 shadow bg-white">
   <center><span><h1>Assignment Results</h1></span></center>
   <div className='ui icon input'>
              <input type='text' placeholder='Enter faculty name or module name' className='prompt' name="searchText" onChange={handleSearchText} value= {searchText}></input>
              <button ><i class="bi bi-search"></i></button>
            </div>
            <br></br>
    <br></br>
   <table className="table table-striped table-secondary">
         <thead className='table-dark'>
          <tr>
          <th>Sr.No</th>
         <th>Faculty Name</th>
         <th>Module Name</th>
         <th>Assignment id</th>
         <th>Grade</th>
         <th>Remark</th>
        
         </tr>
             </thead>
             <tbody>
             {
             data.results.filter((val)=>{
               if(searchText==""){
                if(val.grade!==null || val.remark!==null)
                return val
              }else if(val.moduleName.toLowerCase().includes(searchText.toLowerCase()) || val.facultyName.toLowerCase().includes(searchText.toLowerCase())){
              return val
            }
             })
                 .map(({id,facultyName,moduleName,assignmentId,grade,remark})=>
             <tr>
              <td>{id}</td>
              <td>{facultyName}</td>
              <td>{moduleName}</td>
              <td>{assignmentId.id}</td>
              <td>{grade}</td>
             <td>{remark}</td>
             
             </tr> )}
             </tbody>
        
      </table>
    </div>


    </div>

</div>
  </div>
  )
}

export default Result