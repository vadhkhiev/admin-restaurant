import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFood, createUser } from "../Core/createFood";
import getAllFood from "../Core/getAllFood";
import { storeFood } from "../Core/allFoodSlice";
import { updateFood } from "../Core/updateFood";
import { storeEditToggle } from "../Core/allFoodSlice";
import getFoodById from "../Core/getFoodById";
import { editCategory } from "../Core/editCategory";

export default function EditForm() {
  const dispatch = useDispatch();

  //   {
  //     "name":"Han",
  //     "code": "C0090",
  //     "foodImage": null,
  //     "price": 10,
  //     "discount": 10,
  //     "description":"Personally, I think Peking duck is the best way to eat duck",
  //     "food_categoryId": 31
  // }
  const initialValue = {
    name: "",
    code: "",
    foodImage: null,
    price: 0,
    discount: 10,
    description: "",
    food_categoryId: 0,
  };

  //states
  const editId = useSelector((state) => state.foodList.idEdit);
  const toggleEdit = useSelector((state) => state.foodList.toggleEdit);
  const [oldFood, setOldFood] = useState({});
  const [value, setValue] = useState(initialValue);
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
  const getEditingFood = async () => {
    try {
      const result = await getFoodById(token, editId);
      return result.data;
    } catch {}
  };

  const Food = async (value, token) => {
    try {
      const result = await createFood(value, token);
      refetchFood();
    } catch {}
  };
  //end state

  let categoryName = [];
  listCategories.map(({ name }) => {
    categoryName.push(name);
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    updateFood(editId, value, token);
    dispatch(storeEditToggle(false));
    Food();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const editingFood = await getEditingFood();
        setOldFood(editingFood);
      } catch (error) {
        console.error("Error fetching editing food:", error);
      }
    };
    fetchData();
  }, [editId]);

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
        <div className="form-group">
          <label for="inputName">Enter The New Food Name</label>
          <input
            type="text"
            className="form-control"
            placeholder={oldFood ? oldFood.name : "Old Food"}
            onChange={(e) => {
              setValue({ ...value, name: e.target.value });
            }}
          />
        </div>

        <div class="form-group">
          <label for="inputPrice">New Price</label>
          {/* <input type="password" class="form-control" id="inputPassword4" placeholder="Password"> */}
          <input
            type="text"
            className="form-control"
            placeholder={oldFood ? `$ ${oldFood.price}.00` : "old price"}
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
            placeholder={oldFood ? oldFood.code : "Old Code"}
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
                  setValue({ ...value, food_categoryId: id });
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
            placeholder={oldFood ? oldFood.description : "Description"}
            onChange={(e) => {
              setValue({ ...value, description: e.target.value });
            }}
          />
        </div>

        <div class="col-12 mt-1">
          <button class="btn btn-primary">Submit form</button>
        </div>
      </form>
    </>
  );
}
