import React from "react";
import dummyImage from "../../../assets/img/dummy.png";
export default function FoodCard() {
  const defaultValue = {
    id: 1,
    code: "001",
    title: "Fried Noodle",
    price: 500,
    foodCategories: "Khmer Food",
  };
  return (
    <div className="m-2 rounded-3" style={{ background: "#FEC260" }}>
      <div className="rounded-3 foodcard">
        <img
          className="rounded-3 img-fluid"
          src={dummyImage}
          alt=""
        />
      </div>
      <div className="px-1 pb-2 pt-1">
        <h4>{defaultValue.title}</h4>
        <div className="d-flex justify-content-between">
          <h5>Code : {defaultValue.code}</h5>
          <h5>Price : ${defaultValue.price / 100}.00</h5>
        </div>
        <button className="border rounded-4">View More</button>
      </div>
    </div>
  );
}
