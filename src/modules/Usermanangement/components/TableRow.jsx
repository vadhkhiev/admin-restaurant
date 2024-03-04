import React, { useState } from 'react';
import { PiNotePencilThin } from "react-icons/pi";
import { GoTrash } from "react-icons/go";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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



const TableRow = ({ user, index ,handleDelete }) => {
   const token =  useSelector((state) => state.auth.token)


  return (
    <>
      <tr>
        <th scope="row">{index}</th>
        <td>{user.username}</td>
        <td>{formatDate(user.createdDate)}</td>
        <td>{formatDate(user.updateDate)}</td>
        <td>{user.roleEntity.name}</td>
        <td>
          <Link to='/users/edit' type="button" className="btn btn-primary btn-sm">
            <PiNotePencilThin /> Edit
          </Link>
          <button onClick={() => handleDelete(user)} type="button" className="btn btn-danger btn-sm">
            <GoTrash /> Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default TableRow;
