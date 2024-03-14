import React, { useEffect, useState } from "react";
import dummyImage from "../../../assets/img/dummy.png";
export default function FoodCard({ food }) {
  return (
    <>
      <div
        className="m-2 rounded-3 px-2 pt-1 "
        style={{ background: "#6b728e" }}
      >
        <div className="rounded-3 foodcard ">
          <img className="rounded-3 img-fluid" src={dummyImage} alt="" />
        </div>
        <div className="px-1 pb-2 pt-1 text-white">
          <h4 className="text-white">{food.name}</h4>
          <div className="d-flex justify-content-between">
            <h5 className="text-white">Code : {food.id}</h5>
            <h5 className="text-white">Price : ${food.price}.00</h5>
          </div>
          <div className="d-flex justify-content-between">
            <button className="border rounded-3">Edit</button>
            <button className="border rounded-3">Remove</button>
          </div>
        </div>
      </div>
    </>
  );
}
