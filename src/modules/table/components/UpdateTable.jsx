import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoCloseCircleOutline } from "react-icons/io5";
import useTable from "../core/action";
import { storeUpdateToggle } from "../core/reducer";

const UpdateTable = () => {
  const {updateData} = useSelector((state)=>state.tableList)
  const {updateTable} = useTable();
  const dispatch = useDispatch();
  const options = [{ value: "Booked" }, { value: "Available" }];

  const [data, setData] = useState({
    ...updateData
  });

  useEffect(() => {
   

  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    const { id, ...restData } = data; 
    const payload = {...restData };
   updateTable(payload , updateData.id); 
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
            onClick={()=>{dispatch(storeUpdateToggle(false))}}
            className="fs-3 text-danger  me-2"
          />{" "}
            <h3 className="text-white ms-2 mt-2">Update Table</h3>
          </div>
          <div className="">
            <input
              className="ps-2 pe-5 py-2 custom-border bg-transparent rounded-3 w-100 text-white"
              type="text"
              name="name"
              placeholder="Table Name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <br /> <br />
            <select
              className="form-select form-select-lg bg-transparent fw-normal text-white-50 custom-border rounded-3 w-100"
              name="status"
              id=""
              onChange={(e) => setData({ ...data, status: e.target.value })}
            >
              {options.map((option, index) => (
                <option value={option.value} key={index}>
                  {option.value}
                </option>
              ))}
            </select>
            <br />
            <input
              className="ps-2 pe-5 py-2 custom-border bg-transparent rounded-3 w-100 text-white"
              type="text"
              name="seatCapacity"
              placeholder="SeatCapacity"
              value={data.seat_Capacity}
              onChange={(e) =>
                setData({ ...data, seat_Capacity: e.target.value })
              }
            />
          </div>
          <div className="d-flex justify-content-center">
            <button onClick={handleUpdate}  className="btn custom-btn custom-border text-white w-25 mt-4 fw-bold">
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateTable;
