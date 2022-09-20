import StudentNavBar from "./StudentNavBar"
import React from 'react';
import { useEffect ,useState} from 'react';
import axios from 'axios';
function NoticeBoard() {
   const [data, setData] = useState({noticeboards: [], isFetching: false});
   const [searchText, setSearchText] = useState('')

   const handleSearchText = (e) => {
     setSearchText(e.target.value)
     console.log(searchText);
 }
    useEffect(() => {
      const fetchnoticeboards= async () => {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };
          try {
            setData((data)=>({noticeboards:data.noticeboards,isFetching:true}));
            const response =await axios.get('http://localhost:8080/student/noticeboard',config)
            setData({noticeboards:response.data,isFetching:false});
            console.log(response);
            return response;
          } catch (e) {
              console.log(e);
              setData((data)=>({noticeboards:data.noticeboards,isFetching:false}));
          }
      };
      fetchnoticeboards();
  }, []);
    return (
          <div>
            <StudentNavBar/>
            <div className='cotainer-fluid'>
    <div className="row justify-content-around align-items-center" style={{height :"98vh" , marginTop:-25}}>
    
    <div className="col-8 p-5 shadow" style={{backgroundColor : 'white'}}>
    <center><span><h1>View NoticeBoard</h1></span></center>
    <div className='ui icon input'>
              <input type='text' placeholder='Enter faculty name or module name' className='prompt' name="searchText" onChange={handleSearchText} value= {searchText}></input>
              <button ><i class="bi bi-search"></i></button>
            </div>
            <br></br>
            {
             data.noticeboards.filter((val)=>{
              if(searchText==""){
                return val
              }else if(val.moduleName.toLowerCase().includes(searchText.toLowerCase()) || val.facultyName.toLowerCase().includes(searchText.toLowerCase())){
              return val
            }
             })
            .map(({description,date,facultyName,moduleName})=>
             <table className="table border table-striped table-secondary" style={{cellspacing:'5'}}>
               <tr>
                  <td>
                    Description :  {description}
                  </td>
                  </tr>
                  <tr>
                  <td>
                     Publish Date : {date}
                     
                  </td>
                  </tr>
                  <tr>
                  <td>
                     Faculty Name : {facultyName}
                  </td>
                  </tr>
                  <tr>
                  <td>
                     Module Name : {moduleName}
                  </td>
                  </tr>
             </table>
             )}
        
         </div>
         </div>

     </div>
          </div>
    );
  }
  
  export default NoticeBoard;
  