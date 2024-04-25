import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useCategories} from "../core/action";
import {storeCategories, storeToggleAddCategory} from "../core/slice";
import {storeToggleUploadImage} from "../../Food/Core/slice";
import {FaRegCircleXmark} from "react-icons/fa6";

export default function AddCategoriesFood() {
    //initial state
    const initCategories = {
        name: "",
    };
    const {fetchCategories, createCategories} = useCategories();
    const dispatch = useDispatch();
    //states
    const [newCategories, setNewCategories] = useState(initCategories);
    const pattern = /^(?=.*[A-Za-z\s])[A-Za-z\s]{4,}$/;
    const [validInput, setValidInput] = useState(false);

    const handleSubmit = () => {
        createCategories(newCategories);
        dispatch(storeToggleAddCategory(false));
        fetchCategories();
    };

    return (
        <>
            <div className="form-group position-absolute w-50 custom-border text-white rounded-3 top-0 p-2"
                 style={{
                     marginLeft: "15%", marginTop: "10%",
                     backdropFilter: "5px",
                     background: "rgba(10,10,10, 0.35)"
                 }}>

                <button className="btn custom-btn text-white position-absolute top-0 end-0"
                        onClick={() => {
                            dispatch(storeToggleAddCategory(false))
                        }}><FaRegCircleXmark/></button>


                <label className="fw-bold p-1">Enter The New Categories</label>
                {/* <input type="password" class="form-control" id="inputPassword4" placeholder="Password"> */}
                <input
                    type="text"
                    className="form-control"
                    placeholder="New Categories"
                    onChange={(e) => {
                        setNewCategories({name: e.target.value});
                        setValidInput(pattern.test(e.target.value));
                    }}
                />
                <div className="mt-1">
                    <p className="m-0">• Enter at least 4 letters.</p>
                    <p className="m-0">• Only alphabet allows.</p>
                    <p className="m-0">• Enter a valid name.</p>
                </div>
                {validInput ? (
                    <button
                        className=" mt-1 btn custom-btn custom-border"
                        onClick={() => {
                            handleSubmit();
                        }}
                    >
                        Submit form
                    </button>
                ) : (
                    <button disabled className="mt-1 btn custom-btn custom-border">
                        Submit Form
                    </button>
                )}
            </div>
        </>
    )
        ;
}
