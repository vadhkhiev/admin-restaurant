import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import axios from "axios";
import { IoIosPersonAdd } from "react-icons/io";
import dateTimeFormat from "../Role/core/dateTimeFormat";
import { useSelector } from "react-redux";
import CreateTable from "./CreateTable";

const Table = () => {
  const [tableList, setTableList] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");
  const [modal, setModal] = useState(false);

  function toggleModal() {
    setModal(!modal);
  }
  useEffect(() => {
    axios
      .get(`/api/table`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTableList(res.data.data);
        setRefresh(!refresh);
      })
      .catch((err) => console.log(err));
  }, [refresh]);

  // function for delete
  const handleDelete = (id) => {
    const confirm = window.confirm("Are You Sure to delete?");
    if (confirm) {
      axios
        .delete(`/api/table/` + id, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {modal && <CreateTable toggleModal={toggleModal} />}
      <div>
        <div className="container mt-3">
          <div className="row">
            <div className="col-4 d-flex align-item-center">
              <span className="fw-bold fs-2 text-dark me-3">Table List</span>
              <button
                className="btn btn-primary fs-4 fw-bold px-3"
                onClick={toggleModal}
              >
                Create
              </button>
            </div>
            <div className="col-8 d-flex align-item-center justify-content-end ">
              <input
                className="rounded-3 py-2 ps-3 pe-4 mx-2 border-0 fs-4"
                type="search"
                placeholder="Search"
              />
              <button className="btn btn-outline-secondary fw-bold px-4 fs-4">
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="container mt-3">
          <table className="table bg-white">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
                <th scope="col">SeatCapacity</th>
                <th scope="col">CreateDate</th>
                <th scope="col">UpdateDate</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tableList.map((tables, index) => (
                <tr key={index}>
                  <td>{tables.name}</td>
                  <td>{tables.status}</td>
                  <td>{tables.seatCapacity}</td>
                  <td>{dateTimeFormat(tables.createdDate)}</td>
                  <td>{dateTimeFormat(tables.updateDate)}</td>
                  <td className="d-flex gap-2 text-center">
                    <Link to={`/UpdateTable/${tables.id}`}>
                      <FaUserEdit style={{ width: "15px", color: "green" }} />
                    </Link>
                    <a type="button">
                      <MdDelete
                        onClick={(e) => handleDelete(tables.id)}
                        style={{ width: "20px", color: "red" }}
                      />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Table;
