import React, { useState } from 'react'
import TableRow from './TableRow'
const Table = ({users , handleDelete}) => {
  
  return (
    <>

    {users?.length > 1 ? (
      <>
       <table className="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Username</th>
        <th scope="col">Created At</th>
        <th scope="col">Updated At</th>
        <th scope='col'>Roles</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      {
        users.filter(user => user.id !== 1).map((user, index) => (
          <TableRow handleDelete={handleDelete} key={user.id} index={index + 1} user={user} />
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