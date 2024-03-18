import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import axios from "axios";
import { IoIosPersonAdd } from "react-icons/io";



const Table = () => {
  const [tableList, setTableList] = useState([]);
  const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');
  useEffect(() => {
    axios.get(`/api/table`, {
      headers: {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${token}`,
      },
    })
    .then(res => {
      setTableList(res.data.data)
      console.log(res.data);
    })
    .catch(err => console.log(err));
  }, [])

  // function for delete
  const handleDelete = (id) =>{
    const confirm = window.confirm("Are You Sure to delete?");
    if(confirm){
      axios.delete(`/api/table/`+ id, {
        headers: {
          "Content-Type" : "application/json",
          "Authorization" : "Bearer eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGVJZCI6MSwiaXNzIjoiS0lMTy1JVCIsImF2YXRhciI6ImF2YXRhciIsInBob25lIjoiMDEyMzQ1Njc4OSIsInNjb3BlIjoibGlzdC11c2VyIGNyZWF0ZS1yb2xlIGRlbGV0ZS1yb2xlIGNyZWF0ZS11c2VyIGVkaXQtdXNlciBlZGl0LXJvbGUgbGlzdC1yb2xlIGRlbGV0ZS11c2VyIiwibmFtZSI6IkFkbWluIiwicm9sZU5hbWUiOiJTdXBlci1BZG1pbiIsImlkIjoxLCJleHAiOjE3MTA5OTY1MDUsImlhdCI6MTcxMDM5MTcwNSwianRpIjoiMSIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwidXNlcm5hbWUiOiJhZG1pbiIsInN0YXR1cyI6dHJ1ZX0.MePeEbgnhlqFzGJU8U1nNrJAlVxEdVmMJ3XmDAeHjCH2uDln5dH-FkCW7M1Faa3_dGtMrzPVkTnoQa75G7hbA522kdebFei2ZxjpBtAgaCFBrIc73L0fne3Mu2j5751QefIY245PDTWK8jLdcjEk3NnHz5LSFdazxNJFuHi4PC1L-wQxa3vWomLEDbiI-0etp6vd2FtPeiAiDq9DZjIO79R45N2YpArgQrMSceL_I-3qAzMiBdPqR7xTB32HeABb4gnMt-GEENGIbJyPlOSxOBlmMmcy4smZ3fNkrasHt64Y8UgA0Pr9NGnAXlwk1mLwekgxicFpJbrqu2wCJEIz6g",
        },
      })
      .then(res => {
        window.location.reload();
      })
      .catch(err => console.log(err));
    }
  }
  

  return (
    <div className="table-container">
      <table className="table bg-white">
        <thead>
          <tr>
            {/* <th scope="col">Id</th> */}
            <th scope="col">Name</th>
            <th scope="col">Status</th>
            <th scope="col">SeatCapacity</th>
            <th scope="col">CreateDate</th>
            <th scope="col">UpdateDate</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableList.map((tables,index) => (
            <tr key={index}>
              {/* <td>{index+1}</td> */}
              <td>{tables.name}</td>
              <td>{tables.status}</td>
              <td>{tables.seatCapacity}</td>
              <td>{tables.createdDate}</td>
              <td>{tables.updateDate}</td>
              <td className="d-flex gap-2 text-center">
                <Link to={`/createTable`}><IoIosPersonAdd style={{ width: "20px", color: "blue" }} /></Link>
                <Link to={`/UpdateTable/${tables.id}`}><FaUserEdit style={{ width: "15px", color: "green" }} /></Link>
                <a type="button">
                  <MdDelete onClick={e => handleDelete(tables.id)} style={{ width: "20px", color: "red" }} />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
