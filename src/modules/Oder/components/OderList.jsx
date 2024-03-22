import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OrderList.css";
import loadingImg from "../../../assets/img/loading.gif";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import dateTimeFormat from "../../Role/core/dateTimeFormat";

function OrderList() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [editOrderId, setEditOrderId] = useState("");
  const [editedPaymentMethod, setEditedPaymentMethod] = useState("");
  const [editedStatus, setEditedStatus] = useState(""); // Add state for edited status
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteOrderId, setDeleteOrderId] = useState(""); // Track order ID to delete
  const [paymentMethods, setPaymentMethods] = useState(["Cash", "Bank"]); // Payment method options
  const [statusOptions, setStatusOptions] = useState([
    "Prepare",
    "Complete",
    "Cooking",
  ]); // Status options
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

  const handleDelete = async (orderId) => {
    if (deleteConfirmation) {
      try {
        await axios.delete(`/api/order/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(orders.filter((order) => order.id !== orderId));
        setDeleteConfirmation(false);
        setDeleteOrderId(""); // Reset delete order ID
      } catch (error) {
        setErrorMessage("Failed to delete order. Please try again later.");
      }
    } else {
      // Ask for confirmation before deleting
      setDeleteOrderId(orderId); // Set delete order ID
      setDeleteConfirmation(true);
    }
  };

  const handleEdit = async (orderId) => {
    setEditOrderId(orderId);
    const orderToEdit = orders.find((order) => order.id === orderId);
    setEditedPaymentMethod(orderToEdit.paymentMethod);
    setEditedStatus(orderToEdit.status); // Set initial status value
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(
        `/api/order/payment/${editOrderId}`,
        {
          paymentMethod: editedPaymentMethod,
          status: editedStatus, // Include edited status in the request
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedOrders = orders.map((order) => {
        if (order.id === editOrderId) {
          return {
            ...order,
            paymentMethod: editedPaymentMethod,
            status: editedStatus,
          };
        }
        return order;
      });

      setOrders(updatedOrders);
      setEditOrderId("");
      setEditedPaymentMethod("");
      setEditedStatus(""); // Reset edited status
    } catch (error) {
      setErrorMessage("Failed to save changes. Please try again later.");
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "prepare":
        return "red";
      case "complete":
        return "green";
      case "cooking":
        return "yellow";
      default:
        return "";
    }
  };

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

  return (
    <div className="m-3">
      <h2 className="h1">User Order</h2>
      {deleteConfirmation && (
        <div className="delete-confirmation form-control">
          <p>Are you sure you want to delete this order?</p>
          <button className="yes" onClick={() => handleDelete(deleteOrderId)}>
            Yes
          </button>
          <button className="no" onClick={() => setDeleteConfirmation(false)}>
            No
          </button>
        </div>
      )}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <table className="table-container table bg-white fw-bold">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Payment</th>
            <th scope="col">Create Date</th>
            <th scope="col">User Entity</th>
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
              <td className="fw-normal">
                {editOrderId === order.id ? (
                  <select
                    className=" form-select"
                    value={editedPaymentMethod}
                    onChange={(e) => setEditedPaymentMethod(e.target.value)}
                  >
                    {paymentMethods.map((method) => (
                      <option key={method} value={method}>
                        {method}
                      </option>
                    ))}
                  </select>
                ) : (
                  order.paymentMethod
                )}
              </td>
              <td className="fw-normal">{dateTimeFormat(order.createdDate)}</td>
              <td className="fw-normal">{order.userEntity.name}</td>
              <td className="text-center">{order.tableEntity.name}</td>
              <td className="fw-normal">{order.totalPrice}</td>
              <td
                className="fw-normal"
                style={{ color: getStatusColor(order.status) }}
              >
                {editOrderId === order.id ? (
                  <select
                    className="form-select"
                    value={editedStatus}
                    onChange={(e) => setEditedStatus(e.target.value)}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                ) : (
                  order.status
                )}
              </td>
              <td>
                {editOrderId === order.id ? (
                  <button className=" btn btn-primary" onClick={handleSaveEdit}>
                    Save
                  </button>
                ) : (
                  <FaEdit
                    className="edit"
                    onClick={() => handleEdit(order.id)}
                  />
                )}
                <MdDelete
                  className="delete"
                  onClick={() => handleDelete(order.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderList;
