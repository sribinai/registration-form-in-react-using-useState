import './App.css';
import React, {useState} from 'react';
import Multiselect from 'multiselect-react-dropdown';

function App() {
  const[fullname,setFullName]=useState("");
  const[emailid,setEmailId]=useState("");
  const[mobileno,setMobileNo]=useState("");
  const[dateofbirth,setDateOfBirth]=useState("");
  const[previewimage, setPreviewImage]=useState("null");
  const[previewImgError, setPreviewImgError]=useState("");
  const[displayimage,setDisplayImage]=useState("null");
  const[location,setLocation] = useState(["Chennai", "Bangalore", "Pune"]);
  
  const imgTypes = ['image/png','image/jpeg'];
  const handleImageChange=(e)=>{
    let selectedFile = e.target.files[0];
    if(selectedFile){
      if(selectedFile&&imgTypes.includes(selectedFile.type)){
        setPreviewImage(URL.createObjectURL(selectedFile));
        setPreviewImgError('Please select a valid image type jpeg or png');
      }
      else{
        console.log('select your file')
      }
    }
  }



  const[names,setNames]=useState([]);

  const handlesubmit=(e)=>{
    e.preventDefault();
    console.log(fullname,mobileno,emailid,dateofbirth);
    const data={fullname,mobileno,emailid,dateofbirth,previewimage}
  
    if(fullname&&mobileno&&emailid&&dateofbirth&&previewimage) {
      setNames((nms)=>[...nms,data])
      setFullName("")
      setMobileNo("")
      setEmailId("")
      setDateOfBirth("")
      
     
      setDisplayImage(previewimage)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
      <form onSubmit={handlesubmit}>
        <h2>Registration</h2>
      <div className='inputs'>
        <label>Full Name :
        <input type="text"
        name="fullname" 
        value={fullname}
        onChange={e => setFullName(e.target.value)}
        style={{marginLeft: "5px"}} />
        </label> 
        <label>Mobile Number :
        <input type="tel"
        pattern="[0-9]{10}"
        value={mobileno}
        onChange={e => setMobileNo(e.target.value)} 
        style={{marginLeft: "5px"}} />
        </label>
        
          <label>Pref. location
          <Multiselect
          isObject={false}
          options={location}
          displayValue="key"
          showCheckbox={true}
          style={{outerWidth:"100px"}}
          />
        </label>
        <label>Email id :
          <input type="email"
          value={emailid}
          onChange={e => setEmailId(e.target.value)} 
          style={{marginLeft: "5px"}} />
        </label>
        <label>DOB :
          <input type="date"
          value={dateofbirth}
          onChange={e => setDateOfBirth(e.target.value)} 
          style={{marginLeft: "5px"}} />
        </label>
        
          <input type="file" onChange={handleImageChange}/>
          <div className='img'>
            <div className='imgpreview'>
          {previewimage&&<img src={previewimage} alt="preview" />}
            </div>
          </div>
          <button type="submit" className='btn btn-success btn-md'>Upload Image</button>
        </div>
         <button style={{marginBottom: "5px"}} ><strong>Submit</strong></button>
      </form>

         <div>
          <table>
          <thead>
           <tr>
             <th>Full Name</th>
             <th>Mobile no</th>
             <th>Email id</th>
             <th>DOB</th>
             <th>pic</th>
             {/* <th>Last Name</th> */}
            </tr>
            </thead>
          </table>
          
          </div>
          {
          names.map((value)=><div>
            
            <table>
              <tbody>
              <tr>
              <td>{value.fullname}</td>
              <td>{value.mobileno}</td>
              <td>{value.emailid}</td>
              <td>{value.dateofbirth}</td>
              {/* <td>{value.location}</td> */}
              <td>{displayimage&&<img src={displayimage} alt="display"/>}</td> 
              
              </tr>  
              </tbody>
            </table>
            
             </div>

          )
         
        }
      </header>
    </div>
  );
}



export default App;
