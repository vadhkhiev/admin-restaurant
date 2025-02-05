import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {storeEditToggle} from "../Core/slice";
import {useFoods} from "../Core/action";
import {FaRegCircleXmark} from "react-icons/fa6";

export default function EditForm() {
    const {food} = useSelector((state) => state.foodList);
    const {updateFood} = useFoods();
    const {categories} = useSelector((state) => state.category);

    const dispatch = useDispatch();
    const initialValue = {
        name: "",
        code: "",
        foodImage: null,
        price: 0,
        discount: null,
        description: "",
        food_categoryId: 0,
        foodCategoryEntity : {}
    };

    const [value, setValue] = useState({
        ...initialValue,
        ...food,
    });

    const {name, price, code, description, discount} = value;

    const handleSubmit = (event) => {
        event.preventDefault();
        updateFood(food.id, value);
        dispatch(storeEditToggle(false));
    };
    const handleOnChange = (e) =>
        setValue({...value, [e.target.name]: e.target.value});


    //* handle if the use want to stay in the same category since backend only provide name in the foodCategoryEntity "object"
    useEffect(() => {
        categories.forEach((category) => {
            if (value.foodCategoryEntity.name === category.name) {
                setValue({...value, food_categoryId: category.id})
            }
        });
    }, []);

    return (
        <>
            <div className="d-flex justify-content-center align-items-center custom-background-modal">
            <form
                onSubmit={handleSubmit}
                className="form-group position-absolute w-50 custom-border text-white rounded-3 top-0 p-2"
                style={{
                    marginLeft: "15%", marginTop: "10%",
                    backdropFilter: "5px",
                    background: "rgba(10,10,10, 0.35)"
                }}
            >
                <button
                    className="custom-border custom-btn btn position-absolute top-0 end-0 text-white fw-bold rounded-3 mt-1 me-3"
                    onClick={() => {
                        dispatch(storeEditToggle(false));
                    }}
                >
                    <FaRegCircleXmark/>
                </button>

                <h3 className="text-white text-center ">EDIT FOOD INFORMATION</h3>

                <div className="form-group">
                    <label htmlFor="inputCode">Code</label>
                    {/* <input type="password" class="form-control" id="inputPassword4" placeholder="Password"> */}
                    <input
                        type="text"
                        className="form-control"
                        value={code}
                        onChange={handleOnChange}
                        name="code"
                    />
                </div>


                <div className="form-group">
                    <label htmlFor="inputName">Enter The New Food Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        name="name"
                        onChange={handleOnChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="inputPrice">New Price</label>
                    {/* <input type="password" class="form-control" id="inputPassword4" placeholder="Password"> */}
                    <input
                        type="text"
                        className="form-control"
                        value={price}
                        name="price"
                        onChange={handleOnChange}
                    />
                </div>


                <div className="form-group">
                    <label htmlFor="inputDiscount">New Discount</label>
                    <input
                        type="text"
                        className="form-control"
                        value={discount}
                        name="discount"
                        onChange={handleOnChange}
                    />
                </div>


                <div className="form-group">
                    <label>Categories</label>
                    <select
                        id="inputState"
                        className="form-control"
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
                                    setValue({...value, food_categoryId: category.id});
                                }
                                return category;
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

                <div className="form-group">
                    <label htmlFor="inputDesc">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        value={description}
                        name="description"
                        onChange={handleOnChange}
                    />
                </div>

                <div className="col-12 mt-1">
                    <button className="btn custom-btn custom-border">Submit form</button>
                </div>
            </form>
            </div>
        </>
    );
}
