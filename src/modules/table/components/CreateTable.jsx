import React from "react";
import { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import useTable from "../core/action";
import { storeCreateToggle } from "../core/reducer";
import { useDispatch } from "react-redux";

const CreateTable = () => {
  const {createTable} = useTable();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    name: "",
    status: [{}],
    seat_Capacity: "",
  });
  const options = [
    {value:"Booked"},
    {value:"Available"},
  ]

  const handleCreate = (e) => {
    e.preventDefault();
    createTable( values );
  
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
          backgroundColor: "rgba(10,10,10, 0.35)",
          zIndex: 3,
        }}
        className="d-flex justify-content-center align-items-center"
      >
        <div
          className="p-3 border rounded"
          style={{ width: "30%", backdropFilter: "blur(10px)" }}
        >
          <div className="d-flex mb-2">
          <IoCloseCircleOutline
            style={{ cursor: "pointer" }}
            onClick={()=>{dispatch(storeCreateToggle(false))}}
            className="fs-3 text-danger  me-2"
          />{" "}
            <h3 className="text-white ms-2 mt-2">Create Table</h3>
          </div>
          <div className="">
            <input
              className="ps-2 pe-5 py-2 custom-border rounded-3 w-100 bg-transparent text-white"
              type="text"
              name="name"
              placeholder="Table Name"
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
            <br /> <br />
            <select className="ps-2 pe-5 py-2 text-white-50 custom-border rounded-3 w-100 form-select bg-transparent" name="status" id="" onChange={(e) => setValues({ ...values, status: e.target.value })}>
              <option value="">Choose Status</option>
              {options.map((option,index) => (
                <option value={option.value} key={index}>{option.value}</option>
              ))}
            </select>
            <br /> 
            <input
              className="ps-2 pe-5 py-2  custom-border rounded-3 w-100 bg-transparent text-white"
              type="text"
              name="seatCapacity"
              placeholder="SeatCapacity"
              onChange={(e) =>
                setValues({ ...values, seat_Capacity: e.target.value })
              }
            />
          </div>
          <div className="d-flex justify-content-center">
            <button onClick={handleCreate} className="btn custom-border custom-btn text-white w-25 mt-4 fw-bold">
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTable;
