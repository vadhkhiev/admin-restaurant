import React, { useEffect, useState } from 'react'
import { MdOutlineLockPerson } from "react-icons/md";
import { PiNotePencilThin } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GoTrash } from "react-icons/go";
import { FaUserLock } from "react-icons/fa";
import { storeId, storeUpdateToggle } from '../core/reducer';
import useRoles from '../core/action';
import { alertError } from '../../utils/alert';


const dateTimeFormat = (inputString) => {
  const [datePart, timePart] = inputString?.split('T');

  const [year, month, day] = datePart?.split('-');
  const formattedDate = `${day}/${month}/${year?.slice(0,4)}`;

  const [hour, minute] = timePart?.slice(0, -1)?.split(':');
  const utcOffset = 7; // UTC+7
  const adjustedHour = parseInt(hour, 10) + utcOffset;
  
  // Ensure the hour is within the range 0-23
  const adjustedHourInRange = (adjustedHour + 24) % 24;
  
  // Format the time in 12-hour format with AM/PM
  const formattedTime = `${(adjustedHourInRange % 12) || 12}:${minute} ${adjustedHourInRange < 12 ? 'AM' : 'PM'}`;

  return `${formattedDate} at ${formattedTime}`;
};


const TableRow = ({role , index }) => {
  const dispatch = useDispatch()
  const {userPermission , user} = useSelector((state) => state.auth);
  const { params} = useSelector((state) => state.roles);
  const {deleteRole} = useRoles();



  const handleDelete = (role) => {
    deleteRole(role)
  }

  
  return (
    <>
        <tr className='hover-effect '>
            <td className=' text-white '  >
              {params.page === 1 ? index : (params.page - 1) * (params.size) + index }
            </td>
            <td className=' text-white'>{role?.name}</td>
            <td className=' text-white'>{role?.createdBy.name}</td>
            <td className=' text-white'>{dateTimeFormat(role?.createdDate)}</td>
            <td className=' text-white '>{dateTimeFormat(role?.updateDate)}</td>
            {
            (user.id === 1 || userPermission?.find(per => per.name === 'edit-role')?.status === 1 || userPermission?.find(per => per.name === 'delete-role')?.status === 1) && (
              <td className='d-flex  text-white'>
                {user.id === 1 && (
                  role.id !== 1 ?  <Link to="/role/access"  onClick={() => dispatch(storeId(role?.id))}  className='fs-4 me-2 text-white'  type="button">
                  <MdOutlineLockPerson /> 
                </Link> : <FaUserLock className='fs-4 mt-1 me-2' />
                )}
                {userPermission?.find(per => per.name === 'edit-role')?.status === 1 && (
                  <p  onClick={() => {
                    if (role?.id === 1) {
                      alertError('You can not edit this role');
                      return;
                    }
                     dispatch(storeId(role?.id)); 

                    dispatch(storeUpdateToggle(true));
                  }}  className='fs-4 me-2 text-white'  type="button">
                    <PiNotePencilThin />
                  </p>
                )}
             {userPermission?.find(per => per.name === 'delete-role')?.status === 1 && (
              <p 
              onClick={() => dispatch(storeId(role?.id))} 
               className={`fs-4 text-danger `} type="button">
                <GoTrash onClick={() => handleDelete(role)}/>
              </p>
            )}
         </td>
  )
}

          </tr>
        
    </>
  )
}

export default TableRow