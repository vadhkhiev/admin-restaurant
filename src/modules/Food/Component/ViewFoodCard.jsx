import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFoods } from "../Core/action";

function ViewFoodCard() {
  const { food } = useSelector((state) => state.foodList);

  console.log(food);
  return <>Hello World</>;
}

export default ViewFoodCard;
