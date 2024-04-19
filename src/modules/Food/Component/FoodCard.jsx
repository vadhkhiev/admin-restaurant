import React from "react";
import dummyImage from "../../../assets/img/dummy.png";
import { useDispatch, useSelector } from "react-redux";
import { storeEditToggle, storeToggleView } from "../Core/slice";
import { useFoods } from "../Core/action";
import { alertConfirm } from "../../utils/alert";

export default function FoodCard({ food }) {
  const dispatch = useDispatch();
  const { toggleView, toggleEdit } = useSelector((state) => state.foodList);
  const { onSetEditFood, deleteFood } = useFoods();

  return (
    <>
      <div className="m-2 rounded-3 bg-transparent">
        <div className="rounded-3 foodcard ">
          <img className="rounded-3 img-fluid" src={dummyImage} alt="" />
        </div>
        <div className="px-2 pb-2 pt-1">
          <h4 className="text-white">{food.name}</h4>
          <div className="d-flex  justify-content-between">
            <h6 className="text-white">Code : {food.code}</h6>
            <h6 className="text-white">Price : ${food.price}.00</h6>
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <button
                className="border rounded-3 me-1 bg-transparent"
                onClick={async () => {
                  dispatch(storeEditToggle(!toggleEdit));
                  onSetEditFood(food);
                }}
              >
                ✒️
              </button>
              <button
                className="border rounded-3 bg-transparent"
                onClick={() => {
                  onSetEditFood(food);
                  dispatch(storeToggleView(!toggleView));
                }}
              >
                👁️
              </button>
            </div>
            <button
              className="border rounded-3 bg-transparent"
              onClick={() => {
                alertConfirm().then((result) => {
                  result.value && deleteFood(food.id);
                });
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
