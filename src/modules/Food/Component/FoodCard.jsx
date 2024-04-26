import React from "react";
import dummyImage from "../../../assets/img/dummy.png";
import {useDispatch, useSelector} from "react-redux";
import {storeEditToggle, storeSelectedID, storeToggleUploadImage, storeToggleView} from "../Core/slice";
import {useFoods} from "../Core/action";
import {alertConfirm} from "../../utils/alert";
import {FaRegEdit, FaRegEye} from "react-icons/fa";
import { FaRegTrashCan} from "react-icons/fa6";
import {SlCloudUpload} from "react-icons/sl";

export default function FoodCard({food}) {
    const dispatch = useDispatch();
    const {toggleView, toggleEdit} = useSelector((state) => state.foodList);
    const {onSetEditFood, deleteFood} = useFoods();
    const {foodImage} = food;

    return (
        <>
            <div className="m-2 rounded-3 bg-transparent d-flex justify-content-center position-relative flex-column">
                <div className="rounded-3 overflow-hidden" style={{height: "200px"}}>
                    <img
                        className="rounded-3 w-100"
                        src={foodImage || dummyImage}
                        alt=""
                    />
                </div>
                <div className="position-absolute text-white fw-bolder cursor-pointer top-0 end-0 mt-1 me-1" onClick={() => {
                    dispatch(storeSelectedID(food.id));
                    dispatch(storeToggleUploadImage(true));
                }}>
                    <SlCloudUpload/>
                </div>

                <div className="px-2 pb-2 pt-1 h-50">
                    <h4 className="text-white">{food.name}</h4>
                    <div className="d-flex  justify-content-between">
                        <h6 className="text-white">Code : {food.code}</h6>
                        <h6 className="text-white">Price : ${food.price}.00</h6>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div>
                            <button
                                className="text-white border-0 pb-1 rounded-3 me-1 bg-transparent"
                                onClick={async () => {
                                    dispatch(storeEditToggle(!toggleEdit));
                                    onSetEditFood(food);
                                }}
                            >
                                <FaRegEdit/>
                            </button>
                            <button
                                className="text-white pb-1 border-0 rounded-3 bg-transparent"
                                onClick={() => {
                                    onSetEditFood(food);
                                    dispatch(storeToggleView(!toggleView));
                                }}
                            >
                                <FaRegEye/>
                            </button>
                        </div>
                        <button
                            className="border-0 text-white pb-1 rounded-3 bg-transparent"
                            onClick={() => {
                                alertConfirm().then((result) => {
                                    result.value && deleteFood(food.id);
                                });
                            }}
                        >
                            <FaRegTrashCan/>️
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
