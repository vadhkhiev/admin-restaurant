import React, { useEffect, useState } from "react";
import getFoodCategories from "./Core/getFoodCategories";
import { useSelector } from "react-redux";
import FoodCard from "./Component/FoodCard";

function YourComponent() {
  const [listCategories, setListCategories] = useState([]);

  const tokens = useSelector((state) => state.auth.token);
  const token = localStorage.getItem("token") || tokens;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getFoodCategories(token);
        setListCategories(result.data);
      } catch (error) {
        console.error("Error in component:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <header>
        <div
          className=" p-2 text-center text-white m-2 rounded-3 fw-bold"
          style={{ background: "#6c738f" }}
        >
          Food List
        </div>
        <nav className="d-flex col justify-content-between m-2">
          {listCategories.map(({ name, id }) => {
            return (
              <button
                key={id}
                style={{ background: "#6b728e" }}
                className="text-center col-2 border rounded-3"
              >
                <h5 className="text-white">{name}</h5>
              </button>
            );
          })}
        </nav>
      </header>

      <main className="d-flex flex-wrap justify-content-between">
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
        <FoodCard />
      </main>

      <footer></footer>
    </>
  );
}

export default YourComponent;
