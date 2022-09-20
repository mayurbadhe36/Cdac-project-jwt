import StudentNavBar from "./StudentNavBar"
import { useEffect ,useState} from 'react';
import axios from 'axios';

function Faculty() {
  const [data, setData] = useState({faculties: [], isFetching: false});
  const [searchText, setSearchText] = useState('')

  const handleSearchText = (e) => {
    setSearchText(e.target.value)
    console.log(searchText);
}
    useEffect(() => {
      const fetchfaculties= async () => {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };
          try {
            setData((data)=>({faculties:data.faculties,isFetching:true}));
            const response =await axios.get('http://localhost:8080/student/faculty',config)
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
    return (
          <div>
            <StudentNavBar/>
            <div className='cotainer-fluid'>
       <div className="row justify-content-around align-items-center" style={{height :"98vh" , marginTop:0}}>
       <div className="col-8 p-5 shadow bg-white">
          
           <center><span><h1>Faculty Details</h1></span></center>
           <div className='ui search'>
            <div className='ui icon input'>
              <input type='text' placeholder='Enter name or email' className='prompt' name="searchText" onChange={handleSearchText} value= {searchText}></input>
              <button ><i class="bi bi-search"></i></button>
            </div>
            <br></br>
          </div>
           <table class="table table-striped table-secondary">
                 <thead className="table-dark">
                    <tr>
                  <th>Sr.No</th>
                 <th> Name</th>
                
                 <th>Mob No</th>
                 <th>Email</th>
               
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
             .map(({id,name,mobNo,email})=>
             <tr>
              <td>
                {id}
              </td>
              <td>
                {name}
              </td>
              <td>
                {mobNo}
              </td>
              <td>
                {email}
              </td>
             </tr>
             )}
                 </tbody>

              </table>
           
            </div>


            </div>

        </div>
          </div>
    );
  }
  
  export default Faculty;
  