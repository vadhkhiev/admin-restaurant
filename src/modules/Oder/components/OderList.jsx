import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OrderList.css";
import loadingImg from "../../../assets/img/loading.gif";
import { Link } from "react-router-dom";

function OrderList() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // New state for error message
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/order?order=asc`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.data || !response.data.data) {
          throw new Error("Failed to fetch data");
        }

        setOrders(response.data.data);
      } catch (error) {
        setError(true);
        setErrorMessage("Failed to fetch orders. Please try again later.");
      }
      setIsLoading(false);
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  if (isLoading) {
    return (
      <div className="h1">
        <p className="fs-4">Loading...</p>
        <img width={20} src={loadingImg} alt="" />
      </div>
    );
  }

  if (isError) {
    return <h1>Development Error</h1>;
  }
  console.log(orders);

  return (
    <div className="m-3">
      <h2 className="h1">User Order</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <>
        <Link to='/order/ordering'
          
          style={{ backgroundColor: "#6c738f" }}
          className="btn text-white fw-bold"
        >
          Add
        </Link>
      </>
      <table
        style={{ color: "#464d69" }}
        className="table-container table bg-white fw-bold"
      >
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Payment</th>
            <th scope="col">Create Date</th>
            <th scope="col">Update Date</th>
            <th scope="col">Table Name</th>
            <td scope="col">Total</td>
            <th scope="col">Status</th>
            <td scope="col">Action</td>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="fw-normal">{order.id}</td>

              <td className="fw-normal">{order.paymentMethod}</td>
              <td className="fw-normal">{order.createdDate}</td>
              <td className="fw-normal">{order.updateDate}</td>
              <td className="text-center">{order.tableEntity.name}</td>
              <td className="fw-normal">{order.totalPrice}</td>
              <td
                className={`fw-normal ${
                  order.status === "Complete" ? "text-success" : "text-danger"
                }`}
              >
                {order.status}
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderList;
