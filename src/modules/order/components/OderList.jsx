import React, { useState, useEffect } from "react";
import loadingImg from "../../../assets/img/loading.gif";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaRegEye } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import useOrders from "../core/action";
import { storeViewId } from "../core/reducer";

function OrderList() {
  const {orders} = useSelector((state) => state.orders)
  const {getOrders} = useOrders();
  const dispatch = useDispatch();
  console.log(orders)

  useEffect(() => {
    getOrders()
  },[])

  return (
    <>
      <section className="m-3 ">
        <div className="d-flex  ">
          <h3 className="text-nowrap fw-bold text-white">
            Orders list
          </h3>
        </div>
      </section>

      <div className="m-3 rounded-3 custom-border p-3">


        <table className=" table bg-white fw-bold ">
          <thead>
            <tr>
              <th scope="col fs-1">ID</th>
              <th scope="col ">User Entity</th>
              <th scope="col">Table Name</th>
              <td scope="col">Total</td>
              <td scope="col">Action</td>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => (
                <tr key={order.id}>
                  <td className="fw-bold">{order?.id}</td>
                  <td className="fw-bold">{order.user?.name}</td>
                  <td className="fw-bold">{order.table?.name}</td>
                  <td className="fw-bold">
                    <sup className="text-danger">$</sup>
                    {order?.total_Price?.toFixed(2)}
                  </td>
                  <td>
                    <Link
                    onClick={()=>dispatch(storeViewId(order?.id))} 
                    to="/order/view">
                      
                      <FaRegEye
                        style={{ color: "#6c738f" }}
                        className="fs-4 me-2"
                      />
                    </Link>
                    <GoTrash
                      className="text-danger cursor-pointer fs-4"
                      
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {orders?.length === 0 && (
          <p className="text-center text-danger">No Orders Found</p>
        )}
      </div>
    </>
  );
}

export default OrderList;
