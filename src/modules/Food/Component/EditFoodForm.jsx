import React from "react";
import { IoIosClose } from "react-icons/io";

export default function EditFoodForm({ onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleEditToggle = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div>
      {" "}
      <form
        onSubmit={handleSubmit}
        className="add-form d-flex justify-content-center flex-column position-absolute col-9 p-3 rounded-2 ms-3"
        style={{ top: "15%", right: "10%" }}
      >
        <button
          className="position-absolute top-0 end-0 mt-3 me-3 border rounded-3 fw-bold"
          onClick={handleEditToggle}
        >
          <IoIosClose />
        </button>
        <h4 className="text-white">Edit Food Information</h4>
        <div class="form-group">
          <label for="inputName">Food Name</label>
          <input type="text" className="form-control" placeholder="Food Name" />
        </div>

        <div class="form-group">
          <label for="inputPrice">Price</label>
          {/* <input type="password" class="form-control" id="inputPassword4" placeholder="Password"> */}
          <input type="text" className="form-control" placeholder="Price" />
        </div>

        <div class="form-group">
          <label for="inputPrice">Code</label>
          {/* <input type="password" class="form-control" id="inputPassword4" placeholder="Password"> */}
          <input type="text" className="form-control" placeholder="Code" />
        </div>

        <div class="col-12 mt-1">
          <button
            class="btn btn-primary"
            type="submit"
            onClick={handleEditToggle}
          >
            Submit form
          </button>
        </div>
      </form>
    </div>
  );
}
