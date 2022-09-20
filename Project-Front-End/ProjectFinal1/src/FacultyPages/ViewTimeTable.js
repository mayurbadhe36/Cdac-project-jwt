import React from 'react'
//import Faculty from '../StudentPages/ViewFaculty'
import FacultyNavBar from './FacultyNavBar'
import { useEffect ,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
function ViewTimeTable() {
  const [data, setData] = useState({timetables: [], isFetching: false});
  const [searchText, setSearchText] = useState('')

  const handleSearchText = (e) => {
    setSearchText(e.target.value)
    console.log(searchText);
}
  const navigate = useNavigate();
    useEffect(() => {
      const fetchtimetables= async () => {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };
          try {
            setData((data)=>({timetables:data.timetables,isFetching:true}));
            const response =await axios.get(`http://localhost:8080/faculty/viewtimetable/${sessionStorage.getItem("userId")}`,config)
            setData({timetables:response.data,isFetching:false});
            console.log(response);
            return response;
          } catch (e) {
              console.log(e);
              setData((data)=>({timetables:data.timetables,isFetching:false}));
          }
      };
      fetchtimetables();
  }, []);
  const removeTimeTable =(id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };

    axios.delete(`http://localhost:8080/faculty/viewtimetable/delete/${id}`,config).then((response) => {
      alert("TimeTable record with Id " + id + " deleted!");
  
      navigate('/faculty/viewtimetable')
      navigate('/faculty/viewnoticeboard')
    }).catch(error => {
      alert("Error Ocurred in remove TimeTable :" + error);
    });
  
  }

  return(
    <div> <FacultyNavBar/>
    <div className='cotainer-fluid'>
    <div className="row justify-content-around align-items-center" style={{height :"98vh" , marginTop:0}}>
    <div className="col-8 p-5 shadow bg-white">
        <center><span><h1>View TimeTable Details</h1></span></center>
        <div className='ui icon input'>
              <input type='text' placeholder='Enter Module Name' className='prompt' name="searchText" onChange={handleSearchText} value= {searchText}></input>
              <button ><i class="bi bi-search"></i></button>
            </div>
            <br></br>
            <br></br>
        <table className="table table-striped table-secondary">
              <thead className='table-dark'>
                  <tr>
                      <th>Sr No.</th>
                      <th>Date</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                      <th>Module Name</th>
                      <th>Platform</th>
                      <th>Link</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>
              {
             data.timetables.filter((val)=>{
              if(searchText==""){
                return val
              }else if(val.moduleName.toLowerCase().includes(searchText.toLowerCase())){
              return val
            }
             })
             .map(({id,date,startTime,endTime,moduleName,platform,link})=>
             <tr>
              <td>
                {id}
              </td>
                <td>
                {date}
                </td>
              <td>
                {startTime}
              </td>
              <td>
                {endTime}
              </td>
              <td>
                {moduleName}
              </td>
              <td>
                {platform}
              </td>
              <td>
                {link}
              </td>
              <td>
              <button className="button muted-button" onClick={()=>navigate(`/faculty/edittimetable/${id}`)}>Edit</button>
              {/* <button className="button muted-button" onClick={() => removeFaculty({id})}>Delete</button> */}
              <button className="button muted-button" onClick={() => removeTimeTable(id)}>Delete</button>
            </td>
             </tr>
             )}
            
              </tbody>
          </table>  
          </div>
          </div>
         
      </div>
      </div>

  )
}

export default ViewTimeTable