import React from 'react'

const Confirm = ({confirmDelete ,cancelDelete , confirm }) => {
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