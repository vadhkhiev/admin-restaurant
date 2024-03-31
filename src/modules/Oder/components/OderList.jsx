import React, { useState, useEffect } from "react";
import axios from "axios";
import loadingImg from "../../../assets/img/loading.gif";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import dateTimeFormat from "../../Role/core/dateTimeFormat";
import { Link } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { storeCLickedorder, storeViewId } from "../core/orderSlice";
import { FaRegEye } from "react-icons/fa";

function OrderList() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [editOrderId, setEditOrderId] = useState("");
  const [editedPaymentMethod, setEditedPaymentMethod] = useState("");
  const [editedStatus, setEditedStatus] = useState(""); 
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteOrderId, setDeleteOrderId] = useState(""); 
  const token = useSelector((state) => state.auth.token) || localStorage.getItem("token");
  const dispatch = useDispatch()
  const [clickedorder,setClickedorder] = useState([])

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
        console.log(response.data.data)
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
    dispatch(storeCLickedorder(orders.filter((order) => order.id === orderId)))
    console.log(orders.filter((order) => order.id === orderId))
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


  if (isLoading) {
    return (
      <div className="d-flex justify-content-center">
        <p className="fs-4">Loading...</p>
        <div>
         <img width={20} src={loadingImg} alt="" />
        </div>
      </div>
    );
  }

  if (isError) {
    return <h1>Development Error</h1>;
  }
  

  return (
    <div  className="m-3 rounded-3">


      <table className="table-container table bg-white fw-bold ">
        <thead >
          <tr>
            <th scope="col fs-1">ID</th>
            <th scope="col">User Entity</th>
            <th scope="col">Table Name</th>
            <td scope="col">Total</td>
            <td scope="col">Action</td>
          </tr>
        </thead>
        <tbody >
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="">{order.id}</td>
              <td className="fw-normal">{order.userEntity.name}</td>
              <td className="fw-normal">{order.tableEntity.name}</td>
              <td className="fw-normal"><sup className="text-danger">$</sup>{(order.totalPrice).toFixed(2)}</td>
              <td>
              <Link to='/order/view'>
                <FaRegEye style={{ color: "#6c738f" }} className="fs-4 " onClick={() => handleIdClicked(order.id)}/>
               </Link>
                <MdDelete
                  className="text-danger cursor-pointer fs-3"
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
