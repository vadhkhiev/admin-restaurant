import React from 'react'

const Catebox = ({title , icon , num }) => {
  return (
    <>
    <div >
     <div  className='custom-border rounded-3 p-3 '>
          <div className='d-flex  flex-column'>
            <div className='d-flex   justify-content-between'>
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