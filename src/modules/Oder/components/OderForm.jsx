import React, { useState } from "react";
import axios from "axios";

const OrderForm = () => {
  const [tableNumber, setTableNumber] = useState("");
  const [items, setItems] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/orders", {
        tableNumber,
        items: items.split(",").map((item) => item.trim()),
      });
      setMessage("Order placed successfully!");
      console.log(response.data);
    } catch (error) {
      setMessage("Error placing order");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Place Order</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Table Number:
          <input
            type="text"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
          />
        </label>
        <label>
          Items (comma separated):
          <input
            type="text"
            value={items}
            onChange={(e) => setItems(e.target.value)}
          />
        </label>
        <button type="submit">Place Order</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default OrderForm;
