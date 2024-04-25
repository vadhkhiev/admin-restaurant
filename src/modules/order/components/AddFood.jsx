import React, { useEffect, useState } from 'react'
import { IoCloseCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import foodimg from '../../../assets/img/dummy.png'
import { FiTrash } from 'react-icons/fi';
import { storeAddFoodToggle } from '../core/reducer';
import { useCategories } from '../../categories/core/action';
import { useFoods } from '../../Food/Core/action';
const AddFood = ({handleAddtionalFood}) => {
    const {foodList} = useSelector((state) => state.foodList)
    const {categories} = useSelector((state) => state.category)
    const { filterByCategory} = useFoods();
    const {fetchCategories} = useCategories();
    const [addFood , setAddFood] = useState([])
    const [selectAll , setSelectAll] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        fetchCategories();
    }, []);
    
    


    const handleAdd = (food) => {
        const existingFoodIndex = addFood.findIndex((item) => item.id === food.id);
        
        if (existingFoodIndex !== -1) {
          const updatedAddFood = [...addFood];
          updatedAddFood[existingFoodIndex].quantity += 1;
          setAddFood(updatedAddFood);
        } else {
          setAddFood([...addFood, { ...food, quantity: 1, checked: false }]);
        }
      };
      
    
    const handleMinus = (id) => {
        const updatedAddFood = addFood.map((food) => {
          if (food.id === id && food.quantity > 1) {
            return { ...food, quantity: food.quantity - 1 };
          } else {
            return food;
          }
        });
        setAddFood(updatedAddFood);
      };
     const handlePlus = (id) => {
        const updatedAddFood = addFood.map((food) =>
          food.id === id ? { ...food, quantity: food.quantity + 1 } : food
        );
        setAddFood(updatedAddFood);
      };

      const handleCheck = (id) => {
        const updatedAddFood = addFood.map((food) =>
          food.id === id ? { ...food, checked: !food.checked } : food
        );
        setAddFood(updatedAddFood);
      };

      const handleDelete = () => {
        const updatedAddFood = addFood.filter((food) => !food.checked);
        setAddFood(updatedAddFood);
        setSelectAll(false);
      };
      

    const toggleCheck = () => {
        const updatedAddFood = addFood.map((food) => ({ ...food, checked: !selectAll }));
        setAddFood(updatedAddFood);
        setSelectAll(!selectAll);
      };

    const handleAddOrder = () => {
        handleAddtionalFood(addFood)
        dispatch(storeAddFoodToggle(false))
    }
    
    
    
    const css = {
        boxShadow: "rgba(0, 0, 0, 0.15) 1.4px 1.4px 2.2px",
        border: '1px solid #c0c8ff', 
        height: '80px',
      };

      

  return (
    <>
          <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(10,10,10, 0.35)",
          zIndex: 3,
        }}
        className="d-flex justify-content-center "
      ><div  className='p-3 border rounded-3 col-12  m-3 overflow-hidden' style={{backdropFilter: "blur(5px)" }}>
        <IoCloseCircleOutline onClick={()=>dispatch(storeAddFoodToggle(false))} className='cursor-pointer position-absolute top-0 start-0 m-2 fs-3 text-danger'/>
        <div className='m-3 '>
            <h3 className='text-white'>Select Food</h3>
            <div className='py-2'>
                <div>
                    <select onChange={(e)=>filterByCategory(e.target.value)} className='form-select w-25 bg-transparent' name="" id="">
                        <option hidden value="">Categories</option>
                        <option value="">All</option>
                        {categories?.map((food, index) => (
                            <option key={index} value={food.name}>{food.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <main className='row overflow-scroll ' style={{ maxHeight: '75vh', overflowY: 'scroll' }}>
                <section className={`  col-12 col-md-12 ${addFood.length === 0 ? ' col-lg-12': ' col-lg-8' } `} >
                {
                    <div className='row'>
    {foodList.length === 0 ? (
        <div className='text-danger text-center'>No Result.</div>
    ) : (
      foodList?.map((food, index) => (
            <div key={index} className='col-md-12 col-lg-6 mb-3'>
                <div className='position-relative rounded-3 overflow-hidden d-flex' style={css}>
                    <div className='w-25 overflow-hidden'>
                        <img width={'120px'} src={food.foodImage|| foodimg} alt='Food' />
                    </div>
                    <main className='ms-3 d-flex flex-row mt-2 w-75 position-relative '>
                        <aside style={{ width: '60%' }}>
                            <h4 className='text-white'>{food.name}</h4>
                            <p className='text-white-50 w-100'>{food.description}</p>
                        </aside>
                        <aside style={{ width: '40%' }} className=' d-flex flex-column'>
                            <div className='d-flex'>
                                <h5 className='text-white'><sup className='text-danger'>$</sup>{food.price}.00</h5>
                                <h5 className='text-danger ms-2'>-{food.discount}%</h5>
                            </div>
                            <div className='ms-2'>
                                <button 
                                    onClick={() => handleAdd(food)}
                                    className='btn text-white custom-btn custom-border'
                                >
                                    Add
                                </button>
                            </div>
                        </aside>
                    </main>
                </div>
            </div>
        ))
    )}
</div>

}

                </section>
                {
                    addFood.length > 0 &&   <section className='col-12 col-md-12 col-lg-4  rounded-3'>
                    <div className='d-flex justify-content-between '>
                                   <p>
                                <input  onChange={()=>toggleCheck()} checked={selectAll} className='form-check-input me-1 text-white' type="checkbox" />
                                Select All
                            </p>
                            <p  onClick={handleDelete}  className='border text-white p-1 rounded cursor-pointer' >
                            Delete
                            <FiTrash   className='ms-2 text-danger  fs-4'/>
                            </p>
                        </div>
    
                        <section className='' >
                        <div className='w-100 p-2 mb-2 border rounded-3'>
                                    {
                                        addFood?.map((food , index)=>(
                                            <div key={index} className='d-flex border-bottom  p-2'>
                                                <input 
                                                    checked={food.checked}
                                                    className='form-check-input me-1' 
                                                    type="checkbox" 
                                                    onChange={()=>handleCheck(food.id)}
                                                />
    
                                                <div style={{width:'33%'}}>
                                                    <div className='d-flex'>
                                                    <img className='rounded-3' width={50} src={food.foodImage || foodimg} alt="" />
                                                    <h6 className='ms-2 text-nowrap text-white'>{food.name.length > 15 ? food.name.slice(0,15) + '...' : food.name}</h6>
                                                    
                                                    </div>
                                                        
                                                </div>
                                                <div style={{width:'33%'}} className='d-flex  justify-content-end align-items-center'>
                                                <span onClick={()=>handleMinus(food.id)} className='fw-bold pe-2 mb-2 fs-4 cursor-pointer text-danger' >-</span>
                                                <h4 className='text-white'>{food.quantity}</h4>
                                                <span style={{color:'#6c738f'}} onClick={()=>handlePlus(food.id)} className='fw-bold ps-2 mb-2 fs-4 cursor-pointer ' >+</span>
                                                </div>
                                                <div style={{width:'33%'}} className='d-flex justify-content-end align-items-center'>
                                                <h6 className='ms-2 text-white'><sup className='text-danger'>$</sup>{food.price}</h6>
                                                </div>
                                            </div>
                                        ))
                                    }
                                 </div>
                        
                        </section>
                        <div className='d-flex justify-content-between my-4'>
                            <h4 className='' style={{color: '#6c738f'}}>Total Amount :  </h4>
                            <h4 className='text-danger'> <sup>$</sup>{ (addFood?.reduce((acc, curr) => acc + (((curr.price * curr.quantity) * (1 - (curr.discount / 100)))), 0)).toFixed(2)}</h4>
                        </div>
                        <div>
                            <button onClick={handleAddOrder}  className='btn custom-btn custom-border w-100 text-white fw-bold' >Add Order</button>
                        </div>
                    </section>
                }
            </main>
                   


        </div>
        </div>
      </div>
    </>
  )
}

export default AddFood