import React from 'react'

const CreateUser = () => {
  return (
    <div>
            <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
          }}
          className='d-flex justify-content-center align-items-center'>
          <div className='p-3 bg-white rounded text-center'>
            <p>
                
            </p>
            <div className='d-flex justify-content-center'>
              <button
              
                className='btn btn-danger mx-3'
              >
                Delete
              </button>
              <button  className='btn btn-primary mx-3'>
                Submit
              </button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default CreateUser