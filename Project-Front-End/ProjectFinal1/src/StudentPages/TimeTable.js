import React from 'react';
import { useEffect ,useState} from 'react';
import StudentNavBar from "./StudentNavBar"
import axios from 'axios';
//import { useLocation } from 'react-router-dom';

function TimeTable() {

  const [data, setData] = useState({timetables: [], isFetching: false});
  const [searchText, setSearchText] = useState('')

  const handleSearchText = (e) => {
    setSearchText(e.target.value)
    console.log(searchText);
}
    useEffect(() => {
      const fetchtimetables= async () => {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };
          try {
            setData((data)=>({timetables:data.timetables,isFetching:true}));
            const response =await axios.get('http://localhost:8080/student/timetable',config)
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

    return (
          <div>
            <StudentNavBar/>
            {/* <h5>{state.user.data.name}</h5> */}
            <div className='cotainer-fluid'>
       <div className="row justify-content-around align-items-center" style={{height :"98vh" , marginTop:0}}>
       <div className="col-8 p-5 shadow bg-white">
           <center><span><h1>View TimeTable Details</h1></span></center>
           <div className='ui icon input'>
              <input type='text' placeholder='Enter faculty name or module name' className='prompt' name="searchText" onChange={handleSearchText} value= {searchText}></input>
              <button ><i class="bi bi-search"></i></button>
            </div>
            <br></br>
           <table className="table table-striped table-secondary">
                 <thead className='table-dark'>
                  <tr>
                  <th>Sr.No</th>
                 <th>Faculty Name</th>
                 <th>Date</th>
                 <th>Start Time</th>
                 <th>End Time</th>
                 <th>Module Name</th>
                 <th>Platform</th>
                 <th>Link</th>
                 </tr>
                     </thead>
                 <tbody>

                 {
             data.timetables.filter((val)=>{
              if(searchText==""){
                return val
              }else if(val.moduleName.toLowerCase().includes(searchText.toLowerCase()) || val.facultyName.toLowerCase().includes(searchText.toLowerCase())){
              return val
            }
             })
               
               .map(({id,facultyName,date,startTime,endTime,moduleName,platform,link})=>
             <tr>
              <td>{id}</td>
              <td>{facultyName}</td>
             <td>{date}</td>
             <td>{startTime}</td>
             <td>{endTime}</td>
             <td>{moduleName}</td>
             <td>{platform}</td>
            <td><a href='#'>{link}</a></td>
             </tr>  )}
              
                 </tbody>
              </table>
            </div>


            </div>

        </div>
          </div>
    );
  }
  
  export default TimeTable;
  