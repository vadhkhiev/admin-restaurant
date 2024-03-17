import React from 'react'
import { MdOutlineLockPerson } from "react-icons/md";
import { PiNotePencilThin } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { storeId } from '../core/idSlice';
import { CiTrash } from "react-icons/ci";

 const formatDate = (inputString) => {
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

  return `${formattedDate} at ${formattedTime}`;
};
 
 

const TableRow = ({role , index , setUpdate }) => {
  const dispatch = useDispatch()
  const id1 = useSelector((state) => state.currentUser.currentUser?.roleId)
  const id2 = useSelector((state) => state.currentUser.currentUser?.roleEntity?.id)
  const roleId =  id1 || id2 ;
  const permission = useSelector((state) => state.permission?.permission?.data?.permissions);


  

  return (
    <>
        <tr>
            <td >
              <div className='py-1'>
               {index}
              </div>
            </td>
            <td >{role?.name}</td>
            <td >{role?.createdBy.name}</td>
            <td >{formatDate(role?.createdDate)}</td>
            <td >{formatDate(role?.updateDate)}</td>
            {
            (roleId === 1 || permission?.find(per => per.name === 'edit-role')?.status === 1 || permission?.find(per => per.name === 'delete-role')?.status === 1) && (
              <td className='d-flex'>
                {roleId === 1 && (
                  <Link to="/role/access" onClick={() => dispatch(storeId(role?.id))} className='fs-4 text-primary me-2' style={{ color: '#6c738f' }} type="button">
                    <MdOutlineLockPerson />
                  </Link>
                )}
                {permission?.find(per => per.name === 'edit-role')?.status === 1 && (
                  <p onClick={() => {
                    dispatch(storeId(role?.id));
                    setUpdate(true);
                  }} className='fs-4 me-2' style={{ color: '#6c738f' }} type="button">
                    <PiNotePencilThin />
                  </p>
                )}
             {permission?.find(per => per.name === 'delete-role')?.status === 1 && (
              <p onClick={() => dispatch(storeId(role?.id))} className='fs-4 text-danger' type="button">
                <CiTrash />
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