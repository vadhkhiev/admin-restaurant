import React from 'react'
import { useSelector } from 'react-redux'

const EditUser = () => {
  const roles =  useSelector((state) => state.roles.roles)
  console.log(roles)
  return (
    <>
      <div className='bg-white rounded p-3'>
        <h2>Edit User</h2>
        fdsaf
    </div>  
    </>
  )
}

export default EditUser