import React, { useState } from 'react'
import TableRow from './TableRow'
import { useSelector } from 'react-redux'

const Table = ({setUpdate}) => {
  const roles =  useSelector((state) => state.roles.roles);
  const {userPermission} = useSelector((state) => state.auth);



  return (
    <div>
      
         <div className=" custom-border rounded-3">
            <table style={{color:'white'}} className="table table-borderless bg-transparent ">
              <thead >
                <tr className="border-bottom border-dark">
                  <th scope="col" className='text-white-50'>No</th>
                  <th scope='col' className='text-white-50'>Roles</th>
                  <th scope="col" className='text-white-50'>Created by</th>
                  <th scope='col' className='text-white-50'>Created Date</th>
                  <th scope='col' className='text-white-50'>Updated Date</th>
                  {
                    ((userPermission?.find((per) => per.name == 'edit-role'))?.status === 1 || (userPermission ?.find((per) => per.name == 'delete-role'))?.status === 1) && <th scope='col' className='text-white-50'>Action</th>
                  }
                </tr>
              </thead>
              <tbody>
                {
                   roles.length > 0 ?  roles?.map((role ,index)=> <TableRow index={index + 1}   setUpdate={setUpdate} key={role.id} role={role} />) : <tr><td colSpan={6} className='text-white text-center '>No Results.</td></tr>
                } 
              </tbody>
            </table>


          
          </div>
    </div>
  )
}

export default Table