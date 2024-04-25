import {setFood, storeEditToggle, storeFood, storeParams} from "./slice";
import {useDispatch, useSelector} from "react-redux";
import {
    reqGetFoods,
    reqCreateFood,
    reqUpdateFood,
    reqDeleteFood,
    reqGetFoodByCategory,
    reqUploadImage, reqGetPopularFoods
} from "./request";
import {alertError, alertSuccess} from "../../utils/alert";

const useFoods = () => {
    const dispatch = useDispatch();
    const {params} = useSelector((state) => state.foodList);

    const fetchList = async (payload) => {
        await reqGetFoods(params).then((res) => {
            dispatch(storeFood(res.data.data));
        }).catch((err) => {
            console.log("Error in component: ", err);
        })
    };

    const handleFilter = (name, value) => {
        dispatch(storeParams([name], value));
    }

    const uploadImage = (payload) => {
        reqUploadImage(payload)
            .then((data) => {
                fetchList();
                alertSuccess("Successfully uploaded image");
            })
            .catch((error) => {
                fetchList();
                alertError("Error in uploading image");
            })
    }

    const searchFood = async (params) => {
        try {
            const result = await fetchList(params);
            dispatch(storeFood(result.data.data));
        } catch (error) {
            console.log("Error in component: ", error);
        }
    };

    const filterByCategory = async (payload) => {
        try {
            const result = await reqGetFoodByCategory(payload);
            dispatch(storeFood(result.data.data));
        } catch (error) {
            console.log(error)
        }
    };

    const filterByPopular = async () => {
        try {
            const result = await reqGetPopularFoods()
            return dispatch(storeFood(result.data.data));
        } catch (error) {
            console.log(error);
        }
    }

    const createFood = (payload) => {
        reqCreateFood(payload)
            .then(() => {
                fetchList();
                alertSuccess("Food Added.");
            })
            .catch((error) => {
                console.log(error);
                alertError("Can't Add!");
            });
    };

    const updateFood = (id, payload) => {
        reqUpdateFood(id, payload)
            .then(() => {
                fetchList();
                dispatch(storeEditToggle(false));
                alertSuccess("Food Updated.");
            })
            .catch((error) => {
                console.log(error);
                alertError("Can't Edit!");
            });
    };

    const deleteFood = (id) => {
        reqDeleteFood(id)
            .then(() => {
                fetchList();
                alertSuccess("Food Deleted.");
            })
            .catch((error) => {
                console.log(error);
                alertError("Can't Delete!");
            });
    };

    const onSetEditFood = (food) => dispatch(setFood(food));

    return {
        fetchList,
        searchFood,
        createFood,
        onSetEditFood,
        updateFood,
        deleteFood,
        filterByCategory,
        filterByPopular,
        uploadImage,
        handleFilter
    };
};

export {useFoods};