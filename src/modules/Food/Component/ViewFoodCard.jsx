import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
function ViewFoodCard() {
  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");

  useEffect(() => {
    console.log(token);
  }, []);
  return <div>ViewFoodCard</div>;
}

export default ViewFoodCard;
