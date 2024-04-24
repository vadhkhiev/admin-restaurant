import { CgAdd } from "react-icons/cg";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  storeToggleAddCategory,
  storeToggleDeleteCategory,
  storeToggleEditCategory,
} from "../core/slice";

export default function ActionCategories() {
  const dispatch = useDispatch();
  const { toggleEditCategory, toggleAddCategory, toggleDeleteCategory } =
    useSelector((state) => state.category);
  return (
    <div className="ms-1">
      <button
        className="bg-transparent text-white border-0 p-2 rounded-2"
        onClick={() => {
          dispatch(storeToggleAddCategory(!toggleAddCategory));
        }}
      >
        <CgAdd />
      </button>
      <button
        className="bg-transparent text-white border-0 p-2 rounded-2"
        onClick={() => {
          dispatch(storeToggleEditCategory(!toggleEditCategory));
        }}
      >
        <FaEdit />
      </button>
      <button
        className="bg-transparent text-white border-0 p-2 rounded-2 "
        onClick={() => {
          dispatch(storeToggleDeleteCategory(!toggleDeleteCategory));
        }}
      >
        <MdDelete />
      </button>
    </div>
  );
}
