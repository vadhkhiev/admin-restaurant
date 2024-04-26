import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Select from "react-select";
import {useFoods} from "../Core/action";
import {useCategories} from "../../categories/core/action";
import {SlCloudUpload} from "react-icons/sl";
import { storeToggleAdd} from "../Core/slice";
import FoodCard from "./FoodCard";
import AddForm from "./AddForm";
import EditFoodForm from "./EditFoodForm";
import LoadingFoodCard from "./LoadingFoodCard";
import ActionCategories from "../../categories/components/ActionCategories";
import ViewFoodCard from "./ViewFoodCard";
import AddCategoriesFood from "../../categories/components/AddCategoriesFood";
import EditCategoriesFood from "../../categories/components/EditCategoriesFood";
import DeleteCategoriesFood from "../../categories/components/DeleteCategoriesFood";
import {UploadImageForm} from "./UploadImageForm";
import FoodPagination from "./foodPagination";
import Filter from "../../utils/components/Filter";
import Reset from "../../utils/components/Reset";
import {MdRefresh} from "react-icons/md";
import {FaRegCircleXmark} from "react-icons/fa6";
import {FaRegPlusSquare} from "react-icons/fa";

function FoodParent() {
    const [loading, setLoading] = useState(true);
    const [optionForSelect, setOptionForSelect] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState(null);
    const dispatch = useDispatch();

    //* Refactored
    const {foodList, params, paging, toggleView, toggleEdit, toggleAdd, toggleUploadImage} = useSelector(
        (state) => state.foodList
    );
    const {
        categories,
        toggleEditCategory,
        toggleAddCategory,
        toggleDeleteCategory,
    } = useSelector((state) => state.category);
    const {fetchList, filterByCategory, filterByPopular, handleFilter} = useFoods();
    const {fetchCategories} = useCategories();

    //* function to create a select object
    const categoriesOptions = () => {
        const initialState = [{value: "popular", label: "Popular"}];
        categories.forEach((item) => {
            initialState.push({value: item.name, label: item.name});
        });
        return initialState;
    };

    useEffect(() => {
        fetchCategories();
        fetchList();
    }, [params]);

    useEffect(() => {
        setOptionForSelect(categoriesOptions());
        if (foodList) {
            setLoading(false);
        }
    }, [foodList, categories]);

    return (
        <div className="">
            <header>
                <div
                    className=" p-2 text-center text-white border m-2 rounded-3 fw-bold"
                    style={{background: "transparent"}}
                >
                    Food List
                </div>

                <nav className="d-flex m-2   flex-wrap justify-content-between">
                    <div className="d-flex">
                        <Select
                            styles={{
                                control: (provided) => (
                                    {
                                        ...provided,
                                        width: "150px",
                                        backgroundColor: "black",
                                    }
                                )
                            }}
                            options={optionForSelect}
                            value={selectedCategories}
                            onChange={(selectedCategories) => {
                                setSelectedCategories(selectedCategories);
                                if (selectedCategories.label === "Popular") {
                                    filterByPopular()
                                } else {
                                    filterByCategory(selectedCategories.label);
                                }
                            }}
                        />
                        <ActionCategories/>
                        <Filter handleFilter={handleFilter} params={params} action={"Order"} options={["ASC", "DESC"]}/>
                        <Reset params={params} handleFilter={handleFilter}/>
                        <button className="btn custom-btn custom-border text-white px-1 ms-1" onClick={() => {
                            fetchList()
                        }}><MdRefresh/></button>
                    </div>

                    <div className="d-flex justify-content-center w-25">
                        <input
                            type="text"
                            className="bg-transparent dark:placeholder-white/50 ms-1 p-2 w-100  form-control form-input position-relative"
                            placeholder="Search anything..."
                            onChange={(e) => {
                                handleFilter("query", e.target.value)
                            }}
                        ></input>
                        <button
                            className="btn custom-btn custom-border w-fit text-white px-1 ms-1 w-auto"
                            onClick={() => {
                                dispatch(storeToggleAdd(!toggleAdd));
                            }}
                        >
                            <div className="d-flex w-100 align-items-center">
                                <FaRegPlusSquare/>
                                <p className="p-0 m-0 px-1">Food</p>
                            </div>

                        </button>
                    </div>
                </nav>
            </header>

            <main className="position-relative">
                {loading ? (
                    <>
                        <LoadingFoodCard/>
                    </>
                ) : (
                    <div className="row">
                        {foodList.map((food) => {
                            return (
                                <div className="col-6 col-lg-3 col-md-4 col-sm-6" key={food.id}>
                                    <FoodCard food={food}/>
                                </div>
                            );
                        })}
                    </div>
                )}
                {/* <FoodCard foods={foods[0]} /> */}
            </main>
            <div>{toggleAdd && <AddForm/>}</div>
            <div>{toggleEdit && <EditFoodForm/>}</div>
            <div>{toggleView && <ViewFoodCard/>}</div>
            <div>{toggleAddCategory && <AddCategoriesFood/>}</div>
            <div>{toggleEditCategory && <EditCategoriesFood/>}</div>
            <div>{toggleDeleteCategory && <DeleteCategoriesFood/>}</div>
            <div>{toggleUploadImage && <UploadImageForm/>}</div>


            <FoodPagination params={params} handleFilter={handleFilter} pagingdetails={paging}/>

        </div>
    );
}

export default FoodParent;
