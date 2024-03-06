import React, { useState } from 'react';
import TableRow from './TableRow';
import '../../../assets/css/tablecss.css'; 

const Table = ({ users, handleDelete ,handleEdit }) => {
  return (
    <>
      {users?.length > 0 ? (
        <>
          <div className="table-container">
            <table style={{color:'#464d69'}} className="table bg-white fw-bold">
              <thead >
                <tr>
                <th scope="col">Profile</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone Number</th>
                  <th scope='col'>Salary</th>
                  <th scope="col">Status</th>
                  <th scope='col'>Roles</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <TableRow handleEdit={handleEdit} handleDelete={handleDelete} key={user.id} index={index + 1} user={user} />
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className='text-center text-danger'>No users found</p>
      )}
    </>
  );
};

export default Table;
