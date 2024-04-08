// edit

// const handleEdit = async (orderId) => {
//   setEditOrderId(orderId);
//   const orderToEdit = orders.find((order) => order.id === orderId);
//   setEditedPaymentMethod(orderToEdit.paymentMethod);
//   setEditedStatus(orderToEdit.status); // Set initial status value
// };

// const handleSaveEdit = async () => {
//   try {
//     await axios.put(
//       `/api/orders/payment/${editOrderId}`,
//       {
//         paymentMethod: editedPaymentMethod,
//         status: editedStatus, // Include edited status in the request
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     const updatedOrders = orders.map((order) => {
//       if (order.id === editOrderId) {
//         return {
//           ...order,
//           paymentMethod: editedPaymentMethod,
//           status: editedStatus,
//         };
//       }
//       return order;
//     });

//     setOrders(updatedOrders);
//     setEditOrderId("");
//     setEditedPaymentMethod("");
//     setEditedStatus(""); // Reset edited status
//   } catch (error) {
//     setErrorMessage("Failed to save changes. Please try again later.");
//   }
// };
// const getStatusColor = (status) => {
//   switch (status.toLowerCase()) {
//     case "prepare":
//       return "red";
//     case "complete":
//       return "green";
//     case "cooking":
//       return "yellow";
//     default:
//       return "";
//   }
// };

{
  /* {editOrderId === order.id ? (
                  <button className=" btn btn-primary" onClick={handleSaveEdit}>
                    Save
                  </button>
                ) : (
                  <FaEdit
                    className="edit cusrser-pointer"
                    onClick={() => handleEdit(order.id)}
                  />
                )} */
}
