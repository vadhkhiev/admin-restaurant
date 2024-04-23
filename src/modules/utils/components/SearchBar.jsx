import React from 'react';

const SearchBar = ({ params, handleFilter , title = 'Search' }) => {
  const handleInputChange = (e) => {
    handleFilter('query', e.target.value);
    handleFilter('page', 1);
  };

  return (
    <div className='d-flex'>
      <input
        onChange={handleInputChange}
        name="query"
        style={{ width: '210px', background:'#09090b', color: 'white' }}
        type="text"
        value={params.query}
        className=" rounded custom-border ps-2 py-1"
        placeholder={title}
  
      />
    </div>
  );
};

export default SearchBar;
