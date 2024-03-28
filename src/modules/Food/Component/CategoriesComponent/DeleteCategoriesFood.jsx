import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function DeleteCategoriesFood() {
  const listCategories = useSelector(
    (state) => state.allCategory.listCategories
  );
  let categoryName = [];

  const getCategoryName = () => {
    listCategories.map(({ name }) => {
      categoryName.push(name);
    });
  };

  useEffect(() => {
    getCategoryName();
    console.log(categoryName);
    categoryName.map((p) => {
      console.log(p);
    });
  }, [listCategories]);

  return (
    <div>
      <div class="form-group">
        <label className="fw-bold mt-1">
          Select The Categories You Want To Delete
        </label>
        <select id="inputState" class="form-control">
          <option selected disabled hidden>
            Choose...
          </option>

          <div>{categoryName}</div>
        </select>
      </div>
    </div>
  );
}
