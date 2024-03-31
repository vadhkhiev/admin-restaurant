// // import React from "react";

// // const OderSt = () => {
// //   return (
// //     <div>
// //       {/* <select className="form-control">
// //         <option value="someOption">Complete</option>
// //         <option value="otherOption">Cooking</option>
// //         <option value="otherOption">Prepare</option>
// //       </select> */}

// //     </div>
// //   );
// // };

// // export default OderSt;
// import React, { useEffect, useState } from "react";
// import OrderedFood from "./OrderedFood";
// import { FaRegEdit } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { clearOrderedFood, deleteFood, selection } from "../core/foodCartSlice";
// import { FiTrash } from "react-icons/fi";
// import fetchTable from "../core/fetchTable";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const OrderStatus = () => {
//   const [selectedStatus, setSelectedStatus] = useState("Complete"); // Default status is Complete
//   const [availableStatus, setAvailableStatus] = useState(""); // State to store available status of the table
//   const [tableId, setTableId] = useState(""); // State to store selected table ID
//   const cartFood = useSelector((state) => state.foodCart?.orderedFood);
//   const currentUser = useSelector((state) => state.currentUser.currentUser);
//   const token =
//     useSelector((state) => state.auth.token) || localStorage.getItem("token");
//   const [table, setTable] = useState([]);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const dispatch = useDispatch();
//   const [edit, setEdit] = useState(false);
//   const navigate = useNavigate();

//   const [postData, setPostData] = useState({
//     userId: currentUser?.id,
//     tableId: null,
//     paymentMethod: "",
//     items: cartFood?.map((food) => {
//       return {
//         foodId: food?.id,
//         quantity: food?.quantity,
//       };
//     }),
//   });

//   useEffect(() => {
//     setPostData({
//       userId: currentUser?.id,
//       tableId: null,
//       paymentMethod: "",
//       items: cartFood?.map((food) => {
//         return {
//           foodId: food?.id,
//           quantity: food?.quantity,
//         };
//       }),
//     });
//   }, [cartFood]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetchTable(token);
//         setTable(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);

//   const selectAll = (event) => {
//     if (event.target.checked) {
//       dispatch(selection("tick"));
//     } else {
//       dispatch(selection("untick"));
//     }
//   };

//   const updateTableStatus = async () => {
//     try {
//       const response = await axios.put(
//         `/api/table/${tableId}`, // Use the correct API endpoint to update table status
//         {
//           status: selectedStatus,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setAvailableStatus(selectedStatus); // Update available status
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleAdd = async () => {
//     try {
//       const response = await axios.post("/api/order", postData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setMessage("Successfully created role");
//       if (postData.tableId) {
//         await updateTableStatus(); // Update table status if a table is selected
//       }
//       dispatch(clearOrderedFood());
//       setTimeout(() => {
//         navigate(-1);
//       }, 1000);
//     } catch (error) {
//       setError(error.response.data.message);
//       setTimeout(() => {
//         setError("");
//       }, 1000);
//     }
//   };

//   return (
//     <>
//       <main
//         className="p-2 border rounded-3"
//         style={{
//           border: "1px solid #a5b0db",
//           boxShadow: "rgba(0, 0, 0, 0.15) 1.4px 1.4px 2.2px",
//         }}
//       >
//         <div>
//           {/* Dropdown menu to select status */}
//           <select
//             value={selectedStatus}
//             onChange={(e) => setSelectedStatus(e.target.value)}
//             className="form-control"
//           >
//             <option value="Complete">Complete</option>
//             <option value="Cooking">Cooking</option>
//             <option value="Prepare">Prepare</option>
//           </select>
//         </div>

//         {/* Your existing JSX */}
//       </main>
//       {/* Messages */}
//     </>
//   );
// };

// export default OrderStatus;
