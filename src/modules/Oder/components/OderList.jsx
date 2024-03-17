import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OrderList.css"; // Import CSS file for additional styling

function OrderList() {
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
        console.error("Error:", error);
        setErrorMessage("Failed to fetch orders. Please try again later."); // Set error message
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  return (
    <div>
      <h2>User Order</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <table className="table-containers container-fluid">
        <thead>
          <tr>
            <th>ID</th>
            <th>UserEntity</th>
            <th>Status</th>
            <th>Quantity</th>
            <th>Payment</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.UserEntity}</td>
              <td>{order.Status}</td>
              <td>{order.Quantity}</td>
              <td>{order.Payment}</td>
              <td>{order.Total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderList;
