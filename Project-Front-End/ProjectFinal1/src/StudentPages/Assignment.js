import StudentNavBar from "./StudentNavBar"
import { useEffect ,useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
function Assignment() {
  const [searchText, setSearchText] = useState('')
  const [selectedFile, setSelectedFile] = useState();
  const[assignId,setAssignId]=useState('')
  const navigate = useNavigate();
  const handleSearchText = (e) => {
    setSearchText(e.target.value)
    console.log(searchText);
}

const handleFile =function(e,id){
  let file=e.target.files[0];
 // console.log(id);
  setAssignId(id);
  //console.log(file);
  setSelectedFile(e.target.files[0]);
  //console.log(selectedFile);
}

 function handleDownload(file){
  const config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
    },
    responseType :'blob',
  };

axios.get(`http://localhost:8080/student/downloadFile/${file}`,
  config)
.then((response)=>{
  const url=window.URL.createObjectURL(new Blob([response.data]))
  const link=document.createElement('a')
  link.href=link
  link.setAttribute('download','assignment.pdf')
  document.body.appendChild(link)
  link.click()
}
)

// try{
//       axios.get(`http://localhost:8080/student/downloadFile/${file}`,
//       config)
//       return response;
// } catch (e) {
//         console.log(e);
       
//     }


}

const submitForm = (e) => {
      const formData = new FormData();
      e.disabled = true;
      formData.append("file",selectedFile);
      formData.append("assignId",assignId);
      formData.append("studentId",sessionStorage.getItem('userId'));
 //     console.log(assignId);
      console.log(sessionStorage.getItem('userId'));

      const config = {
         headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
           'content-type': 'multipart/form-data',
         },
       };
      axios
        .post(`http://localhost:8080/student/uploadAssignment/${assignId}`, formData,config)
        .then((res) => {
          alert("File Upload success");
        })
        .catch((err) => alert("File Upload Error"));
        console.log(formData);
        
    };
  const [data, setData] = useState({assignments: [], isFetching: false});

    useEffect(() => {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          responseType :'blob'
        },
      };
      const fetchassignments= async () => {
          try {
            setData((data)=>({assignments:data.assignments,isFetching:true}));
            const response =await axios.get('http://localhost:8080/student/assignment',config)
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
    return (
          <div>
           <StudentNavBar/>
            <div className='cotainer-fluid'>
       <div className="row justify-content-around align-items-center" style={{height :"98vh" , marginTop:0}}>
       <div className="col-8 p-5 shadow bg-white">
       
           <center><span><h1>View Assignment</h1></span></center>
           <div className='ui icon input'>
              <input type='text' placeholder='Enter faculty name or module name' className='prompt' name="searchText" onChange={handleSearchText} value= {searchText}></input>
              <button ><i class="bi bi-search"></i></button>
            </div>
            <br></br>
           <table className="table table-striped tabel-secondary">
           
                 <thead className='table-dark'>
                   <tr>
                  <th>Sr.No</th>
                 <th>Faculty Name</th>
                 <th>Module Name</th>
                 <th>Description</th>
                 <th>Download</th>
                 <th>Upload</th>
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
                 .map(({id,facultyName,moduleName,description,fileName})=>
             <tr>
              <td>{id}</td>
              <td>{facultyName}</td>
             <td>{moduleName}</td>
             <td>{description}</td>
             <td><button className="btn btn-primary"  onClick={()=>handleDownload(fileName)}>Download</button></td>
             <div className="field">
                                 <label>Upload File</label><br></br>
                                     <input type="file"
       name="file" onChange={(e)=>handleFile(e,id)}
        /></div>
        <button className="btn btn-info" onClick={(e)=>submitForm(e)}>Upload</button>
             </tr> )}
                 </tbody>

              </table>
           
            </div>
            </div>

        </div>
          </div>
    );
  }
  
  export default Assignment;
  