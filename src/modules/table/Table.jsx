import React, { useEffect, useState } from "react";
import axios from "axios";
import dateTimeFormat from "../Role/core/dateTimeFormat";
import { useSelector } from "react-redux";
import CreateTable from "./components/CreateTable";

const Table = () => {
  const [tableList, setTableList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");
  const [modal, setModal] = useState(false);
  const [query, setQuery] = useState("");

  // const [value,setValue] = useState("")
  const [sortValue,setSortValue] = useState("")
  const sortOptions = ["ASC","DASC"];

  const [filterValue,setFilterValue] = useState("")
  const filterOptions = ["Available","Booked"];

    useEffect(() =>{
      // if(query.length === 0 || query.length > 2){
        axios
        .get(`/api/table?query=${query}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setTableList(res.data.data);
        })
        .catch((err) => console.log(err));
      // }
    },[query])

  function toggleModal() {
    setModal(!modal);
  }
  useEffect(() => {
    axios
      .get(`/api/table`, {
        headers: {
          "Content-Type": "application/json",
          Authorization:`Bearer ${token}`,
        },
      })
      .then((res) => {
        setTableList(res.data.data);
        setRefresh(true);
        console.log(res.data);
      })
  }, [refresh,token]);

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
  //sort 
    const handleSort = async (e) => {
      let value = e.target.value;
      setSortValue(value);
      return await axios
        .get(`/api/table?order=${value}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setTableList(res.data.data);
        })
        .catch((err) => console.log(err));
    }
    //filter
    const handleFilter = async (e) => {
      let value = e.target.value;
      setFilterValue(value);
      return await axios
        .get(`/api/table?status=${value}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setTableList(res.data.data);
        })
        .catch((err) => console.log(err));
    }

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
                type="text"
                placeholder="Search"
                onChange={(e) => setQuery(e.target.value)}
              />
              <h5>Sort By: </h5>
              <select 
                style={{ width: "20%", borderRadius:"2px", height:"35px" }} 
                onChange={handleSort}
                value={sortValue}
              >
                <option value="">Choose Sort</option>
                {sortOptions.map((item,index) => (
                  <option value={item} key={index}>{item}</option>
                ))}
              </select>
              <h5>Filter By: </h5>
              <select
                style={{ width: "20%", borderRadius:"2px", height:"35px" }} 
                onChange={handleFilter}
                value={filterValue}
              >
                <option value="">Choose filter</option>
                {filterOptions.map((item,index) => (
                  <option value={item} key={index}>{item}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="container mt-3">
          <table className="table bg-white">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
                <th scope="col">SeatCapacity</th>
                <th scope="col">CreateDate</th>
                <th scope="col">UpdateDate</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {tableList.map((tables) => (
                <tr key={tables.id}>
                  <td>{tables.id}</td>
                  <td>{tables.name}</td>
                  <td
                    className={`${
                      tables.status === "Available" ? "text-success": "text-danger"
                    }`}
                  >
                    {tables.status}</td>
                  <td>{tables.seatCapacity}</td>
                  <td>{dateTimeFormat(tables.createdDate)}</td>
                  <td>{dateTimeFormat(tables.updateDate)}</td>
                  <td className="d-flex gap-2 justify-content-center">
                    <button className="btn btn-success" >Update</button>
                    <button className="btn btn-danger" onClick={(e) => handleDelete(tables.id)}>Delete</button>
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
