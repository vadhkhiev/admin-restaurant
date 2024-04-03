import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OrderingCard from './OrderingCard'
import {  useNavigate } from 'react-router-dom'
import { clearOrderedFood, storeOrderedFood } from '../core/foodCartSlice'
import YourOrder from './YourOrder'
import { all } from 'axios'



const MakeOrder = () => {
  const allfood = useSelector((state) => state.foodList.foodList)
  const cartFood = useSelector((state) => state.foodCart?.orderedFood)
  const foodcategory = useSelector((state) => state.allCategory.listCategories)
  const [clickedIndex , setClickedIndex] = useState(0) 
  const navigate = useNavigate() 
  const dispatch = useDispatch() 
  const [selectedCategories, setSelectedCategories] = useState('');
  const handleClicked = (index)=>{
    setClickedIndex(index)
  }
  const toggleCart = (id) =>{
     dispatch(storeOrderedFood(allfood.find(food => food.id === id))) 

  }


  console.log(allfood)
  

  return (
    <>

    <div  className='m-3 border p-3 rounded-3 bg-white'>
      <div>
      <div className=''>
      <h3 style={{color:'#45495c'}} className='fw-bold '>Making order</h3>
     
    </div>
    <main className='row mt-3'>
      <div className="col-12 mb-3 ">
       
        <div className='d-flex flex-wrap'>
        <span onClick={() => {
          setSelectedCategories('')
          setClickedIndex(0)
        }} style={{ background: clickedIndex === 0 ? 'transparent' : '#6c738f'}} className={`mb-2 me-2 cursor-pointer ${clickedIndex === 0 ? 'text-dark py-2 px-3 rounded-pill border' : 'text-white py-2 px-3 rounded-pill'}`}>All</span>
        {foodcategory?.map((category, index) => (
          <span key={index} onClick={() =>{
            handleClicked(index + 1)
            setSelectedCategories(category.name)
          } } style={{ background: clickedIndex === index + 1 ? 'transparent' : '#6c738f'}} className={` mb-2 me-2 overflow-s cursor-pointer ${clickedIndex === index + 1 ? 'text-dark py-2 px-3 rounded-pill border' : 'text-white py-2 px-3 rounded-pill'}`}>{category.name}</span>
        ))}
        </div>
      </div>
      <div className={`mt-3 border-top pt-3 ${cartFood?.length !== 0 ? 'col-12 col-lg-8 ' : 'col-12'}`}>
        {(selectedCategories ? 
          allfood?.filter((food) => 
            food.foodCategoryEntity?.name === selectedCategories
          ) : 
          allfood || []
        ).length === 0 ? 
          <p className='text-center text-danger my-5 '>No food was found matching the selected category</p> : 
          <div className="row">
            {(selectedCategories ? 
              allfood?.filter((food) => 
                food.foodCategoryEntity?.name === selectedCategories
              ) : 
              allfood || []
            ).map((food) => (
              <OrderingCard key={food.id} toggleCart={toggleCart} food={food} />
            ))}
          </div>
        }
        
      </div>
      {/* checkout part  */}
      <aside className={`mt-3 ${cartFood?.length !== 0 ? 'col-12 col-lg-4  ' : 'd-none'}`}>
        <YourOrder/>
      </aside> 
    </main>
      </div>
    </div>

    </>
  )
}

export default MakeOrder