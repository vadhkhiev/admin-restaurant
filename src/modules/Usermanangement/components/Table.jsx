import React from 'react'
import TableRow from './TableRow'
const Table = ({users}) => {
  const allusers = users
  return (
    <>
    {allusers?.length > 0 ? (
      <>
       <table className="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Username</th>
        <th scope="col">Created At</th>
        <th scope="col">Updated At</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      {
         allusers.map((item, index) => (
          <TableRow user={item} key={index} index={index + 1} />
        )) 
      }
    </tbody>
  </table>
      </>
    ):
    (
      <p className='text-center text-danger'>No users found</p>
    )
    }
    </>
  )
}

export default Table