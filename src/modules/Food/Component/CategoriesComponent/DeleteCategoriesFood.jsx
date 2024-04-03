import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategories } from "../../Core/deleteCategories";
import getFoodCategories from "../../Core/getFoodCategories";
import {
  storeCategories,
  storeToggleAction,
} from "../../Core/allCategoriesSlice";

export default function DeleteCategoriesFood() {
  const listCategories = useSelector(
    (state) => state.allCategory.listCategories
  );
  const [categoryNames, setCategoryNames] = useState([]);
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState();
  const [selectedCategories, setSelectedCategories] = useState();
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
      <button
        className=" mt-1 btn btn-primary bg-danger border"
        onClick={() => {
          refetchCategories();
          deleteCategories(selectedCategories, token, selectedId);
          dispatch(storeToggleAction(false));
          refetchCategories();
        }}
      >
        Delete{" "}
      </button>
    </div>
  );
}
