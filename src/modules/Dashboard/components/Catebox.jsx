import React from 'react'

const Catebox = ({title , icon , num , color}) => {
  return (
    <>
     <div className='col-3 p-1 '>
        <div style={{ background: color, boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" }} className=' rounded p-3'>
          <div className='d-flex  flex-column'>
            <div className='d-flex  align-items-center justify-content-between'>
              <h4 className='fw-bold text-white'>{title}</h4>
              <span className='text-white fs-3'>{icon}</span>
            </div>
            <div>
              <p className=' fs-2 fw-bold text-white'>{num}</p>
            </div>
          </div>
        </div>
     </div>
    </>
  )
}

export default Catebox