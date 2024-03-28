import React, { useEffect, useState } from 'react'
import { MdOutlineLockPerson } from "react-icons/md";
import { PiNotePencilThin } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { storeId } from '../core/idSlice';
import { CiTrash } from "react-icons/ci";
import formatDate from '../core/dateTimeFormat'
import axios from 'axios';

const getUserRole = async (token, id) => {
  try {
    const response = await axios.get(`/api/user/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; 
  }
};

const getroles = async (token) => {
  try {
    const response = await axios.get(`/api/roles`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;  
  }
};


const TableRow = ({role , index , setUpdate , page , size}) => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.currentUser.currentUser?.token) || localStorage.getItem('token');
  const id1 = useSelector((state) => state.currentUser.currentUser?.roleId)
  const [roleidofuser , setroleidofuser] = useState('')
  const permission = useSelector((state) => state.permission?.permission?.data?.permissions);
  const userRoleName = useSelector((state) => state.permission?.userRoleName);

  useEffect(() => {
    if(userRoleName === 'Super-Admin'){
      setroleidofuser(1)
    }
  },[])

  const roleId = id1 || roleidofuser ;

  

  return (
    <>
        <tr>
            <td >
              <div className='py-1'>
               { page > 1 ? (page * size) - size + index :  index }
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