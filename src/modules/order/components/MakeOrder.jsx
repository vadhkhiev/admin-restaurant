import React, { useEffect, useState } from 'react'
import {  useSelector } from 'react-redux'
import OrderingCard from './OrderingCard'
import YourOrder from './YourOrder'
import { useFoods } from '../../Food/Core/action'
import { useCategories } from '../../categories/core/action'
import useTable from '../../table/core/action'




const MakeOrder = () => {
  const [clickedIndex , setClickedIndex] = useState(0)  
  const {orderedFood} = useSelector((state) => state.orders)
  const {foodList} = useSelector((state) => state.foodList)
  const {categories} = useSelector((state) => state.category)
  const {fetchList} = useFoods();
  const {fetchCategories} = useCategories();
  const {getTableList } = useTable();
  const [selectedCategories, setSelectedCategories] = useState('');

  useEffect(() => {
    fetchList();
    fetchCategories();
    getTableList();
  },[])
  const handleClicked = (index)=>{
    setClickedIndex(index)
  }

  
  return (
    <>

     <div  className='m-3  p-3 rounded-3 custom-border'>
      <div>
      <div className=''>
      <h3  className='fw-bold text-white'>Making order</h3>
     
    </div>
    <main className='row mt-3'>
      <div className="col-12 mb-3 ">
       
        <section className='d-flex flex-wrap'>
        <span onClick={() => {
          setClickedIndex(0)
          setSelectedCategories('')
        }} style={{ background: clickedIndex === 0 ? '#27272a' : 'transparent'}} className={`mb-2 me-2 cursor-pointer ${clickedIndex === 0 ? 'text-white py-1 px-3 rounded-3 custom-border custom-btn' : 'custom-border custom-btn text-white py-1 px-3 rounded-3'}`}>All</span>
          {categories?.map((category, index) => (
          <span key={index} onClick={() =>{
            handleClicked(index + 1)
            setSelectedCategories(category.name)
          } } style={{ background: clickedIndex === index + 1 ? '#27272a' : 'transparent'}} className={` mb-2 me-2 overflow-s cursor-pointer ${clickedIndex === index + 1 ? 'text-white py-1 px-3 rounded-3 custom-border' : 'text-white py-1 px-3 rounded-3 custom-border custom-btn'}`}>{category.name}</span>
        ))}
        </section>
      </div>
      <div className={`mt-3 border-top pt-3 ${orderedFood?.length !== 0 ? 'col-12 col-lg-8 ' : 'col-12'}`}>
      {(selectedCategories ? 
          foodList?.filter((food) => 
            food.foodCategoryEntity?.name === selectedCategories
          ) : 
          foodList || []
        ).length === 0 ? 
          <p className='text-center text-white my-5 '>No Result.</p> : 
          <div className="row">
            {(selectedCategories ? 
              foodList?.filter((food) => 
                food.foodCategoryEntity?.name === selectedCategories
              ) : 
              foodList || []
            ).map((food) => (
              <OrderingCard key={food.id}  food={food} />
            ))}
          </div>
        }
        
      </div>
      <aside className={`mt-3 ${orderedFood?.length !== 0 ? 'col-12 col-lg-4  ' : 'd-none'}`}>
        <YourOrder/>
      </aside> 
    </main>
      </div>
    </div> 

    </>
  )
}

export default MakeOrder