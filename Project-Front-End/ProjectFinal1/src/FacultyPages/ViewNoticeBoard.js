import React from 'react'
import FacultyNavBar from './FacultyNavBar'
import { useEffect ,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ViewNoticeBoard () {
  const [data, setData] = useState({noticeboards: [], isFetching: false});
  const [searchText, setSearchText] = useState('')

  const handleSearchText = (e) => {
    setSearchText(e.target.value)
    console.log(searchText);
}
  const navigate = useNavigate();
  useEffect(() => {
    const fetchnoticeboards= async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };
        try {
          setData((data)=>({noticeboards:data.noticeboards,isFetching:true}));
          const response =await axios.get(`http://localhost:8080/faculty/viewnoticeboard/${sessionStorage.getItem("userId")}`,config)
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

const removeNoticeBoard =(id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
    },
  };
  axios.delete(`http://localhost:8080/faculty/viewnoticeboard/delete/${id}`,config).then((response) => {
    
  toast.success('noticeboard edited Succesfully', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
       
 // alert("NoticeBoard record with Id " + id + " deleted!");
   // navigate('/faculty/viewnoticeboard')
    navigate('/faculty/viewnoticeboard')
  }).catch(error => {
    alert("Error Ocurred in remove Noticeboard :" + error);
  });

}
  return (
    <div>
        <FacultyNavBar/>
        <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
        <div className='cotainer-fluid'>
    <div className="row justify-content-around align-items-center" style={{height :"98vh" , marginTop:0}}>
    <div className="col-8 p-5 shadow bg-white">
        <center><span><h1>Notice Board</h1></span></center>
        <div className='ui icon input'>
              <input type='text' placeholder='Enter Module Name' className='prompt' name="searchText" onChange={handleSearchText} value= {searchText}></input>
              <button ><i class="bi bi-search"></i></button>
            </div>
            <br></br>
            <br></br>
        <table className="table table-striped table-secondary">
                 <thead className='table-dark'>
                 <tr>
                      <th>Id</th>
                      <th>Module Name</th>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>
              {
             data.noticeboards.filter((val)=>{
              if(searchText==""){
                return val
              }else if(val.moduleName.toLowerCase().includes(searchText.toLowerCase())){
              return val
            }
             })
                .map(({id,moduleName,date,description})=>
                <tr>
                  <td>
                    {id}
                  </td>
                  
                  <td>
                    {moduleName}
                  </td>
                  <td>
                    {date}
                  </td>
                  <td>
                    {description}
                  </td>
                  <td>
              <button className="button muted-button" onClick={()=>navigate(`/faculty/editnoticeboard/${id}`)}>Edit</button>
              {/* <button className="button muted-button" onClick={() => removeFaculty({id})}>Delete</button> */}
              <button className="button muted-button" onClick={() => removeNoticeBoard(id)}>Delete</button>
            </td>
                </tr>)}
              </tbody>
              
          </table>  
        </div>
        </div>
        </div>

        
    </div>
  )
}

export default ViewNoticeBoard