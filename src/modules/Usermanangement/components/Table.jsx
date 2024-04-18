import React from 'react';
import TableRow from './TableRow';
import { useSelector } from 'react-redux';
const Table = ({ users, handleEdit }) => {
  const { userPermission } = useSelector((state) => state.auth);
  return (
    <>
          <div className=" custom-border rounded-3" style={{overflowX:'scroll'}}>
            <table style={{color:'white',background:'#09090b'}} className="table table-borderless ">
              <thead className='border-bottom border-dark'>
                <tr>
                  <th scope="col" className='text-white'>Profile</th>
                  <th scope="col" className='text-white'>Name</th>
                  <th scope="col" className='text-white'>Email</th>
                  <th scope="col" className='text-white'>Phone Number</th>
                  <th scope='col' className='text-white'>Salary</th>
                  <th scope="col" className='text-white'>Status</th>
                  <th scope='col' className='text-white'>Roles</th>
                  {((userPermission?.find((per) => per.name === 'edit-user'))?.status === 1 || (userPermission?.find((per) => per.name === 'delete-user'))?.status === 1) && <th scope='col' className='text-white'>Actions</th>}
                </tr>
              </thead>
              <tbody className='overflow-hidden'>
                {users.length > 0 ? 
                  users.map((user, index) => (
                    <TableRow handleEdit={handleEdit} key={user.id} index={index + 1} user={user} />
                  )) : 
                  <tr><td colSpan={8} className='text-white text-center '>No Results.</td></tr>
                }
              </tbody>
            </table>
          </div>
    </>
  );
};

export default Table;
