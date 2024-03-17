import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OrderList.css";
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

  console.log(orders);

  return (
    <div>
      <h2 className="h1">User Order</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <table className="container-fluid">
        <thead>
          <tr>
            <th>ID </th>
            <th>Status</th>
            <th>Payment</th>
            <th>Date</th>
            <th>Total</th>
          </tr>
        </thead>
      </table>
      {orders.map(({ id, status, paymentMethod, createDate, updateDate }) => (
        <table className=" table-containers container-fluid " key={id}>
          <tbody>
            <tr>
              <td>{id}</td>
              <td>{status}</td>
              <td>{paymentMethod}</td>
              <td>{createDate}</td>
              <td>{updateDate}</td>
            </tr>
          </tbody>
        </table>
      ))}
      {/* </tbody>
      </table> */}
    </div>
  );
}

export default OrderList;
