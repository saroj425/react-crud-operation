import { useEffect, useState } from 'react'
import './App.css'
import Employeedata from '../src/components/Employeedata'

function App() {
  const [data,setData] = useState([])
  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [age,setAge] = useState(0);
  const [id,setId] = useState(0);
  const [isupdate,setIsUpdate] = useState(false);

  useEffect(()=>{
    setData(Employeedata);
  },[])

  const handleEdit = (id)=>{
   // alert(id);
   setIsUpdate(true)
   const dt = data.filter(item=>item.id === id);
   if(dt!==undefined){
    setFirstName(dt[0].firstName);
    setLastName(dt[0].lastName);
    setAge(dt[0].age)
   }
  }

  const handleSave = (e)=>{
   // e.preventDefault();
   let error = "";
   if(firstName==="")
    error +='First Name Required,'
   if(lastName==="")
    error +="Last name required ,";
  if(age<=0)
    error += "Age Required";
if(error === ""){
  const dt = [...data];
    const newObject = {
      id : Employeedata.length+1,
      firstName:firstName,
      lastName:lastName,
      age:age
    }
    dt.push(newObject);
    setData(dt);
  }    
  else{
    alert(error);
  }
}

  const handleUpdate = ()=>{
    const index = data.map((item)=>{
      return item.id
      }).indexOf(id);
      console.log("indexindexindexindex",index);
      const dt  = [...data];
      console.log("dtdtdtdtdtdtdtdtdtdt",dt[index]);
      dt[index].firstName = firstName;
      dt[index].lastName = lastName;
      dt[index].age = age;
      setData(dt);
  }

  const handlClear=(id)=>{
    setIsUpdate(false)
    setId(0);
    setAge("");
    setFirstName("");
    setLastName("");
  }

  const handleDelete = (id)=>{
    //alert(id);
    if(id>0){
      if(window.confirm("Are you sure want to delete ?")){
        const dt = data.filter(item=>item.id!==id)
      setData(dt);
      }
    }
  }

  return (
    <>
      <div className='wrapper text-center'>
        <div className='upperdiv d-flex justify-content-center mb-5 align-items-center'>
          <div className='d-flex align-items-center'>
            <label className='w-75'><b>First Name: </b></label>
              <input type="text" className='form-control' name="fname" placeholder='First name' value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
            
          </div>
          <div className='d-flex align-items-center'>
            <label className='w-75'><b>Last Name: </b></label>
              <input type="text" className='form-control' name="fname" placeholder='Last name' value={lastName} onChange={(e)=>setLastName(e.target.value)} />
            
          </div>
          <div className='d-flex align-items-center'>
            <label className='w-75'><b>Age:</b> </label>
              <input type="text" className='form-control' name="fname" placeholder='age' value={age} onChange={(e)=>setAge(e.target.value)} />
            
          </div>
          <div>
            {
              !isupdate ? <button className='btn btn-primary' onClick={()=>handleSave()}>Save</button> : <button className='btn btn-primary' onClick={()=>handleUpdate()}>Update</button>
            }
            <button className='btn btn-danger' onClick={()=>handlClear()}>Clear</button>
          </div>
        </div>
        <table className='table table-hover'>
          <thead>
            <tr>
              <td>S.No</td>
              <td>ID</td>
              <td>First Name</td>
              <td>Last Name</td>
              <td>Age</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {
              data && data.map((edata,index)=>{
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{edata.id}</td>
                    <td>{edata.firstName}</td>
                    <td>{edata.lastName}</td>
                    <td>{edata.age}</td>
                    <td>
                      <button className='btn btn-primary' onClick={()=>handleEdit(edata.id)}>Edit</button>
                      <button className='btn btn-danger' onClick={()=>handleDelete(edata.id)}>Delete</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
