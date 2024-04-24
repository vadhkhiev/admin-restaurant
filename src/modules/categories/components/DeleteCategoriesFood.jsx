import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useCategories} from "../core/action";
import {storeToggleDeleteCategory, storeToggleEditCategory} from "../core/slice";

export default function DeleteCategoriesFood() {
    const [ID, setID] = useState(null);
    const {categories} = useSelector((state) => state.category);
    const dispatch = useDispatch()
    const {deleteCategory} = useCategories();
    return (
        <div className="form-group position-absolute w-50 bg-white rounded-3 top-0 p-2"
             style={{
                 marginLeft: "15%", marginTop: "10%",
             }}>
            <div>
                <label className="fw-bold mt-1">
                    Select The Categories You Want To Delete
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
                    {categories.map(({name}) => (<option value={name} key={name}>
                        {name}
                    </option>))}
                </select>
            </div>
            <button
                className=" mt-1 btn btn-primary bg-danger border"
                onClick={() => {
                    deleteCategory(ID);
                    dispatch(storeToggleDeleteCategory(false));
                }}
            >
                Delete
            </button>
        </div>);
}
