import React, { useState } from 'react'
import TableRow from './TableRow'
import { useSelector } from 'react-redux'

const Table = ({setUpdate}) => {
  const roles =  useSelector((state) => state.roles.roles);
  const pagingdetails = useSelector((state) => state.roles.paging);
  const [currpage , setCurrpage] = useState(1);

  

  const handlePagination = (paging) => {
    window.scrollTo(0, 0);
    if (paging === 'increase') {
      setCurrpage(pagingdetails.totalPage === currpage ? currpage : currpage + 1 );
    } else {
      setCurrpage(currpage === 1 ? 1 : currpage - 1);
    }
  }

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
                    roles.map((role ,index)=> <TableRow  setUpdate={setUpdate} key={role.id} role={role} index={index + 1}/>)
                }
              </tbody>
            </table>

            {/* pagination */}
            <div className='p-0 d-flex justify-content-center'>
            <nav aria-label="Page navigation example">
              <ul className="pagination list-unstyled d-flex justify-content-center align-items-center">
                <li className="page-item underline-none me-4">
                  <a onClick={() => handlePagination('decrease')} style={{ fontSize: '25px' }} className="page-link" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li className="page-item underline-none" style={{ display: 'flex', gap: '5px', width: '60px' }}>
                  <span className="page-link" style={{ fontSize: '18px' }}>{currpage}</span>
                  <span className="page-link" style={{ fontSize: '18px' }}>/</span>
                  <span className="page-link" style={{ fontSize: '18px' }}>{pagingdetails.totalPage}</span>
                </li>
                <li className="page-item">
                  <a onClick={() => handlePagination('increase')} style={{ fontSize: '25px' }} className="page-link" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>

          </div>
          
          </div>
    </div>
  )
}

export default Table