import { useDispatch } from "react-redux";
import {
  reqCreateCategory,
  reqDeleteCategory,
  reqGetCategories,
  reqUpdateCategory,
} from "./request";
import { storeCategories } from "./slice";
import { alertError, alertSuccess } from "../../utils/alert";

const useCategories = () => {
  const dispatch = useDispatch();

  const fetchCategories = async () => {
    try {
      const result = await reqGetCategories();
      dispatch(storeCategories(result.data.data));
    } catch (error) {
      console.log("Error in component: ", error);
    }
  };

  const createCategories = (payload) => {
    reqCreateCategory(payload)
      .then(() => {
        fetchCategories();
        alertSuccess("New Category Created");
      })
      .catch((error) => {
        console.log(error);
        alertError("Can't Add");
      });
  };

  const updateCategory = (id, payload) => {
    reqUpdateCategory(id, payload)
      .then(() => {
        fetchCategories();
        alertSuccess("Categories Updated");
      })
      .catch((error) => {
        console.log(error);
        alertError("Update Failed");
      });
  };

  const deleteCategory = (id) => {
    reqDeleteCategory(id)
      .then(() => {
        fetchCategories();
        alertSuccess("Category Deleted");
      })
      .catch((error) => {
        console.log(error);
        alertError("Delete Failed");
      });
  };

  const onSetEditCategories = (category) => dispatch(storeCategories(category));

  return {
    fetchCategories,
    deleteCategory,
    createCategories,
    updateCategory,
    onSetEditCategories,
  };
};

export { useCategories };
