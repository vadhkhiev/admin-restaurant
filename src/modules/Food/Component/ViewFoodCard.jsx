import {useDispatch, useSelector} from "react-redux";
import dummyImage from "../../../assets/img/dummy.png";
import {FaRegCircleXmark} from "react-icons/fa6";
import {storeToggleView} from "../Core/slice";

function ViewFoodCard() {
    const {food} = useSelector((state) => state.foodList);
    const dispatch = useDispatch();

    return <>
        <div className="d-flex justify-content-center align-items-center" style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(10,10,10, 0.5)",
            zIndex: 3,
        }}>
            <div className="form-group w-50 custom-border background-view rounded-3 p-2"
                 style={{
                     backdropFilter: "5px",
                     background: "rgba(10,10,10, 0.75)"
                 }}>
                <div className="d-flex justify-content-end">
                    <button className="btn custom-btn custom-border" onClick={() => {
                        dispatch(storeToggleView(false))
                    }}><FaRegCircleXmark/></button>
                </div>
                <div className="overflow-hidden d-flex justify-content-center w-100 border-white" style={{
                    height: "250px"
                }}>
                    <img className="img-fluid border-white border-1" src={food.foodImage || dummyImage} alt=""/>
                </div>
                <h3 className="text-white text-center fw-bold pt-2">{food.name}</h3>
                <div className="pt-1 d-flex w-100">

                    <div className="d-block w-50 justify-content-center align-items-center flex-column text-center p-1">
                        <label className="text-white">Code</label>
                        <h5 className="text-white p-1 bg-white bg-opacity-25 border-1 rounded-3"> {food.code}</h5>
                        <label className="text-white">Price</label>
                        <h5 className="text-white p-1 bg-white bg-opacity-25 border-1 rounded-3">
                            ${(food.price * 100) / 100}</h5>
                        <label className="text-white">Discount</label>
                        <h5 className="text-white p-1 bg-white bg-opacity-25 border-1 rounded-3">  {food.discount}%</h5>
                        <label className="text-white">Category</label>
                        <h5 className="text-white p-1 bg-white bg-opacity-25 border-1 rounded-3">
                             {food.foodCategoryEntity.name}</h5>
                    </div>
                    <div className="d-block w-50 justify-content-center align-items-center flex-row text-center">
                        <h5 className="text-white">Description </h5>
                        <p className="text-white h-75 overflow-scroll p-1 bg-white bg-opacity-25 border-1 rounded-3">
                            {food.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </>;
}

export default ViewFoodCard;
