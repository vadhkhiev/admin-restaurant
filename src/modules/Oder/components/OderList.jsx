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
    <div className="m-3">
      <h2 className="h1">User Order</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <table
        style={{ color: "#464d69" }}
        className="table-container table bg-white fw-bold"
      >
        <thead>
          <tr>
            <th scope="col">ID </th>
            <th scope="col">Status</th>
            <th scope="col">Payment</th>
            <th scope="col">Create Date</th>
            <th scope="col">Update Date</th>
            <th scope="col">Table Name</th>
            <td scope="col">Total</td>
            <td scope="col">Action</td>
          </tr>
        </thead>

        {orders.map((order) => (
          <tbody>
            <tr>
              <td className="fw-normal">{order.id}</td>
              <td
                className={`fw-normal ${
                  order.status == "Complete" ? "text-success" : " text-danger"
                } `}
              >
                {order.status}
              </td>
              <td className="fw-normal">{order.paymentMethod}</td>
              <td className="fw-normal">{order.createdDate}</td>
              <td className="fw-normal">{order.updateDate}</td>
              <td className="text-center">{order.tableEntity.name}</td>
              <td className="fw-normal">{order.totalPrice}</td>
            </tr>
          </tbody>
        ))}
      </table>
      {/* </tbody>
      </table> */}
    </div>
  );
}

export default OrderList;
