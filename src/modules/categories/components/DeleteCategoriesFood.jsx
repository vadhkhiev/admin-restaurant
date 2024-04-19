import { useState } from "react";
import { useSelector } from "react-redux";
import { useCategories } from "../core/action";

export default function DeleteCategoriesFood() {
  const [ID, setID] = useState(null);
  const { categories } = useSelector((state) => state.category);
  const { deleteCategory } = useCategories();
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
            categories.forEach(({ name, id }) => {
              if (name === e.target.value) {
                setID(id);
              }
            });
          }}
        >
          <option value="" disabled selected hidden>
            Choose...
          </option>
          {categories.map(({ name }) => (
            <option value={name} key={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <button
        className=" mt-1 btn btn-primary bg-danger border"
        onClick={() => {
          deleteCategory(ID);
        }}
      >
        Delete{" "}
      </button>
    </div>
  );
}
