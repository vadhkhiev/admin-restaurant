import React, { useEffect, useState } from "react";
import dummyImage from "../../../assets/img/dummy.png";
import { deleteFood } from "../Core/deleteFood";
import getAllFood from "../Core/getAllFood";
import { useDispatch, useSelector } from "react-redux";
import { storeFood, storeIdEdit, storeToggleView } from "../Core/allFoodSlice";
import { storeEditToggle } from "../Core/allFoodSlice";
import getFoodById from "../Core/getFoodById";

export default function FoodCard({ food }) {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const viewId = useSelector((state) => state.foodList.idEdit);
  const toggleView = useSelector((state) => state.foodList.toggleView);
  const toggleEdit = useSelector((state) => state.foodList.toggleEdit);
  const idEdit = useSelector((state) => state.foodList.idEdit);
  const refetchFood = async () => {
    try {
      const result = await getAllFood(token);
      dispatch(storeFood(result.data));
    } catch (error) {}
  };

  return (
    <>
      <div className="m-2 rounded-3" style={{ background: "#98a3b7" }}>
        <div className="rounded-3 foodcard ">
          <img className="rounded-3 img-fluid" src={dummyImage} alt="" />
        </div>
        <div className="px-2 pb-2 pt-1">
          <h4 className="text-dark">{food.name}</h4>
          <div className="d-flex  justify-content-between">
            <h6 className="text-dark">Code : {food.code}</h6>
            <h6 className="text-dark">Price : ${food.price}.00</h6>
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <button
                className="border rounded-3 me-1 bg-transparent"
                onClick={async () => {
                  dispatch(storeEditToggle(true));
                  dispatch(storeIdEdit(food.id));
                  const x = await getFoodById(token, food.id);
                }}
              >
                ✒️
              </button>
              <button
                className="border rounded-3 bg-transparent"
                onClick={() => {
                  dispatch(storeIdEdit(food.id));
                  dispatch(storeToggleView(true));
                }}
              >
                👁️
              </button>
            </div>
            <button
              className="border rounded-3 bg-transparent"
              onClick={() => {
                refetchFood();
                deleteFood(token, food.id);
                refetchFood();
              }}
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
