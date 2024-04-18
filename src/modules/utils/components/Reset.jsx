import React from 'react';
import { IoCloseSharp } from "react-icons/io5";

const Reset = ({ params, handleFilter }) => {

  const handleReset = () => {
    Object.keys(params).forEach(param => {
      if (param === 'page') {
        handleFilter('page', 1);
      } else if (param === 'size') {
        handleFilter('size', 20);
      } else {
        handleFilter(param, '');
      }
    });
  };

  const hasOtherParams = Object.keys(params).some(param => param !== 'query' && param !== 'page' && param !== 'size' && params[param] !== '');
  const shouldShowResetButton = params.query !== '' || hasOtherParams; // Added condition to check if query is not empty

  return (
    <>
      {shouldShowResetButton && (
        <button
          type="button"
          onClick={handleReset}
          className="btn custom-btn  text-white custom-border ms-2 rounded-3"
        >
          Reset
          <IoCloseSharp className="ms-1" />
        </button>
      )}
    </>
  );
};

export default Reset;
