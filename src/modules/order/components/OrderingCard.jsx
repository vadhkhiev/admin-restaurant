import React from "react";
import foodimg from "../../../assets/img/dummy.png";
import { useDispatch } from "react-redux";
import { storeOrderedFood } from "../core/reducer";
const OrderingCard = ({ food }) => {

  const dispatch = useDispatch();

  return (
    <>
      <div className=" col-sm-12 col-md-6 mb-3">
        <div
          className="position-relative rounded-3 overflow-hidden d-flex custom-border" 
          style={{height: "80px"}}
        >
          <div className="w-25 overflow-hidden">
            <img width={"120px"} src={food?.foodImage || foodimg} alt="Food" />
          </div>
          <main className="ms-3 d-flex flex-row mt-2 w-75 position-relative ordercardwrapper">
            <aside style={{ width: "60%" }}>
              <h4 className="text-white">{food.name}</h4>
              <p className="text-white-50 w-100">{food.description}</p>
            </aside>
            <aside style={{ width: "40%" }} className=" d-flex flex-column">
              <div className="d-flex">
                <h5 className="text-white">${food.price}.00</h5>
                <h5 className="text-danger ms-2">-{food.discount}%</h5>
              </div>
              <div className="ms-2">
                <button
                  onClick={() => dispatch(storeOrderedFood(food))}
                  className="btn text-white custom-btn custom-border "
                >
                  Order
                </button>
              </div>
            </aside>
          </main>
        </div>
      </div>
    </>
  );
};

export default OrderingCard;
