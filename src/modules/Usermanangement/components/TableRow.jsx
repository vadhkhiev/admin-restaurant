import React from 'react';
import { PiNotePencilThin } from "react-icons/pi";
import { GoTrash } from "react-icons/go";
import '../../../assets/css/tablecss.css'; 
import avatar from '../../../assets/img/avatar.jpg'
import { useSelector } from 'react-redux';

/* const formatDate = (inputString) => {
  const [datePart, timePart] = inputString.split('T');
  
  const [year, month, day] = datePart.split('-');
  const formattedDate = `${day}/${month}/${year.slice(0,4)}`;

  const [hour, minute] = timePart.slice(0, -1).split(':');
  const utcOffset = 7; // UTC+7
  const adjustedHour = parseInt(hour, 10) + utcOffset;
  
  // Ensure the hour is within the range 0-23
  const adjustedHourInRange = (adjustedHour + 24) % 24;
  
  // Format the time in 12-hour format with AM/PM
  const formattedTime = `${(adjustedHourInRange % 12) || 12}:${minute} ${adjustedHourInRange < 12 ? 'AM' : 'PM'}`;

  return `${formattedDate} ${formattedTime}`;
};

 */

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
