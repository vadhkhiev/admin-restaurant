import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFood, createUser } from "../Core/createFood";
import getAllFood from "../Core/getAllFood";
import { storeFood } from "../Core/allFoodSlice";
import { updateFood } from "../Core/updateFood";
import { storeEditToggle } from "../Core/allFoodSlice";

export default function AddForm() {
  const dispatch = useDispatch();

  const toggleEdit = useSelector((state) => state.foodList.toggleEdit);

  //states
  const listCategories = useSelector(
    (state) => state.allCategory.listCategories
  );

  const token = useSelector(
    (state) => state.auth.token || localStorage.getItem("token")
  );

  const refetchFood = async () => {
    try {
      const result = await getAllFood(token);
      dispatch(storeFood(result.data));
    } catch (error) {}
  };

  const Food = async (value, token) => {
    try {
      const result = await createFood(value, token);
      refetchFood();
    } catch {}
  };

  const initialValue = {
    name: "",
    code: "",
    price: 0,
    discount: 10,
    description: "",
    categoryId: 0,
    foodImage: "x",
  };
  const [value, setValue] = useState(initialValue);
  //end state

  let categoryName = [];
  listCategories.map(({ name }) => {
    categoryName.push(name);
  });

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="add-form d-flex justify-content-center flex-column position-absolute col-9 p-3 rounded-2 ms-3"
        style={{ top: "15%", right: "10%" }}
      >
        <button
          className="border position-absolute top-0 end-0 bg-whit fw-bold rounded-3 mt-1 me-3"
          onClick={() => {
            dispatch(storeEditToggle(false));
          }}
        >
          X
        </button>
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
          <label for="inputPrice">Price</label>
          {/* <input type="password" class="form-control" id="inputPassword4" placeholder="Password"> */}
          <input
            type="text"
            className="form-control"
            placeholder="Price"
            onChange={(e) => {
              setValue({ ...value, price: parseInt(e.target.value) });
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
          <label>Categories</label>
          <select
            id="inputState"
            class="form-control"
            onChange={(e) => {
              listCategories.map(({ id, name }) => {
                if (name === e.target.value) {
                  setValue({ ...value, categoryId: id });
                }
              });
              // setValue({ ...value, category: e.target.value });
            }}
          >
            <option selected disabled hidden>
              Choose...
            </option>
            {categoryName.map((p) => {
              return (
                <option value={p} key={p}>
                  {p}
                </option>
              );
            })}
          </select>
        </div>

        <div class="mb-2">
          <label class="form-label">Food Image</label>
          <input class="form-control" type="file" id="formFile"></input>
        </div>

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

        <div class="col-12 mt-1">
          <button
            class="btn btn-primary"
            onClick={() => {
              updateFood(value, token);
            }}
          >
            Submit form
          </button>
        </div>
      </form>
    </>
  );
}
