import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFood, createUser } from "../Core/createFood";
import getAllFood from "../Core/getAllFood";
import { storeFood } from "../Core/allFoodSlice";
import { postImage } from "../Core/postImage";
export default function AddForm({ toggle, toggleForm }) {
  const dispatch = useDispatch();
  const fetchfoodList = useSelector((state) => state.foodList.foodList);

  //states
  const listCategories = useSelector(
    (state) => state.allCategory.listCategories
  );
  const token = useSelector(
    (state) => state.auth.token || localStorage.getItem("token")
  );

  let categoryName = [];

  //validation const
  const validationObj = {
    name: /^[a-zA-Z\s]{1,20}$/,
    price: /^[1,9]{1,3}$/,
    code: /^[a-zA-Z1-9]{1,6}$/,
    description: /^[a-zA-Z1-9\s]{1,20}$/,
  };

  const [submitable, setSubmitable] = useState(false);

  const initialValue = {
    name: "",
    code: "",
    price: 0,
    discount: 10,
    description: "",
    food_categoryId: 0,
  };
  const [value, setValue] = useState(initialValue);
  const [imageFile, setImageFile] = useState(null);
  //end state

  const sendFood = async (value, token) => {
    try {
      refetchFood();
      const result = await createFood(value, token);
      console.log(value);
      refetchFood();
    } catch {}
  };

  const refetchFood = async () => {
    try {
      const result = await getAllFood(token);
      dispatch(storeFood(result.data));
    } catch (error) {}
  };

  listCategories.map(({ name }) => {
    categoryName.push(name);
  });

  const sendDataToParent = () => {
    toggle.sendDataToParent(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    sendDataToParent();
    sendFood(value, token);
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
          <label for="inputDiscount">Discount</label>
          {/* <input type="password" class="form-control" id="inputPassword4" placeholder="Password"> */}
          <input
            type="text"
            className="form-control"
            placeholder="Discount"
            onChange={(e) => {
              setValue({ ...value, discount: e.target.value });
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
                  setValue({ ...value, food_categoryId: id });
                }
              });
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
          {!submitable ? (
            <button
              type="submit"
              class="btn btn-primary"
              onClick={() => {
                toggle.sendDataToParent(!toggleForm);
              }}
            >
              Submit form
            </button>
          ) : (
            <div>
              <h6 className="text-danger fw-bold position-absolute top-0 end-0  me-4 my-2 bg-white p-1">
                PLEASE CHECK THE INFORMATION ENTERED !!!
              </h6>
              <button
                disabled
                class="btn btn-primary"
                onClick={() => {
                  toggle.sendDataToParent(!toggleForm);
                }}
              >
                Submit form
              </button>
            </div>
          )}
        </div>
      </form>
    </>
  );
}
