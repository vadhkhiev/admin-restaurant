import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GrUserAdmin } from "react-icons/gr";

const Access = () => {
    const navigate = useNavigate()
    const handleBack =()=>{
      navigate(-1)
    }
  return (
    <>
    <div className='m-3'>
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
    </div>
    </>
  )
}

export default Access