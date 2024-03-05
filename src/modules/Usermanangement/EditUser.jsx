import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const EditUser = () => {
  const param = useParams().id
  const users = useSelector((state) => state.users.users)
  const user = users.find((u) => u.id.toString() === param)
  console.log(user)
  

  return (
    <>
      <div className='bg-white rounded p-3'>
        <h2>Edit User</h2>
        <div>
          <div className=''>
            
          </div>
        </div>
    </div>  
    </>
  )
}

export default EditUser