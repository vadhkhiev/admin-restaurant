import React from 'react';
import { MdKeyboardDoubleArrowLeft, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowRight } from 'react-icons/md';

const Pagination = ({ params, pagingdetails , handleFilter }) => {
  console.log(pagingdetails , params)

  const handlePagination = (paging) => {
    window.scrollTo(0, 0);
    let newPage = params.page;
    if (paging === 'increase') {
      if (params.page < pagingdetails.totalPage) {
        newPage = params.page + 1;
      }
    } else if (params.page > 1) {
      newPage = params.page - 1;
    }
    handleFilter('page', newPage);
  };

  return (
    <div className='p-0 d-flex justify-content-between mt-3'>
      <div className='d-flex text-white'>
        <p>Totals :</p> 
        <span className='ms-2 fw-bold'>{pagingdetails.totals}</span>
      </div>
      <div className='d-flex'>
        <section className='d-flex me-5 mt-1'>
          <p className='fw-bold text-white me-2'>Rows per page </p>
          <div>
            <select
              className="form-select form-select-sm rounded-3 bg-transparent text-white"
              name="size"
              value={params.size}
              onChange={(e) => {
                const size = e.target.value;
                handleFilter('size', size);
                handleFilter('page', 1);
              }}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </section>
        <section>
          <p className='fw-bold text-white me-5 mt-1'>Page {params.page} of {pagingdetails.totalPage}</p>
        </section>
        <p className={`btn custom-btn text-white custom-border square-btn me-2 ${params.page === 1 ? 'disabled' : ''}`} onClick={() => handleFilter('page',1)}>
          <MdKeyboardDoubleArrowLeft />
        </p>
        <p className={`btn custom-btn text-white custom-border square-btn me-2 ${params.page === 1 ? 'disabled' : ''}`} onClick={() => handlePagination('decrease')}>
          <MdKeyboardArrowLeft />
        </p>
        <p className={`btn custom-btn text-white custom-border square-btn me-2 ${params.page >= pagingdetails.totalPage ? 'disabled' : ''}`} onClick={() => handlePagination('increase')}>
          <MdKeyboardArrowRight />
        </p>
        <p className={`btn custom-btn text-white custom-border square-btn ${params.page === pagingdetails.totalPage ? 'disabled' : ''}`} onClick={() => handleFilter('page',pagingdetails.totalPage)}>
          <MdKeyboardDoubleArrowRight />
        </p>
      </div>
    </div>
  );
};

export default Pagination;

