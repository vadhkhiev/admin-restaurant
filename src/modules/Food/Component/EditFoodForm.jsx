import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeEditToggle } from "../Core/slice";
import { useFoods } from "../Core/action";

export default function EditForm() {
  const { food } = useSelector((state) => state.foodList);
  const { updateFood, uploadImageById } = useFoods();
  const { categories } = useSelector((state) => state.category);
  const [selectedImage,setSelectedImage] = useState(null)

  const dispatch = useDispatch();
  const initialValue = {
    name: "",
    code: "",
    foodImage: null,
    price: 0,
    discount: 10,
    description: "",
    food_categoryId: 0,
  };

  const [value, setValue] = useState({
    ...initialValue,
    ...food,
  });
  
  const { name, price, code, description } = value;

  const handleSubmit = (event) => {
    const formdata = new FormData();
    if(selectedImage){
      formdata.append("files",selectedImage)
      formdata.append("foodId", food.id)
    }
    event.preventDefault();
    updateFood(food.id, value, formdata);
    dispatch(storeEditToggle(false));
  };
  const handleOnChange = (e) =>
    setValue({ ...value, [e.target.name]: e.target.value });

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
            value={name}
            name="name"
            onChange={handleOnChange}
          />
        </div>

        <div class="form-group">
          <label for="inputPrice">New Price</label>
          {/* <input type="password" class="form-control" id="inputPassword4" placeholder="Password"> */}
          <input
            type="text"
            className="form-control"
            value={price}
            name="price"
            onChange={handleOnChange}
          />
        </div>

        <div class="form-group">
          <label for="inputCode">Code</label>
          {/* <input type="password" class="form-control" id="inputPassword4" placeholder="Password"> */}
          <input
            type="text"
            className="form-control"
            value={code}
            onChange={handleOnChange}
            name="code"
          />
        </div>

        <div class="form-group">
          <label>Categories</label>
          <select
            id="inputState"
            class="form-control"
            defaultValue={
              food.foodCategoryEntity
                ? categories.find(
                    (e) => e.name === food?.foodCategoryEntity?.name
                  )?.name
                : null
            }
            onChange={(e) => {
              categories.map((category) => {
                if (category.name === e.target.value) {
                  setValue({ ...value, food_categoryId: category.id });
                }
                return category;
              });
              // setValue({ ...value, category: e.target.value });
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

        <div class="mb-2">
          <label class="form-label">Food Image</label>
          <input class="form-control" type="file" id="formFile" onChange={(e)=>{setSelectedImage(e.target.files[0])}}></input>
        </div>

        <div class="form-group">
          <label for="inputDesc">Description</label>
          <input
            type="text"
            className="form-control"
            value={description}
            name="description"
            onChange={handleOnChange}
          />
        </div>

        <div class="col-12 mt-1">
          <button class="btn btn-primary">Submit form</button>
        </div>
      </form>
    </>
  );
}
