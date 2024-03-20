import React, { useState } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const cate = useSelector((state) => state.allCategory.listCategories);
  console.log(cate);
  return <div></div>;
};

export default Home;
