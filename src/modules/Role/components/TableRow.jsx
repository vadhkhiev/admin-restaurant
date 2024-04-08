import React, { useEffect, useState } from 'react'
import { MdOutlineLockPerson } from "react-icons/md";
import { PiNotePencilThin } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { storeId } from '../core/reducer';
import { GoTrash } from "react-icons/go";
import formatDate from '../core/dateTimeFormat'
import { FaUserLock } from "react-icons/fa";

import DeleteRole from './DeleteRole';


const TableRow = ({role , index , setUpdate , page , size , setRefetch,refetch }) => {
  const dispatch = useDispatch()
  const id1 = useSelector((state) => state.currentUser.currentUser?.roleId)
  const [roleidofuser , setroleidofuser] = useState('')
  const permission = useSelector((state) => state.permission?.permission?.data?.permissions);
  const userRoleName = useSelector((state) => state.permission?.userRoleName);
  const [deletes , setDeletes] = useState(false)

  useEffect(() => {
    if(userRoleName === 'Super-Admin'){
      setroleidofuser(1)
    }
  },[])

  const roleId = id1 || roleidofuser ;

  
  return (
    <>
    {
      deletes && <DeleteRole role={role} refetch={refetch} setRefetch={setRefetch} deletes={deletes} setDeletes={setDeletes}/>
    }
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
                  role.id !== 1 ?  <Link to="/role/access" onClick={() => dispatch(storeId(role?.id))} className='fs-4 me-2' style={{ color: '#6c738f' }} type="button">
                  <MdOutlineLockPerson /> 
                </Link> : <FaUserLock className='fs-4 mt-1 me-2' />
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
              <p onClick={() => dispatch(storeId(role?.id))} className={`fs-4 text-danger `} type="button">
                <GoTrash onClick={() => setDeletes(!deletes)}/>
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