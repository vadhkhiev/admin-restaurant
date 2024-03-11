import React, { useEffect, useState } from "react";
import dummyImage from "../../../assets/img/dummy.png";
import { useSelector } from "react-redux";
export default function FoodCard({ food }) {
  return (
    <div className="m-2 rounded-3" style={{ background: "#FEC260" }}>
      <div className="rounded-3 foodcard">
        <img className="rounded-3 img-fluid" src={dummyImage} alt="" />
      </div>
      <div className="px-1 pb-2 pt-1">
        <h4>{food.name}</h4>
        <div className="d-flex justify-content-between">
          <h5>Code : {food.id}</h5>
          <h5>Price : ${food.price}.00</h5>
        </div>
        {console.log(food + "foodcard")}
        <button className="border rounded-4">View More</button>
      </div>
    </div>
  );
}
