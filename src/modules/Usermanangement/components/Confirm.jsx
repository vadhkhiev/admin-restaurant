import React from 'react'

const Confirm = ({confirmDelete ,cancelDelete , confirm }) => {
  console.log(confirm)
  return (
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
              <b>{confirm.name}</b> from the list?
            </p>
            <div className='d-flex justify-content-center'>
              <button
                onClick={confirmDelete}
                className='btn btn-danger mx-3'
              >
                Delete
              </button>
              <button onClick={cancelDelete} className='btn btn-primary mx-3'>
                Cancel
              </button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Confirm