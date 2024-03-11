import React from 'react'

const Inputfield = ({obj , action1,action2}) => {
  return (
    <>
        <div className="input-group flex-column flex-nowrap gap-3 mt-3">
              <div className='w-100 d-flex flex-column position-relative' >
                <span  className='d-flex position-absolute 'style={{top:'-10px',left:'10px',zIndex:'1',fontSize:'12px'}}>
                 <label >{obj.label1}</label><span className='text-danger'>*</span>
                </span>
                <input  onChange={action1} type={obj.type} className="form-control p-2" placeholder={obj.label1}   required />
              </div>
              <div className='w-100 d-flex flex-column position-relative'>
              <span className='d-flex position-absolute 'style={{top:'-10px',left:'10px',zIndex:'1',fontSize:'12px'}}>
                 <label >{obj.label2}</label><span className='text-danger'>*</span>
                </span>
                 <input onChange={action2} type={obj.type} className="form-control p-2" placeholder={obj.label2} required />
             </div>
          </div>
    </>
  )
}

export default Inputfield