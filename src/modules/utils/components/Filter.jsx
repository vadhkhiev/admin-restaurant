import React from 'react';

const Filter = ({ options, handleFilter, params, action }) => {
  const handleSort = (value) => {
    handleFilter(action, value); 
  };

  return (
    <div className="ms-2">
    <select 
      className="form-select custom-btn rounded custom-border text-white bg-transparent"
      value={params[action]}
      onChange={(e) => handleSort(e.target.value)}
    >
      <option value="" disabled hidden>{action}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>{option}</option>
      ))}
    </select>
  </div>
  
  );
};

export default Filter;
