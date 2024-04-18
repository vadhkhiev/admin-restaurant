import React from "react";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { IoCloseCircleOutline } from "react-icons/io5";

const CreateTable = ({ Create, refresh, setRefresh, setCreate}) => {
  const [values, setValues] = useState({
    id: "",
    name: "",
    status: [{}],
    seat_Capacity: "",
  });
  const options = [
    {value:"Booked"},
    {value:"Available"},
  ]
  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");

  const handleCreate = (e) => {
    e.preventDefault();
    axios
      .post("/api/tables", values)
      .then((res) => {
        console.log(res);
        setRefresh(!refresh);
        setCreate(false);
      })
      .catch((err) => console.log(err));
  };
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
            onClick={Create}
            className="fs-3 text-danger mb-3 me-2"
          />{" "}
          <br />
          <div className="">
            <label className="fs-4 w-25 " htmlFor="">
              Name:{" "}
            </label>
            <input
              className="ps-2 pe-5 py-2 border-0 rounded-3 w-75"
              type="text"
              name="name"
              placeholder="Table Name"
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
            <br /> <br />
            <label className="fs-4 w-25 "  htmlFor="">Status:</label>
            <select className="ps-2 pe-5 py-2 border-0 rounded-3 w-75" name="status" id="" onChange={(e) => setValues({ ...values, status: e.target.value })}>
              <option value="">Choose Status</option>
              {options.map((option,index) => (
                <option value={option.value} key={index}>{option.value}</option>
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
              onChange={(e) =>
                setValues({ ...values, seat_Capacity: e.target.value })
              }
            />
          </div>
          <div className="d-flex justify-content-center">
            <button onClick={handleCreate} className="btn btn-primary w-25 mt-4 fw-bold">
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTable;
