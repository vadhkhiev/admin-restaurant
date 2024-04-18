import React from 'react'

const ConfirmOrderDelete = ({setDeletealert , deleteId , handleDelete}) => {
  return (
    <>
    <div>
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(62,64,87, 0.35)',
            zIndex: 9999,
          }}
          className='d-flex justify-content-center align-items-center'>
          <div style={{backdropFilter: 'blur(10px)'}} className='p-3 border  rounded text-center'>
            <p>
              Are you sure you want to{' '}
              <span className='text-danger'>delete</span>{' '}
              order id{' '}
              <b className='text-primary'>{deleteId}</b> from the list?
            </p>
            <div className='d-flex justify-content-center'>
              <button
                onClick={() => {
                  handleDelete(deleteId)
                  setDeletealert(false)
                }}
                className='btn btn-danger mx-3'
              >
                Delete
              </button>
              <button onClick={()=>setDeletealert(false)} className='btn btn-primary mx-3'>
                Cancel
              </button>
            </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default ConfirmOrderDelete