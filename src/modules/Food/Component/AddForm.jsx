import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFoods } from "../Core/action";
import { storeToggleAdd } from "../Core/slice";

export default function AddForm() {
  const initialValue = {
    name: "",
    code: "",
    price: 0,
    discount: 10,
    description: "",
    food_categoryId: 0,
  };
  const { createFood } = useFoods();
  const { categories } = useSelector((state) => state.category);
  //states
  const dispatch = useDispatch();
  const [value, setValue] = useState(initialValue);
  //validation const

  const handleSubmit = (e) => {
    e.preventDefault();
    createFood(value);
    dispatch(storeToggleAdd(false))
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="add-form d-flex justify-content-center flex-column position-absolute col-9 p-3 rounded-2 ms-3"
        style={{ top: "15%", right: "10%" }}
      >
        <div class="form-group">
          <label for="inputName">Food Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Food Name"
            onChange={(e) => {
              setValue({ ...value, name: e.target.value });
            }}
          />
        </div>

        <div class="form-group">
          <label for="inputPrice">Code</label>
          {/* <input type="password" class="form-control" id="inputPassword4" placeholder="Password"> */}
          <input
            type="text"
            className="form-control"
            placeholder="Code"
            onChange={(e) => {
              setValue({ ...value, code: e.target.value });
            }}
          />
        </div>

        <div class="form-group">
          <label for="inputPrice">Price</label>
          {/* <input type="password" class="form-control" id="inputPassword4" placeholder="Password"> */}
          <input
            type="text"
            className="form-control"
            placeholder="Price"
            onChange={(e) => {
              setValue({ ...value, price: e.target.value });
            }}
          />
        </div>

        <div class="form-group">
          <label for="inputDiscount">Discount</label>
          {/* <input type="password" class="form-control" id="inputPassword4" placeholder="Password"> */}
          <input
            type="text"
            className="form-control"
            placeholder="Discount"
            onChange={(e) => {
              setValue({ ...value, discount: 0 || e.target.value });
            }}
          />
        </div>

        <div class="mb-2">
          <label class="form-label">Food Image</label>
          <input class="form-control" type="file" id="formFile"></input>
        </div>

        <div class="form-group">
          <label>Categories</label>
          <select
            id="inputState"
            class="form-control"
            onChange={(e) => {
              categories.forEach(({ id, name }) => {
                if (name === e.target.value) {
                  setValue({ ...value, food_categoryId: id });
                }
              });
            }}
          >
            <option selected disabled hidden>
              Choose...
            </option>

            {categories.map((p) => {
              return (
                <option value={p.name} key={p.name}>
                  {p.name}
                </option>
              );
            })}
          </select>
        </div>

        {/* <div class="mb-2">
          <label class="form-label">Food Image</label>
          <input
            class="form-control"
            type="file"
            id="formFile"
            onChange={(e) => {
              setImageFile(e.target.files[0]);
            }}
          ></input>
        </div> */}

        <div class="form-group">
          <label for="inputDesc">Description</label>
          <input
            type="text"
            className="form-control"
            placeholder="Description"
            onChange={(e) => {
              setValue({ ...value, description: e.target.value });
            }}
          />
        </div>

        {/**btn submit */}
        <div class="col-12 mt-1">
          <button type="submit" class="btn btn-primary">
            Submit form
          </button>
        </div>
      </form>
    </>
  );
}
