import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OrderingCard from './OrderingCard'
import {  useNavigate } from 'react-router-dom'
import { clearOrderedFood, storeOrderedFood } from '../core/foodCartSlice'
import YourOrder from './YourOrder'



const MakeOrder = () => {
  const allfood = useSelector((state) => state.foodList.foodList)
  const cartFood = useSelector((state) => state.foodCart?.orderedFood)
  const foodcategory = useSelector((state) => state.allCategory.listCategories)
  const [clickedIndex , setClickedIndex] = useState(0) 
  const navigate = useNavigate() 
  const dispatch = useDispatch() 
  const handleBack =()=>{
    navigate(-1)
  }
  const handleClicked = (index)=>{
    setClickedIndex(index)
  }
  const toggleCart = (id) =>{
     dispatch(storeOrderedFood(allfood.find(food => food.id === id))) 

  }
  

  return (
    <>

    <div className='m-3'>
    <div className='d-flex justify-content-between'>
      <h3 style={{color:'#45495c'}} className='fw-bold '>Making order</h3>
      <button onClick={handleBack} className='btn text-white' style={{background:'#6c738f'}}>Back</button>
    </div>
    <main className='row mt-3'>
      <div className="col-12 mb-3">
        <span onClick={() => handleClicked(0)} style={{ background: clickedIndex === 0 ? 'transparent' : '#6c738f'}} className={`mb-2 me-2 cursor-pointer ${clickedIndex === 0 ? 'text-dark py-2 px-3 rounded-pill border' : 'text-white py-2 px-3 rounded-pill'}`}>All</span>
        {foodcategory?.map((category, index) => (
          <span key={index} onClick={() => handleClicked(index + 1)} style={{ background: clickedIndex === index + 1 ? 'transparent' : '#6c738f'}} className={`mb-2 me-2 cursor-pointer ${clickedIndex === index + 1 ? 'text-dark py-2 px-3 rounded-pill border' : 'text-white py-2 px-3 rounded-pill'}`}>{category.name}</span>
        ))}
      </div>
      <div className={`${cartFood?.length !== 0 ? 'col-12 col-lg-8 ' : 'col-12'}`}>
        <div className="row">
        {
          allfood?.map((food)=>(
            <OrderingCard key={food.id} toggleCart={toggleCart} food={food} />
          ))
        }
        </div>
        
      </div>

      {/* checkout part  */}
      <aside className={`${cartFood?.length !== 0 ? 'col-12 col-lg-4  ' : 'd-none'}`}>
        <YourOrder/>
      </aside> 
    </main>
    </div>

    </>
  )
}

export default MakeOrder