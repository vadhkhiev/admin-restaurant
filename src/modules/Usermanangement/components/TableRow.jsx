import React from 'react';
import { PiNotePencilThin } from "react-icons/pi";
import { GoTrash } from "react-icons/go";
import '../../../assets/css/tablecss.css'; 
import avatar from '../../../assets/img/avatar.jpg'
import { useSelector } from 'react-redux';


const TableRow = ({ user,handleDelete ,handleEdit }) => {
  const permission = useSelector((state) => state.permission?.permission?.data?.permissions);

  return (
    <>
      <tr >
        <td><img src={user?.avatar?.length > 50 ? user.avatar : avatar} className="avatar rounded-circle " style={{border:'1px solid #6c738f'}} /></td>
        <td >{user.name}</td>
        <td >{user.email}</td>
        <td >{user.phone}</td>
        <td >$ {user.salary}</td> 
        <td >
          <p style={{borderRadius:'13px', background: user.status ? '#cee9d0' : '#f8d7da', color:user.status ? '#3fa27f' : 'red' }} className='fs-6 fw-normal text-center mt-3'> 
            {user.status?"Active":"Inactive"}
          </p>
        </td>
        <td >{user.role?.name}</td>
        {
          ((permission?.find(per => per.name === 'edit-user')?.status === 1) || (permission?.find(per => per.name === 'delete-user')?.status === 1)) && (
            <td>
              {permission?.find(per => per.name === 'edit-user')?.status === 1 && (
                <a onClick={() => handleEdit(user.id)} className='fs-4 text-primary me-2' style={{ color: '#6c738f' }} type="button">
                  <PiNotePencilThin />
                </a>
              )}
              {permission?.find(per => per.name === 'delete-user')?.status === 1 && (
                <a className='fs-4 text-danger' style={{ color: '#6c738f' }} onClick={() => handleDelete(user)} type="button">
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
