import React, { useState } from 'react'

const Checkbox = () => {
    const [check , setCheck]=useState(true)
  return (
    <>
    <div className='bg-white rounded-3 p-2'>
        {
            Array(7).fill(null).map((_,i) => (
                <div key={i} className='d-flex justify-content-between bg-white rounded-3 border align-items-center p-2 my-2'>
                    <div>
                        Permission list
                    </div>
                    <div className="form-check form-switch">
                        <input 
                        className="form-check-input" 
                        type="checkbox" 
                        id={`flexSwitchCheckDefault${i}`} 
                        />
                        <label 
                        className="form-check-label" 
                        htmlFor={`flexSwitchCheckDefault${i}`}
                        >
                        Permission
                        </label>
                    </div>
                </div>
            ))
        }
    </div>
    </>
  )
}

export default Checkbox