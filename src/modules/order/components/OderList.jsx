import React, { useState, useEffect } from "react";
import axios from "axios";
import loadingImg from "../../../assets/img/loading.gif";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { storeCLickedorder, storeViewId } from "../core/orderSlice";
import { FaRegEye } from "react-icons/fa";
import ConfirmOrderDelete from "./ConfirmOrderDelete";
import { GoTrash } from "react-icons/go";

function OrderList() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [pageSize] = useState(10); // Define page size
  const [editOrderId, setEditOrderId] = useState("");
  const [editedPaymentMethod, setEditedPaymentMethod] = useState("");
  const [editedStatus, setEditedStatus] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteOrderId, setDeleteOrderId] = useState("");
  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");
  const dispatch = useDispatch();
  const [clickedorder, setClickedorder] = useState([]);
  const [deletealert, setDeletealert] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [filterbar, setFilterbar] = useState(false);

  // pagination / filter
  const [pagingdetails, setPagingdetails] = useState({});
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(20);
  const [status, setStatus] = useState("");
  const [payment, setPayment] = useState("");

  useEffect(() => {
    setPage(1);
  }, [size, status, payment]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/api/orders?status=${status}&page=${page}&size=${size}&sort=id&paymentMethod=${payment}`
        );

        if (!response.data || !response.data.data) {
          throw new Error("Failed to fetch data");
        }
        setPagingdetails(response.data.paging);
        console.log(response.data.data);
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
  }, [page, size, status, payment]);

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`/api/orders/${orderId}`);
      setOrders(orders.filter((order) => order.id !== orderId));
      setDeleteConfirmation(false);
      setDeleteOrderId(""); // Reset delete order ID
    } catch (error) {
      setErrorMessage("Failed to delete order. Please try again later.");
    }
  };

  const deleteAlert = (id) => {
    setDeleteId(id);
    setDeletealert(true);
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

  const handlePagination = (paging) => {
    window.scrollTo(0, 0);
    if (paging === "increase") {
      setPage(pagingdetails.totalPage === page ? page : page + 1);
    } else {
      setPage(page === 1 ? 1 : page - 1);
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
    return <h1 className="h1">Development Error</h1>;
  }
  console.log(pagingdetails);

  return (
    <>
      <section className="m-3 ">
        <div className="d-flex  ">
          <h3 style={{ color: "#6c738f" }} className="text-nowrap fw-bold">
            Orders list
          </h3>
          <div
            style={{ height: "35px" }}
            className="w-100 d-flex justify-content-end "
          >
            <div className="d-flex align-items-center justify-content-end">
              <p
                onClick={() => setFilterbar(!filterbar)}
                style={{ backgroundColor: "#6c738f", color: "white" }}
                className="cursor-pointer rounded-start mt-3 h-100 p-1 pe-3 pt-2 ps-3 "
              >
                {`${filterbar ? ">" : "<"} Filter`}
              </p>
            </div>

            <div
              style={{ backgroundColor: "#6c738f", color: "white" }}
              className={`${
                filterbar ? "w-50" : "d-none"
              } h-100 d-flex justify-content-evenly align-items-center p-2`}
            >
              <select
                onChange={(e) => setStatus(e.target.value)}
                className="form-select form-select-sm rounded-3 mx-4"
                name=""
                id=""
              >
                <option hidden value="">
                  Status
                </option>
                <option value="">All</option>
                <option value="Prepare">Prepare</option>
                <option value="Cooking">Cooking</option>
                <option value="Complete">Complete</option>
                <option value="Cancel">Cancel</option>
              </select>
              <select
                onChange={(e) => setPayment(e.target.value)}
                className="form-select form-select-sm me-3 rounded-3 "
                name=""
                id=""
              >
                <option hidden value="">
                  Payment
                </option>
                <option value="">All</option>
                <option value="Cash">Cash</option>
                <option value="Bank">Bank</option>
              </select>
              <select
                onChange={(e) => setSize(parseInt(e.target.value))}
                className="form-select form-select-sm me-3  rounded-3"
                name=""
                id=""
              >
                <option value="10">Show 10</option>
                <option selected value="20">
                  Show 20
                </option>
                <option value="30">Show 30</option>
                <option value="40">Show 40</option>
                <option value="50">Show 50</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <div className="m-3 rounded-3">
        {deletealert && (
          <ConfirmOrderDelete
            handleDelete={handleDelete}
            deleteId={deleteId}
            setDeletealert={setDeletealert}
            setDeleteConfirmation={setDeleteConfirmation}
          />
        )}

        <table className="table-container table bg-white fw-bold ">
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
                    <Link to="/order/view">
                      <FaRegEye
                        style={{ color: "#6c738f" }}
                        className="fs-4 me-2"
                        onClick={() => handleIdClicked(order.id)}
                      />
                    </Link>
                    <GoTrash
                      className="text-danger cursor-pointer fs-4"
                      onClick={() => deleteAlert(order.id)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {orders?.length === 0 && (
          <p className="text-center text-danger">No Orders Found</p>
        )}

        <div className="p-0 d-flex justify-content-center">
          <nav aria-label="Page navigation example">
            <ul className="pagination list-unstyled d-flex justify-content-center align-items-center">
              <li className="page-item underline-none me-4">
                <a
                  onClick={() => handlePagination("decrease")}
                  style={{ fontSize: "25px" }}
                  className="page-link"
                  aria-label="Previous"
                >
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li
                className="page-item underline-none"
                style={{ display: "flex", gap: "5px", width: "60px" }}
              >
                <span className="page-link">{page}</span>
                <span className="page-link">/</span>
                <span className="page-link">
                  {pagingdetails?.totalPage ? pagingdetails?.totalPage : 1}
                </span>
              </li>
              <li className="page-item">
                <a
                  onClick={() => handlePagination("increase")}
                  style={{ fontSize: "25px" }}
                  className="page-link"
                  aria-label="Next"
                >
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default OrderList;
