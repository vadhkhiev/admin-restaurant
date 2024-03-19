import React from "react";

export default function LoadingFoodCard() {
  return (
    <div className="d-flex flex-row">
      {" "}
      <div class="card is-loading">
        <div class="image"></div>
        <div class="content">
          <h2></h2>
          <p></p>
        </div>
      </div>
      <div class="card is-loading">
        <div class="image"></div>
        <div class="content">
          <h2></h2>
          <p></p>
        </div>
      </div>
      <div class="card is-loading">
        <div class="image"></div>
        <div class="content">
          <h2></h2>
          <p></p>
        </div>
      </div>
    </div>
  );
}
