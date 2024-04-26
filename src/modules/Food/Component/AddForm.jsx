import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useFoods} from "../Core/action";
import {storeToggleAdd} from "../Core/slice";
import {FaRegCircleXmark} from "react-icons/fa6";

export default function AddForm() {
    const initialValue = {
        name: "",
        code: "",
        price: 0,
        discount: 10,
        description: "",
        food_categoryId: 0,
    };
    const {createFood} = useFoods();
    const {categories} = useSelector((state) => state.category);
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

                    <div className="form-group">
                        <div className="d-flex justify-content-between pb-1">
                            <label htmlFor="inputName">Food Name</label>
                            <button className="btn custom-btn custom-border text-white "
                                    onClick={(e) => {
                                        e.preventDefault()
                                        dispatch(storeToggleAdd(false))
                                    }}><FaRegCircleXmark/></button>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Food Name"
                            onChange={(e) => {
                                setValue({...value, name: e.target.value});
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputPrice">Code</label>
                        {/* <input type="password" class="form-control" id="inputPassword4" placeholder="Password"> */}
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Code"
                            onChange={(e) => {
                                setValue({...value, code: e.target.value});
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputPrice">Price</label>
                        {/* <input type="password" class="form-control" id="inputPassword4" placeholder="Password"> */}
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Price"
                            onChange={(e) => {
                                setValue({...value, price: e.target.value});
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputDiscount">Discount</label>
                        {/* <input type="password" class="form-control" id="inputPassword4" placeholder="Password"> */}
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Discount"
                            onChange={(e) => {
                                setValue({...value, discount: 0 || e.target.value});
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label>Categories</label>
                        <select
                            id="inputState"
                            className="form-control"
                            onChange={(e) => {
                                categories.forEach(({id, name}) => {
                                    if (name === e.target.value) {
                                        setValue({...value, food_categoryId: id});
                                    }
                                });
                            }}
                        >
                            <option selected disabled hidden>
                                Choose...
                            </option>

                            {categories.map((p) => {
                                return (
                                    <option defaultValue={p.name} key={p.name}>
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
                            placeholder="Description"
                            onChange={(e) => {
                                setValue({...value, description: e.target.value});
                            }}
                        />
                    </div>
                    {/**btn submit */}
                    <div className="col-12 mt-1">
                        <button type="submit" className="custom-btn custom-border btn">
                            Submit form
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
