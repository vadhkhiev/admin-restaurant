import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OrderList.css";
import loadingImg from "../../../assets/img/loading.gif";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import dateTimeFormat from "../../Role/core/dateTimeFormat";
import { Link } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { storeCLickedorder, storeViewId } from "../core/orderSlice";

function roundLastTwoDigits(number) {
  return Math.round(number * 100) / 100;
}

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
  const [searchQuery, setSearchQuery] = useState(""); // State to hold search query
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [clickedorder, setClickedorder] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/orders?page=1`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.data || !response.data.data) {
          throw new Error("Failed to fetch data");
        }

        setOrders(response.data.data);
        console.log(response.data.data);
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
        await axios.delete(`/api/orders/${orderId}`, {
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

  const handleIdClicked = (orderId) => {
    dispatch(storeViewId(orderId));
    dispatch(storeCLickedorder(orders.filter((order) => order.id === orderId)));
    console.log(orders.filter((order) => order.id === orderId));
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(
        `/api/orders/payment/${editOrderId}`,
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

  // Function to filter orders based on search query
  const filteredOrders = orders.filter((order) =>
    order.tableEntity.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="h1">
        <p className="fs-4">Loading...</p>
        <img width={20} src={loadingImg} alt="" />
      </div>
    );
  }
  if (isError) {
    return <h1 className="h1">Development Error</h1>;
  }

  return (
    <div className="m-3">
      <div className="d-flex form">
        <form className="tp">
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Search table name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>
      {/* <h2 className="h1">User Order</h2> */}
      {deleteConfirmation && (
        <div className="delete-confirmation">
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
      <div className="d-flex my-3">
        <Link
          to="/order/ordering"
          style={{ background: "#6c738f" }}
          className="btn text-white "
        >
          Add Order
        </Link>
      </div>
      <table className="table-container table bg-white fw-bold">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">User Entity</th>
            <th scope="col">Table Name</th>
            <td scope="col">Total</td>
            <td scope="col">Action</td>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id}>
              <td className="fw-normal">{order.id}</td>
              <td className="fw-normal">{order.userEntity.name}</td>
              <td className="text-center">{order.tableEntity.name}</td>
              <td className="fw-normal">
                {roundLastTwoDigits(order.totalPrice)}{" "}
                <sub className="text-danger fs-6">$</sub>
              </td>

              <td>
                {editOrderId === order.id ? (
                  <button className=" btn btn-primary" onClick={handleSaveEdit}>
                    Save
                  </button>
                ) : (
                  <FaEdit
                    className="edit cusrser-pointer"
                    onClick={() => handleEdit(order.id)}
                  />
                )}
                <MdDelete
                  className="delete"
                  onClick={() => handleDelete(order.id)}
                />
                <Link to="/order/view">
                  <FiEye
                    className="fs-3"
                    onClick={() => handleIdClicked(order.id)}
                  />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderList;
