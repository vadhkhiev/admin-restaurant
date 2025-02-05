import React from 'react';
import { PiNotePencilThin } from "react-icons/pi";
import { GoTrash } from "react-icons/go";
import avatar from '../../../assets/img/avatar.jpg'
import { useSelector } from 'react-redux';
import useUsers from '../core/action';


const TableRow = ({ user, handleEdit }) => {
  const { userPermission } = useSelector((state) => state.auth);
  const { deleteUser } = useUsers()

  return (
    <>
      <tr className='text-white hover-effect'>
        <td className='text-white'>
          <img  className='avatar rounded-circle' src={user?.avatar?.length > 50 ? user.avatar : avatar} style={{ border: '1px solid #6c738f' }} />
          </td>
        <td className='text-white'>{user.name}</td> 
        <td className='text-white'>{user.email}</td>
        <td className='text-white'>{user.phone}</td>
        <td className='text-white'>$ {user.salary}</td>
        <td className='text-white'>
          <p style={{ borderRadius: '13px', background: user.status ? '#086355' : '#7f1f1f' }} className='fs-6   custom-border text-center mt-3 text-white'>
            {user.status ? "Active" : "Inactive"}
          </p>
        </td>
        <td className='text-white'>{user.role?.name}</td>
        {
          ((userPermission?.find(per => per.name === 'edit-user')?.status === 1) || (userPermission?.find(per => per.name === 'delete-user')?.status === 1)) && (
            <td>
              {userPermission?.find(per => per.name === 'edit-user')?.status === 1 && (
                <a onClick={() => handleEdit(user.id)} className='fs-4 text-white me-2' style={{ color: '#6c738f' }} type="button">
                  <PiNotePencilThin />
                </a>
              )}
              {userPermission?.find(per => per.name === 'delete-user')?.status === 1 && (
                <a className='fs-4 text-danger'  onClick={() => deleteUser(user.name, user.id)} type="button">
                  <GoTrash />
                </a>
              )}
            </td>
          )
        }
      </tr>
    </>
  );
};

export default TableRow;
