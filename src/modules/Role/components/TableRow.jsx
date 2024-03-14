import React from 'react'
import { MdOutlineLockPerson } from "react-icons/md";
import { PiNotePencilThin } from "react-icons/pi";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { storeId } from '../core/idSlice';

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

  return `${formattedDate} ${formattedTime}`;
};
 
 

const TableRow = ({role , index}) => {
  const dispatch = useDispatch()
  console.log(role)

  return (
    <>
        <tr >
            <td>{index}</td>
            <td >{role?.name}</td>
            <td >{role?.createdBy.name}</td>
            <td >{formatDate(role?.createdDate)}</td>
         <td>
            <Link to="/role/access" onClick={() => dispatch(storeId(role?.id))}   className='fs-4 text-primary me-2' style={{color:'#6c738f'}} type="button" >
                <MdOutlineLockPerson/>
              </Link> 
             <a className='fs-4 text-danger' style={{color:'#6c738f'}} type="button" >
             <PiNotePencilThin />
              </a> 
            </td> 
          </tr>
        
    </>
  )
}

export default TableRow