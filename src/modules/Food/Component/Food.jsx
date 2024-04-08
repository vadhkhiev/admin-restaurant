import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FoodCard from "./FoodCard";
import { IoIosAddCircle } from "react-icons/io";
import AddForm from "./AddForm";
import EditFoodForm from "./EditFoodForm";
import LoadingFoodCard from "./LoadingFoodCard";
import ActionCategories from "./ActionCategories";
import { storeToggleAction } from "../Core/allCategoriesSlice";
import searchFoodByName from "../Core/searchFood";
import ViewFoodCard from "./ViewFoodCard";
import { useFoods } from "../Core/action";

function YourComponent() {
    const listFood = useSelector((state) => state.foodList.foodList);
    const [foods, setFoods] = useState([]);
    const listCategories = useSelector(
        (state) => state.allCategory.listCategories
    );
    const token =
        useSelector((state) => state.auth.token) || localStorage.getItem("token");
    const [selectedCategories, setSelectedCategories] = useState("");
    const [toggleForm, setToggleForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const toggleView = useSelector((state) => state.foodList.toggleView);
    const toggleEdit = useSelector((state) => state.foodList.toggleEdit);
    const toggleAction = useSelector((state) => state.allCategory.toggleAction);
    const dispatch = useDispatch();
    const { fetchList } = useFoods();

    const handleSearch = async () => {
        const resultSearch = await searchFoodByName(token, search);
        setFoods(resultSearch.data);
    };

    //! if delete this, it not gonna work, i have no idea why
    useEffect(() => {
        setFoods(listFood);
    }, [listFood]);

    useEffect(() => {
        if (selectedCategories === "") {
            setFoods(listFood);
            return;
        }
        const filterBaseOnCategories = listFood.filter((i) => {
            return selectedCategories === i.foodCategoryEntity.name;
        });
        setFoods(filterBaseOnCategories);
    }, [selectedCategories]);

    useEffect(() => {
        if (foods.length > 0) {
            setLoading(false);
        }
    }, [foods]);

    useEffect(() => {
        handleSearch();
    }, [search]);

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className="">
            <header>
                <div
                    className=" p-2 text-center text-white m-2 rounded-3 fw-bold"
                    style={{ background: "#6c738f" }}
                >
                    Food List
                    <div className="d-flex ">
                        <input
                            type="text"
                            className="mt-2  form-control form-input position-relative"
                            placeholder="Search anything..."
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                        ></input>
                        <span className="fw-bold">
                            <button
                                className="bg-transparent border-0 pt-1 position-absolute end-0 me-3 mt-1"
                                style={{ fontSize: "20px" }}
                            >
                                🔍
                            </button>
                        </span>
                    </div>
                    <button
                        className="border text-align-center text-white position-absolute end-0 me-4 mt-6 rounded-3"
                        style={{ background: "#6c738f" }}
                        onClick={() => {
                            dispatch(storeToggleAction(!toggleAction));
                        }}
                    >
                        <p className="p-0 m-0">Actions</p>
                    </button>
                </div>

                <nav className="d-flex m-2  flex-wrap justify-content-start">
                    <button
                        style={{ background: "#6b728e" }}
                        className="text-center col-2 border rounded-3"
                        onClick={() => {
                            setFoods(listFood);
                        }}
                    >
                        <h6 className="text-white">All</h6>
                    </button>
                    {listCategories.map(({ name, id }) => {
                        return (
                            <button
                                key={id}
                                style={{ background: "#6b728e" }}
                                className="text-center col-2 border rounded-3"
                                onClick={() => {
                                    setSelectedCategories(name);
                                }}
                            >
                                <h6 className="text-white">{name}</h6>
                            </button>
                        );
                    })}
                </nav>
            </header>

            <main className="container position-relative">
                {loading ? (
                    <>
                        <LoadingFoodCard />
                    </>
                ) : (
                    <div className="row">
                        {foods.map((food) => {
                            return (
                                <div className="col-6 col-lg-3 col-md-4 col-sm-6" key={food.id}>
                                    <FoodCard food={food} />
                                </div>

                            );
                        })}
                    </div>
                )}
                {/* <FoodCard foods={foods[0]} /> */}
            </main>
            <div>{toggleEdit && <EditFoodForm />}</div>
            <div>{toggleView && <ViewFoodCard />}</div>
            <div>{toggleAction && <ActionCategories />}</div>
            <div>
                {toggleForm && <AddForm toggle={{ sendDataToParent: setToggleForm }} />}
            </div>

            <div className="position-absolute " style={{ border: "no-border" }}>
                <button
                    style={{
                        color: "#6c738f",
                        border: "no-border",
                        bottom: "10px",
                        right: "10px",
                        background: "transparent",
                    }}
                    className=" position-fixed"
                    onClick={() => {
                        setToggleForm(!toggleForm);
                    }}
                >
                    <IoIosAddCircle style={{ fontSize: "3.2em" }} />
                </button>
            </div>
        </div>
    );
}

export default YourComponent;
