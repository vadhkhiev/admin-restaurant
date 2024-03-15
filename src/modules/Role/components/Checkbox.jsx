import React, { useState } from 'react'

const Checkbox = () => {
    const [check , setCheck]=useState(null)
    console.log(check)
  return (
    <>
      <div className="form-check form-switch">
        <input 
          className="form-check-input" 
          type="checkbox" 
          id="flexSwitchCheckDefault" 
          onChange={(e)=>setCheck(e.target.checked)}
        />
        <label 
          className="form-check-label" 
          htmlFor="flexSwitchCheckDefault"
        >
          Permission
        </label>
      </div>
    </>
  )
}

export default Checkbox