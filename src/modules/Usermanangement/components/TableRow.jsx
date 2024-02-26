import React from 'react'
import { PiNotePencilThin } from "react-icons/pi";
import { GoTrash } from "react-icons/go";
const TableRow = ({user,index}) => {

  return (
    <>
     <tr>
        <th scope="row">{index}</th>
        <td>{user.username}</td>
        <td>{user.createdDate}</td>
        <td>{user.updateDate}</td>
        <td>
          <button type="button" className="btn btn-primary btn-sm">
            <PiNotePencilThin/> Edit
          </button>
          <button type="button" className="btn btn-danger btn-sm">
            <GoTrash/> Delete
          </button>
        </td>
      </tr>
    </>
  )
}

export default TableRow