import React from "react";

export default function LoadingFoodCard() {
  return (
    <div className="d-flex flex-row">
      {" "}
      <div className="card-x is-loading-x">
        <div className="image-x"></div>
        <div className="content-x">
          <h2></h2>
          <p></p>
        </div>
      </div>
      <div className="card-x is-loading-x">
        <div className="image-x"></div>
        <div className="content-x">
          <h2></h2>
          <p></p>
        </div>
      </div>
      <div className="card-x is-loading-x">
        <div className="image-x"></div>
        <div className="content-x">
          <h2></h2>
          <p></p>
        </div>
      </div>
    </div>
  );
}
