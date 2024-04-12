import React from 'react'
import { IoCloseSharp } from "react-icons/io5";
const SearchBar = ({params , handleFilter}) => {
  return (
    <>
    <div className='d-flex'>
    <input 
                onChange={(e)=>{
                  handleFilter('query',e.target.value)
                  handleFilter('page', 1)
                }
                }
                name="query"
                style={{ width: '35%', background:'#0d0d0e'}} 
                type="text" 
                value={params.query}
                className="form-control text-white  rounded-3" 
                placeholder="Search" 
            />
            {
              !params.query =='' && <button
              type="reset"
              onClick={(e)=>handleFilter('query','')}
              name="query"
              value=''
              className="btn custom-btn text-white custom-border ms-2 px-2 "
            >
              Reset
              <IoCloseSharp className="ms-1" />
            </button>
            }
    </div>
    </>
  )
}

export default SearchBar