import React from 'react'

const Filterbar = ({setSortby ,setOrderby}) => {
  return (
    <>
        <div>
            <select
            className="form-select py-0"
            aria-label="Default select example"
            onChange={(e) => {
                setSortby(e.target.value);
            }}
            >
            <option value="">Sort by</option>
            <option value="name">Name</option>
            <option value="salary">Salary</option>
            <option value="email">Email</option>
            </select>
        </div>
        <div>
            <select
            onChange={(e) => {
                setOrderby(e.target.value);
            }}
            className="form-select py-0"
            aria-label="Default select example"
            >
            <option value="">Order by</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
            </select>
        </div>
    </>
  )
}

export default Filterbar