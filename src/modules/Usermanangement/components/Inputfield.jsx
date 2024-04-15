import React from 'react'

const Inputfield = ({obj , action1,action2}) => {
  return (
    <>
        <div className="input-group flex-column flex-nowrap gap-3 mt-3">
              <div className='w-100 d-flex text-white' >
                <input style={{background:'#09090b'}}  onChange={action1} type={obj.type} className="form-control form-control-lg custom-border" placeholder={obj.label1}   required />
              </div>
              <div className='w-100 d-flex flex-column'>
                 <input  style={{background:'#09090b'}} onChange={action2} type={obj.type} className="form-control form-control-lg  custom-border" placeholder={obj.label2} required />
             </div>
          </div>
    </>
  )
}

export default Inputfield