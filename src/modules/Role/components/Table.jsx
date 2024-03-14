import React from 'react'
import TableRow from './TableRow'
import { useSelector } from 'react-redux'

const Table = () => {
  const roles =  useSelector((state) => state.roles.roles);
  return (
    <div>
         <div className="table-container">
            <table style={{color:'#464d69'}} className="table bg-white fw-bold">
              <thead >
                <tr>
                  <th scope="col">No</th>
                  <th scope='col'>Roles</th>
                  <th scope="col">Created by</th>
                  <th scope='col'>Created Date</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                    roles.map((role ,index)=> <TableRow key={role.id} role={role} index={index + 1}/>)
                }
              </tbody>
            </table>
          </div>
    </div>
  )
}

export default Table