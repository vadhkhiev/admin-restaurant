import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategories } from "../../Core/deleteCategories";
import getFoodCategories from "../../Core/getFoodCategories";
import {
  storeCategories,
  storeToggleAction,
} from "../../Core/allCategoriesSlice";
import { editCategory } from "../../Core/editCategory";

export default function EditCategoriesFood() {
  const listCategories = useSelector(
    (state) => state.allCategory.listCategories
  );
  const initNewCategory = { name: "" };
  const [categoryNames, setCategoryNames] = useState([]);
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState();
  const [selectedCategories, setSelectedCategories] = useState();
  const [newCategory, setNewCategories] = useState(initNewCategory);
  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");

  const refetchCategories = async () => {
    try {
      const result = await getFoodCategories(token);
      dispatch(storeCategories(result.data));
    } catch (error) {}
  };

  useEffect(() => {
    const getCategoryNames = () => {
      const names = listCategories.map((category) => category.name);
      setCategoryNames(names);
    };
    refetchCategories();
    getCategoryNames();
  }, [listCategories]);

  return (
    <div>
      <div className="form-group">
        <label className="fw-bold mt-1">
          Select The Categories You Want To Delete
        </label>

        <select
          id="inputState"
          className="form-control"
          onChange={(e) => {
            setSelectedCategories(e.target.value);
            listCategories.forEach(({ name, id }) => {
              if (name === e.target.value) {
                setSelectedId(id);
              }
            });
          }}
        >
          <option value="" disabled selected hidden>
            Choose...
          </option>
          {categoryNames.map((name) => (
            <option value={name} key={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label for="inputPrice fw-bold">New Categories</label>
        {/* <input type="password" class="form-control" id="inputPassword4" placeholder="Password"> */}
        <input
          type="text"
          className="form-control"
          placeholder="New Categories"
          onChange={(e) => {
            setNewCategories({ ...newCategory, name: e.target.value });
          }}
        />
      </div>

      <button
        className=" mt-1 btn btn-primary"
        onClick={() => {
          refetchCategories();
          editCategory(newCategory, selectedCategories, selectedId, token);
          dispatch(storeToggleAction(false));
          refetchCategories();
        }}
      >
        Submit Changes
      </button>
    </div>
  );
}
