import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import loadingImg from "../../../assets/img/loading.gif";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import useOrders from "../core/action";
import { storeOrderTableId } from "../core/reducer";
import SearchBar from "../../utils/components/SearchBar";
import Reset from "../../utils/components/Reset";
import Pagination from "../../utils/components/Pagination";

function OrderList() {
  const { orders, params, paging, loading } = useSelector((state) => state.orders);
  const { getOrders, deleteOrder, handleFilter } = useOrders();
  const dispatch = useDispatch();

  useEffect(() => {
    getOrders();
  }, [params]);

  return (
    <>
      {loading ? (
        <div style={{ height: '80vh' }} className="d-flex justify-content-center align-items-center">
          <img width={40} src={loadingImg} alt="" />
        </div>
      ) : (
        <>
          <section className="m-3 ">
            <div className="d-flex  ">
              <h3 className="text-nowrap fw-bold text-white">
                Orders list
              </h3>
            </div>
            <p className="text-white-50">Here is the list of orders</p>
            <div className="d-flex">
              <SearchBar params={params} handleFilter={handleFilter} />
              <Reset params={params} handleFilter={handleFilter} />
            </div>
          </section>

          <div className="m-3 rounded-3 custom-border">

            <table className=" table bg-transparent table-borderless  ">
              <thead>
                <tr className="border-bottom border-dark ">
                  <th scope="col" className="text-white fw-bold">ID</th>
                  <th scope="col " className="text-white fw-bold">User Entity</th>
                  <th scope="col" className="text-white fw-bold">Table Name</th>
                  <td scope="col" className="text-white fw-bold">Total</td>
                  <td scope="col" className="text-white fw-bold">Action</td>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.map((order) => (
                    <tr className="hover-effect " key={order.id}>
                      <td className=" text-white">{order?.id}</td>
                      <td className=" text-white">{order.user?.name}</td>
                      <td className=" text-white">{order.table?.name}</td>
                      <td className=" text-white">
                        <sup className="text-danger">$</sup>
                        {order?.total_Price?.toFixed(2)}
                      </td>
                      <td>
                        <Link
                          onClick={() => dispatch(storeOrderTableId(order.table?.id))}
                          to={`/order/view/${order?.id}`}>
                          <FaRegEye
                            className="fs-4 me-2 text-white"
                          />
                        </Link>
                        <GoTrash
                          onClick={() => deleteOrder(order?.id)}
                          className="text-danger cursor-pointer fs-4"
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {orders?.length === 0 && (
              <p className="text-center text-white">No Result.</p>
            )}
          </div>
          <div className="mx-3">
            <Pagination params={params} handleFilter={handleFilter} pagingdetails={paging} />
          </div>
        </>
      )}
    </>
  );
}

export default OrderList;
