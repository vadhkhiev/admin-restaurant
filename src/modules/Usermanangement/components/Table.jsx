import React from 'react';
import TableRow from './TableRow';
import { useSelector } from 'react-redux';
import loadinggif from '../../../assets/img/loading.gif'

const Table = ({ users, handleEdit }) => {
  const { userPermission } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.users);

  return (
    <>
      <div className=" custom-border rounded-3" style={{ overflowX: 'scroll' }}>
        <table style={{ color: 'white', background: '#09090b' }} className="table table-borderless ">
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
          <tbody >
            {loading ? (
                 <tr>
                 <td colSpan="8" className="text-center">
                   <div className="d-flex justify-content-center align-items-center my-3">
                     <img width={25} src={loadinggif} alt="" />
                   </div>
                 </td>
               </tr>
            ) : (
              users.length > 0 ?
                users.map((user, index) => (
                  <TableRow handleEdit={handleEdit} key={user.id} index={index + 1} user={user} />
                )) :
                <tr><td colSpan={8} className='text-white text-center'>No Results.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
