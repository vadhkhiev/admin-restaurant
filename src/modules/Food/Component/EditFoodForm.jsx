import React from "react";
import { useSelector } from "react-redux";

export default function EditFoodForm() {
  // const sendDataToParent = () => {
  //   toggleEdit.sendDataToParent(false);
  // };
  return (
    <>
      {" "}
      <form
        // onSubmit={handleSubmit}
        className="add-form d-flex justify-content-center flex-column position-absolute col-9 p-3 rounded-2 ms-3"
        style={{ top: "15%", right: "10%" }}
      >
        <h3 className="text-white fw-bold">Edit Food</h3>
        <button
          className=" position-absolute text-white border bg-transparent rounded-3"
          style={{ width: "fit-content", top: "10px", right: "20px" }}
        >
          X
        </button>
        <div class="form-group">
          <label for="inputName">Food Name</label>
          <input type="text" className="form-control" placeholder="Food Name" />
        </div>
        <div class="form-group">
          <label for="inputPrice">Price</label>
          <input type="text" className="form-control" placeholder="Price" />
        </div>
        <div class="form-group">
          <label for="inputPrice">Description</label>
          <input
            type="textarea"
            className="form-control"
            placeholder="Description"
          />
        </div>
        <div class="mb-2">
          <label class="form-label">Food Image</label>
          <input class="form-control" type="file" id="formFile"></input>
        </div>
      </form>
    </>
  );
}
