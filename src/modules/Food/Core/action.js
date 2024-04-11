import { setFood, storeEditToggle, storeFood } from "./slice";
import { useDispatch } from "react-redux";
import {
  reqGetFoods,
  reqCreateFood,
  reqUpdateFood,
  reqDeleteFood,
  reqGetFoodByName,
  reqGetFoodByCategory,
} from "./request";
import { alertError, alertSuccess } from "../../utils/alert";

const useFoods = () => {
  const dispatch = useDispatch();

  const fetchList = async () => {
    try {
      const result = await reqGetFoods();
      dispatch(storeFood(result.data.data));
    } catch (error) {
      console.error("Error in  component:", error);
    }
  };

  const searchFood = async (name) => {
    try {
      const result = await reqGetFoodByName(name);
      dispatch(storeFood(result.data.data));
    } catch (error) {
      console.log("Error in component: ", error);
    }
  };

  const filterByCategory = async (payload) => {
    try {
      const result = await reqGetFoodByCategory(payload);
      dispatch(storeFood(result.data.data));
    } catch {}
  };

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
  };
};

export { useFoods };
