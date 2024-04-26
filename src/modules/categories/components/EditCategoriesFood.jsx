import React, { useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useCategories} from "../core/action";
import {storeToggleEditCategory} from "../core/slice";
import {storeToggleUploadImage} from "../../Food/Core/slice";
import {FaRegCircleXmark} from "react-icons/fa6";

export default function EditCategoriesFood() {
    const dispatch = useDispatch();
    const [ID, setID] = useState(null);
    const [payload, setPayload] = useState({name: ""});
    const {updateCategory, fetchCategories} = useCategories();
    const {categories} = useSelector((state) => state.category);
    return (
        <div className="position-absolute w-50 custom-border text-white rounded-3 top-0 p-2"
             style={{
                 marginLeft: "15%", marginTop: "10%",
                 backdropFilter: "5px",
                 background: "rgba(10,10,10, 0.35)"
             }}>
            <div>
                <button className="btn custom-btn text-white position-absolute top-0 end-0"
                        onClick={() => {
                            dispatch(storeToggleEditCategory(false))
                        }}><FaRegCircleXmark/></button>


                <label className="fw-bold mt-1">
                    Select the category you wants to make changes to.
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
                    {categories.map(({name}) => (
                        <option value={name} key={name}>
                            {name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="inputPrice fw-bold">New Categories</label>
                {/* <input type="password" class="form-control" id="inputPassword4" placeholder="Password"> */}
                <input
                    type="text"
                    className="form-control"
                    placeholder="New Categories"
                    onChange={(e) => {
                        setPayload({...payload, name: e.target.value});
                    }}
                />
            </div>

            <button
                className="mt-1 custom-btn btn text-white custom-border"
                onClick={() => {
                    updateCategory(ID, payload);
                    fetchCategories();
                    dispatch(storeToggleEditCategory(false));
                }}
            >
                Submit Changes
            </button>
        </div>
    );
}
