import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';

const CreateTable = () => {
    const [values, setValues] = useState({
    id: "",
    name: "",
    status: "",
    seatCapacity: "",
  });
  const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');
  const [modal,setModal] = useState(false);
  // function toggleModal (){
  //   setModal(!modal)
  // }


  const handleCreate = (e) => {
    e.preventDefault();
    axios
      .post("/api/table", values, {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setModal(false)
      })
      .catch((err) => console.log(err));
    }
  return (
    <>
        <div className='d-flex justify-content-center'>
            <div className='border border-dark w-25 rounded-2 z-1 position-absolute'>
              <label htmlFor="">Name: </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={(e) => setValues({ ...values, name: e.target.value })}
              />
              <br /> <br />
              <label htmlFor="">Status: </label>
              <input
                type="text"
                name="status"
                placeholder="Status"
                onChange={(e) => setValues({ ...values, status: e.target.value })}
              />
              <br /> <br />
              <label htmlFor="">SeatCapacity: </label>
              <input
                type="text"
                name="seatCapacity"
                placeholder="SeatCapacity"
                onChange={(e) => setValues({ ...values, seatCapacity: e.target.value })}
              />
              <br /> <br />
              <div className="d-flex gap-2">
                <button className="btn btn-primary" onClick={handleCreate}>
                  Create
                </button>
                {/* <button className="btn btn-danger" onClick={toggleModal}>Back</button> */}
              </div>
            </div>
        </div>
    </>
  )
}

export default CreateTable;
