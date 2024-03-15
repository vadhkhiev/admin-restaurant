import React from 'react'
import Table from './components/Table'

const Role = () => {
  return (
    <div className='m-5'>
        <div className='d-flex mb-3 justify-content-between'>
            <div className='d-flex'>
              <h3 style={{color:'#45495c'}} className='fw-bold d-flex align-items-center me-3'>Roles</h3>
              <button className='btn text-white' style={{background:'#6c738f'}}>Add</button>
            </div>
            <div className='d-flex align-items-center rounded' style={{background:'#6c738f'}}>
                <div  className='d-flex px-3' >
                    <span className='text-nowrap text-white pe-2'>
                        Show 
                    </span>
                    <div>
                    <select             
                    className="form-select py-0 bg-white"
                    aria-label="Default select example" 
                    >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                </div>
                </div>
            </div>
        </div>
        <div >
            <Table/>
        </div>
    </div>
  )
}

export default Role