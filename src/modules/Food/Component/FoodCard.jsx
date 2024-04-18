import React from "react";
import dummyImage from "../../../assets/img/dummy.png";
import { useDispatch } from "react-redux";
import { storeEditToggle, storeIdEdit, storeToggleView } from "../Core/slice";
import { useFoods } from "../Core/action";
import { alertConfirm } from "../../utils/alert";

export default function FoodCard({ food }) {
  const dispatch = useDispatch();

  const { onSetEditFood, deleteFood } = useFoods();

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
                  onSetEditFood(food);
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
