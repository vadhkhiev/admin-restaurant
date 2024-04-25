import React from 'react';

const Filter = ({ options, handleFilter, params, action }) => {
  const handleSort = (value) => {
    handleFilter(action, value); 
  };

  return (
    <div className="ms-2">
    <select 
      className="h-100 px-2 custom-btn  text-white custom-border  rounded-3"
      style={{background:'#09090b'}}
      value={params[action]}
      onChange={(e) => handleSort(e.target.value)}
    >
      <option value="" hidden>{action}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>{option}</option>
      ))}
    </select>
  </div>
  
  );
};

export default Filter;
