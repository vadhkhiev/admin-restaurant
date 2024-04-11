import { setFood, storeEditToggle, storeFood } from "./slice";
import { useDispatch } from "react-redux";
import {
  reqGetFoods,
  reqCreateFood,
  reqUpdateFood,
  reqDeleteFood,
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

  return { fetchList, createFood, onSetEditFood, updateFood, deleteFood };
};

export { useFoods };
