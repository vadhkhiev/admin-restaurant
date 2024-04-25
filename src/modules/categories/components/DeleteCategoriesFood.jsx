import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useCategories} from "../core/action";
import {storeToggleDeleteCategory} from "../core/slice";
import {FaRegCircleXmark} from "react-icons/fa6";

export default function DeleteCategoriesFood() {
    const [ID, setID] = useState(null);
    const {categories} = useSelector((state) => state.category);
    const dispatch = useDispatch()
    const {deleteCategory} = useCategories();
    return (
        <div className="form-group position-absolute w-50 custom-border text-white rounded-3 top-0 p-2"
             style={{
                 marginLeft: "15%", marginTop: "10%",
                 backdropFilter: "5px",
                 background: "rgba(10,10,10, 0.35)"
             }}>
            <div>
                <button className="btn custom-btn text-white position-absolute top-0 end-0"
                        onClick={() => {
                            dispatch(storeToggleDeleteCategory(false))
                        }}><FaRegCircleXmark/></button>


                <label className="fw-bold mt-1">
                    Select The Categories You Want To Delete
                </label>
                <select
                    id="inputState"
                    className="form-control"
                    onChange={(e) => {
                        categories.forEach(({name, id}) => {
                            if (name === e.target.value) {
                                setID(id);
                            }
                        });
                    }}
                >
                    <option value="" disabled selected hidden>
                        Choose...
                    </option>
                    {categories.map(({name}) => (<option value={name} key={name}>
                        {name}
                    </option>))}
                </select>
            </div>
            <button
                className=" mt-1 btn custom-btn custom-border"
                onClick={() => {
                    deleteCategory(ID);
                    dispatch(storeToggleDeleteCategory(false));
                }}
            >
            Delete
            </button>
        </div>);
}
