import React from 'react'

const Inputfield = ({obj , action1,action2}) => {
  return (
    <>
        <div className="input-group flex-column flex-nowrap gap-3 mt-3 ">
                <input style={{background:'#09090b'}}  onChange={action1} type={obj.type} className=" custom-border p-2 rounded-3 text-white" placeholder={obj.label1}   required />
                <input  style={{background:'#09090b'}} onChange={action2} type={obj.type} className=" custom-border p-2 rounded-3 text-white" placeholder={obj.label2} required />
          </div>
    </>
  )
}

export default Inputfield