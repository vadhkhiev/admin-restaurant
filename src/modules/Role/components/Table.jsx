import React from 'react'
import TableRow from './TableRow'
import { useSelector } from 'react-redux'

const Table = () => {
  const roles =  useSelector((state) => state.roles.roles);
  const {userPermission} = useSelector((state) => state.auth);



  return (
    <div>
      
         <div className=" custom-border rounded-3" style={{overflowX:'scroll'}}>
            <table style={{color:'white',background:'#09090b'}} className="table table-borderless  ">
              <thead >
                <tr className="border-bottom border-dark">
                  <th scope="col" className='text-white'>No</th>
                  <th scope='col' className='text-white'>Roles</th>
                  <th scope="col" className='text-white'>Created by</th>
                  <th scope='col' className='text-white'>Created Date</th>
                  <th scope='col' className='text-white'>Updated Date</th>
                  {
                    ((userPermission?.find((per) => per.name === 'edit-role'))?.status === 1 || (userPermission?.find((per) => per.name === 'delete-role'))?.status === 1) && <th scope='col' className='text-white'>Action</th>
                  }
                </tr>
              </thead>
              <tbody>
                {
                   roles.length > 0 ?  roles?.map((role ,index)=> <TableRow index={index + 1} key={role.id} role={role} />) : <tr><td colSpan={6} className='text-white text-center '>No Results.</td></tr>
                } 
              </tbody>
            </table>


          
          </div>
    </div>
  )
}

export default Table