import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getFoodById from "../core/getFoodById";
import { storeToggleView } from "../core/slice";

function ViewFoodCard() {
  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");
  const idEdit = useSelector((state) => state.foodList.idEdit);
  const [viewFood, setViewFood] = useState({});
  const dispatch = useDispatch();
  const getEditingFood = async () => {
    try {
      const result = await getFoodById(token, idEdit);
      return result.data;
    } catch {}
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const viewFoodCore = await getEditingFood();
        setViewFood(viewFoodCore);
        console.log(viewFood);
      } catch {}
    };
    fetchData();
  }, [idEdit]);
  return (
    <div
      className="position-absolute top-0 background-view w-50"
      style={{ marginTop: "250px", marginLeft: "200px" }}
    >
      <button
        onClick={() => {
          dispatch(storeToggleView(false));
        }}
      >
        ❌
      </button>
      <h5>{viewFood.name}</h5>
    </div>
  );
}

export default ViewFoodCard;
