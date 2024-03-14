import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export default function AddForm() {
  //state
  const listCategories = useSelector(
    (state) => state.allCategory.listCategories
  );
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState(0);
  const [foodCategory, setFoodCategory] = useState("");
  const [foodDescription, setFoodDescription] = useState("");
  //end state

  let categoryName = [];
  listCategories.map(({ name }) => {
    categoryName.push(name);
  });

  useEffect(() => {
    console.log(foodName + " - " + foodPrice);
  }, [foodName, foodPrice, foodDescription, foodCategory]);
  return (
    <>
      <form
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
              setFoodName(e.target.value);
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
              setFoodPrice(e.target.value);
            }}
          />
        </div>

        <div class="form-group">
          <label for="inputState">Categories</label>
          <select
            id="inputState"
            class="form-control"
            onChange={(e) => {
              setFoodCategory(e.target.value);
            }}
          >
            <option selected disabled hidden>
              Choose...
            </option>
            {categoryName.map((p) => {
              return <option value={p}>{p}</option>;
            })}
          </select>
        </div>

        <div class="mb-2">
          <label for="formFile" class="form-label">
            Food Image
          </label>
          <input class="form-control" type="file" id="formFile"></input>
        </div>

        <div class="form-group">
          <label for="inputDesc">Description</label>
          <input
            type="text"
            className="form-control"
            placeholder="Description"
            onChange={(e) => {
              setFoodDescription(e.target.value);
            }}
          />
        </div>

        <div class="col-12 mt-1">
          <button class="btn btn-primary" type="submit">
            Submit form
          </button>
        </div>
      </form>
    </>
  );
}
