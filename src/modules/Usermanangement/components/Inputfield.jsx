import React from 'react'

const Inputfield = ({obj , action1,action2}) => {
  return (
    <>
        <div className="input-group flex-nowrap gap-3 mt-3">
              <div className='w-50 d-flex flex-column' >
                <div className='d-flex'>
                 <label >{obj.label1}</label><span className='text-danger'>*</span>
                </div>
                <input  onChange={action1} type={obj.type} className="form-control" placeholder={obj.label1}   required />
              </div>
              <div className='w-50 d-flex flex-column'>
                <div className='d-flex'>
                  <label >{obj.label2}</label><span className='text-danger'>*</span>
                 </div>
                 <input onChange={action2} type={obj.type} className="form-control" placeholder={obj.label2} required />
             </div>
          </div>
    </>
  )
}

export default Inputfield