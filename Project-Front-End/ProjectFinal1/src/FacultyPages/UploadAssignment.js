import React, { useState } from 'react'
import FacultyNavBar from './FacultyNavBar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UploadAssignment() {
   const [moduleName,setModuleName] = useState('')
   const [description, setDescription] = useState('')
   const [selectedFile, setSelectedFile] = useState();
   const navigate=useNavigate();

const handleFile =function(e){
  let file=e.target.files[0];
  console.log(file);
  setSelectedFile(e.target.files[0]);
  console.log(selectedFile);
}

   const submitForm = (e) => {
      const formData = new FormData();
      formData.append("file",selectedFile);
      formData.append("facultyName",sessionStorage.getItem('userName'));
      formData.append("facultyId",sessionStorage.getItem('userId'));
      formData.append("moduleName",moduleName);
      formData.append("description",description);
      console.log(sessionStorage.getItem('userId'));
      const config = {
         headers: {
                 Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
                  'content-type': 'multipart/form-data',
         },
       };
      axios
        .post("http://localhost:8080/faculty/addassignment", formData,config)
        .then((res) => {
          alert("Assignment Upload Successfully");
        })
        .catch((err) => alert("File Upload Error"));
        console.log(formData);
        navigate('/faculty')
    };

  return (
    <div>
        <FacultyNavBar/>
        <div className="container-fluid">
              <div className="row justify-content-around align-items-center" style={{height :"98vh" , marginTop:-35}}>
                      <div className="col-4 p-3 shadow bg-white">
                         <form id='assignment'>
                            <span className="head fs-3"><center>Upload Assignment</center></span>
                                <div className="ui form">
                                        {/* <div className="field">
                                            <label>Faculty Name</label>
                                            <div className="mb-3">
                                            <input type="text" name="facultyName" className="form-control" placeholder="Enter Faculty Name"value={facultyName}
          onChange={(e) => setFacultyName(e.target.value)} />
                                    </div>
                                 </div> */}
                                 <div className="field">
                                     <label>Module Name</label>
                                        <div className="mb-3">
                                           <input type="text" name="moduleName" className="form-control" placeholder="Enter Subject"value={moduleName}
          onChange={(e) => setModuleName(e.target.value)} />
                                        </div>
                                 </div>
                                 <div className='mb-3'>
                                 <label>Description</label><br></br>
                                 <textarea className='col-100  form-control' value={description}
          onChange={(e) => setDescription(e.target.value)}></textarea>
                              </div>

                                 <div className="field">
                                 <label>Upload File</label><br></br>
                                     <input
          type="file"
       name="file"
          onChange={(e)=>handleFile(e)}
        />
                                 </div>
                                    <div className="mb-3 py-3" style={{textAlign:"center"}}>
                                           <button className="btn btn-primary form-control" onClick={submitForm}>Upload</button>
                                    </div>
                            </div>
                        </form>  	
                      </div>
                     
              </div>
       </div>

        </div>
  )
}

export default UploadAssignment