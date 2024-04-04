import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { IoCloseCircleOutline } from "react-icons/io5";

const UpdateTable = ({ Update,pid ,setRefresh , refresh , setUpdate}) => {
  const options = [{ value: "Booked" }, { value: "Available" }];
  const [data, setData] = useState([]);

  console.log(refresh)
  
  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");
  useEffect(() => {
    axios
      .get(`/api/tables/${pid}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data.data);
        
      })
      .catch((err) => console.log(err));
  }, [ token]);

    const handleUpdate = (e) =>{
      e.preventDefault();
      axios.put(`/api/tables/${pid}`, data,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRefresh(!refresh)
        setUpdate(false)
      })
    }
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(62,64,87, 0.35)",
          zIndex: 3,
        }}
        className="d-flex justify-content-center align-items-center"
      >
        <div
          className="p-3 border rounded"
          style={{ width: "30%", backdropFilter: "blur(10px)" }}
        >
          <IoCloseCircleOutline
            style={{ cursor: "pointer" }}
            onClick={Update}
            className="fs-3 text-danger mb-3 me-2"
          />{" "}
          <br />
          <div className="">
            <label className="fs-4 w-25 " htmlFor="">
              Names:{" "}
            </label>
            <input
              className="ps-2 pe-5 py-2 border-0 rounded-3 w-75"
              type="text"
              name="name"
              placeholder="Table Name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <br /> <br />
            <label className="fs-4 w-25 " htmlFor="">
              Status:
            </label>
            <select
              className="ps-2 pe-5 py-2 border-0 rounded-3 w-75"
              name="status"
              id=""
              onChange={(e) => setData({ ...data, status: e.target.value })}
            >
              <option value="">Choose Status</option>
              {options.map((option, index) => (
                <option value={option.value} key={index}>
                  {option.value}
                </option>
              ))}
            </select>
            <br /> <br />
            <label className="fs-4 w-25" htmlFor="">
              SeatCapacity:{" "}
            </label>
            <input
              className="ps-2 pe-5 py-2 border-0 rounded-3 w-75"
              type="text"
              name="seatCapacity"
              placeholder="SeatCapacity"
              value={data.seat_Capacity}
              onChange={(e) =>
                setData({ ...data, seatCapacity: e.target.value })
              }
            />
          </div>
          <div className="d-flex justify-content-center">
            <button onClick={handleUpdate}  className="btn btn-primary w-25 mt-4 fw-bold">
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateTable;
