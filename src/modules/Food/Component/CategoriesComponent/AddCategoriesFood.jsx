import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { addCategories } from "../../Core/addCategories";

export default function AddCategoriesFood() {
  const [newCategories, setNewCategories] = useState("");
  const pattern = /^[A-Za-z\s]{4,}$/;
  const [validInput, setValidInput] = useState(false);
  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");

  useEffect(() => {}, []);

  const handleSubmit = () => {
    addCategories(newCategories, token);
  };
  return (
    <>
      <div class="form-group w-100" onSubmit={handleSubmit}>
        <label className="fw-bold p-1">Enter The New Categories</label>
        {/* <input type="password" class="form-control" id="inputPassword4" placeholder="Password"> */}
        <input
          type="text"
          className="form-control"
          placeholder="New Categories"
          onChange={(e) => {
            setNewCategories(e.target.value);
            if (pattern.test(e.target.value) === true) {
              setValidInput(true);
            } else {
              setValidInput(false);
            }
          }}
        />
        <div className="mt-1">
          <p className="m-0">• Enter at least 4 letters.</p>
          <p className="m-0">• Only alphabet allows.</p>
          <p className="m-0">• Enter a valid name.</p>
        </div>
        {validInput ? (
          <button className=" mt-1 btn btn-primary" type="submit">
            Submit form
          </button>
        ) : (
          <button disabled className="mt-1 btn btn-primary">
            Submit Form
          </button>
        )}
      </div>
    </>
  );
}
