import React from 'react';
import { MdKeyboardDoubleArrowLeft, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowRight } from 'react-icons/md';

const FoodPagination = ({ params, pagingdetails, handleFilter }) => {
    const handlePagination = (paging) => {
        let newPage = params.page;
        if (paging === 'increase' && params.page < pagingdetails.totalPage) {
            newPage = params.page + 1;
        } else if (paging === 'decrease' && params.page > 1) {
            newPage = params.page - 1;
        }
        handleFilter('page', newPage);
    };

    const isDisabled = pagingdetails.totalPage === 0;

    return (
        <div className='p-0 d-flex flex-column flex-sm-row justify-content-between mt-3'>
            <div className='d-flex flex-column flex-sm-row text-white mb-2 mb-sm-0'>
                <p className='text-nowrap'>Totals : {pagingdetails.totals}</p>
            </div>
            <div className='d-flex flex-column flex-sm-row'>
                <section className='d-flex me-2 me-sm-5 mt-1'>
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
                            disabled={isDisabled}
                        >
                            <option value="12">12</option>
                            <option value="24">24</option>
                            <option value="36">36</option>
                            <option value="48">48</option>
                        </select>
                    </div>
                </section>
                <section className='me-2 me-sm-5 mt-1'>
                    <p className='fw-bold text-white'>Page {pagingdetails.totalPage === 0 ? 0 : params.page} of {pagingdetails.totalPage}</p>
                </section>
                <div className='d-flex'>
                    <p className={`btn custom-btn text-white custom-border square-btn me-2 ${isDisabled ? 'disabled' : params.page === 1 ? 'disabled' : ''}`} onClick={() => handleFilter('page',1)}>
                        <MdKeyboardDoubleArrowLeft />
                    </p>
                    <p className={`btn custom-btn text-white custom-border square-btn me-2 ${isDisabled ? 'disabled' : params.page === 1 ? 'disabled' : ''}`} onClick={() => handlePagination('decrease')}>
                        <MdKeyboardArrowLeft />
                    </p>
                    <p className={`btn custom-btn text-white custom-border square-btn me-2 ${isDisabled ? 'disabled' : params.page >= pagingdetails.totalPage ? 'disabled' : ''}`} onClick={() => handlePagination('increase')}>
                        <MdKeyboardArrowRight />
                    </p>
                    <p className={`btn custom-btn text-white custom-border square-btn ${isDisabled ? 'disabled' : params.page === pagingdetails.totalPage ? 'disabled' : ''}`} onClick={() => handleFilter('page',pagingdetails.totalPage)}>
                        <MdKeyboardDoubleArrowRight />
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FoodPagination;

