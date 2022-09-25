import React from 'react';
import NavBar from "./NavBar"

function About() {
    return (
        <React.Fragment>
        <section>
        <div className='w-screen h-screem grid grid-column-2 text-white text-4x1 md:grid-cols-2'>
          <div className=' w-full h-full bg-blue-800 centered md:h-screen'>
            
                <div>
                <NavBar></NavBar>
                
                        <h2>About Student Portal</h2>
                        <p>A student portal project that acts as an online portal between students and the admin. The system is designed for a different branch. It contains an admin who can enter details of students. Students can then login using provided user id password and edit their profile details.</p>
                        <br></br>
                        <table>
                                <tr>
                                    <th>Sr no. </th>
                                    <td>1. </td>
                                    <td>2. </td>
                                    <td>3. </td> 
                                    <td>4. </td>
                                    <td>5. </td>
                                    <td>6. </td>
                                </tr>
                           
                            
                                <tr>
                                    <th>Features </th>
                                    <td>Globally accessible </td>
                                    <td>Central place for all tasks </td>
                                    <td>User friendly </td> 
                                    <td>Secure & Personalized </td>
                                    <td>Faster & Better Communication </td>
                                    <td>Saving of time & man power </td>
                                </tr>
                           
                        </table>
                </div>
            </div>
           
           </div>
           </section>        
            <section>
              <div className='flex-grow'><img className='img' src="./public/image/t.jpg"></img> </div>
              <div className='w-full h-full bg-black centered md:h-screen'>
              <p></p>
            </div>
        
            </section> 
  </React.Fragment>
  )
}


export default About;