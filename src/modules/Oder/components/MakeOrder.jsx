import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import OrderingCard from './OrderingCard'
import { NavLink, useNavigate } from 'react-router-dom'


const MakeOrder = () => {
  const allfood = useSelector((state) => state.foodList.foodList)
  const foodcategory = useSelector((state) => state.allCategory.listCategories)
  const [clickedIndex , setClickedIndex] = useState(0) 
  const navigate = useNavigate() 
  const handleBack =()=>{
    navigate(-1)
  }
  const handleClicked = (index)=>{
    setClickedIndex(index)
  }

  console.log(allfood)

  return (
    <>

    <div className='m-3'>
    <div className='d-flex justify-content-between'>
      <h3 style={{color:'#45495c'}} className='fw-bold '>Making order</h3>
      <button onClick={handleBack} className='btn text-white' style={{background:'#6c738f'}}>Back</button>
    </div>
    <main className='row mt-3'>
      <div className="col-12 mb-3">
        {
          foodcategory?.map((category , index)=>(
            <span onClick={()=>handleClicked(index)} style={{ background: clickedIndex == index ? 'white' : '#6c738f'}} className={`mb-2 me-2 ${clickedIndex == index ? 'text-dark py-2 px-3 rounded-pill border' : 'text-white py-2 px-3 rounded-pill'} `}>{category.name}</span>
          ))
        }
      </div>
      <div className='col-12 '>
        <div className="row">
        {
          allfood?.map((food)=>(
            <OrderingCard food={food} />
          ))
        }
        </div>
        
      </div>

      {/* checkout part  */}
      <aside className='col-4'>

      </aside> 
    </main>
    </div>

    </>
  )
}

export default MakeOrder