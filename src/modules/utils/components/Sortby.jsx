import React, { useState } from 'react';

const Sortby = ({ options, handleFilter, params }) => {


  const handleSort = (value) => {
    handleFilter('sort', value);
  };

  return (
    <div className="ms-2">
      <select 
        className="form-select  custom-btn rounded custom-border  text-white bg-transparent"
        value={(params.sort)}
        onChange={(e) => handleSort(e.target.value)}
      >
        <option selected value=""  disabled hidden>sort by</option>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default Sortby;
