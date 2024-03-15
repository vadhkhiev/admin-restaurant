import React from 'react'
import {  useNavigate } from 'react-router-dom'
import { GrUserAdmin } from "react-icons/gr";
import { useSelector } from 'react-redux';
import Checkbox from './Checkbox';


const Access = () => {
  const id = useSelector((state) => state.id.id);
  const role = useSelector((state) => state.roles.roles)?.find((role)=>role.id == id);
  console.log(id)
    const navigate = useNavigate()
    const handleBack =()=>{
      navigate(-1)
    }
  return (
    <div className='m-3'>
    <div >
      <div className='p-4 px-3 d-flex justify-content-between'>
        <div>
          <span style={{ boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px" }} className='fw-bold p-2 rounded-3'>

           <a style={{color:'#6c738f',textDecoration:'none',}} className={`p-2  borderbottom`} >Access <GrUserAdmin className='pb-1' /></a>

          </span>
          
        </div>
        
        <div>
          <button onClick={handleBack} style={{background:'#6c738f'}} className='btn btn-primary text-white rounded'>{`< Back`}</button>
        </div>
       </div>
       <h3 style={{color:'#45495c'}} className='fw-bold d-flex align-items-center mb-3'>Permission of <span className='text-primary ms-2'>{role?.name}</span></h3>
    </div>
    <Checkbox/>
    <div className='d-flex justify-content-end p-3' >
      <button className='btn btn-primary'>Save</button>
      <button className='btn btn-danger ms-3'>Reset</button>
    </div>
    </div>
  )
}

export default Access