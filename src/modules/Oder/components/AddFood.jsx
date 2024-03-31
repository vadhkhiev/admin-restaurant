import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoCloseCircleOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';
import foodimg from '../../../assets/img/dummy.png'
import { FiTrash } from 'react-icons/fi';
const AddFood = ({setAddFood , setAddmoreFood ,addmoreFood}) => {
    const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');
    const foods = useSelector((state) => state.foodList.foodList)
    const [foodlist , setFoodlist] =  useState(foods)
    const [defaultFood , setDefaultFood] = useState(foods)
    const [categories , setCategories] = useState([])
    const [selectedCategories , setSelectedCategories] = useState('')
    const [storeFood , setStoreFood] = useState([])
    const [selectAll , setSelectAll] = useState(false)

    console.log(storeFood)


    useEffect(() => {
        if (selectedCategories !== '') {
            const filteredFoodList = defaultFood.filter(food => food.foodCategoryEntity?.name === selectedCategories);
            setFoodlist(filteredFoodList); 
        } else {
            setFoodlist(defaultFood);
        }
    }, [selectedCategories, defaultFood]);
    
    

    console.log(foodlist)
    console.log(selectedCategories)
    

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get('/api/categories', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                console.log(response.data)
                setCategories(response.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata()
    },[])

    const handleAdd = (id) => {
        const existingFoodIndex = storeFood.findIndex(food => food.id === id);
    
        if (existingFoodIndex !== -1) {
            const updatedFood = [...storeFood];
            updatedFood[existingFoodIndex].quantity++;
            setStoreFood(updatedFood);
        } else {
            const newFood = foodlist.find(food => food.id === id);
            const foodWithQuantity = { ...newFood, quantity: 1 , check : false };
            setStoreFood([...storeFood, foodWithQuantity]);
        }
    }
    const updateQuantity = (id, increment) => {
        const existingFoodIndex = storeFood.findIndex(food => food.id === id);
        
        if (existingFoodIndex !== -1) {
            const updatedFood = [...storeFood];
            updatedFood[existingFoodIndex].quantity += increment;
            setStoreFood(updatedFood.filter(food => food.quantity > 0));
        }
    }
    
    const handleMinus = (id) => updateQuantity(id, -1);
    const handlePlus = (id) => updateQuantity(id, 1);
    

    const handleCheck = (id) => {
        const existingFoodIndex = storeFood.findIndex(food => food.id === id);
        if (existingFoodIndex !== -1) {
            const updatedFood = [...storeFood];
            updatedFood[existingFoodIndex].check = !updatedFood[existingFoodIndex].check;
            setStoreFood(updatedFood);
        }
    }
    const handleClearCheck = () => {
        setStoreFood(storeFood.filter(food => !food.check));
        setSelectAll(false);
    }

    const toggleCheck = () => {
        const updatedFood = storeFood.map(food => ({ ...food, check: !selectAll }));
        setStoreFood(updatedFood);
        setSelectAll(!selectAll);
    }

    const handleAddOrder = () => {

        const existingFoodIndex = addmoreFood.findIndex(item => storeFood.some(food => food.id === item.id));
    
        if (existingFoodIndex !== -1) {

            const updatedFood = [...addmoreFood];
            storeFood.forEach(newFood => {
                const index = updatedFood.findIndex(item => item.id === newFood.id);
                if (index !== -1) {
                    updatedFood[index].quantity += newFood.quantity;
                } else {
                    updatedFood.push({ ...newFood }); // Add new item
                }
            });
            setAddmoreFood(updatedFood);
        } else {

            setAddmoreFood(prev => [...prev, ...storeFood.map(food => ({ ...food }))]);
        }
        setAddFood(false);
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
          backgroundColor: "rgba(62,64,87, 0.35)",
          zIndex: 3,
        }}
        className="d-flex justify-content-center "
      ><div  className='p-3 border rounded-3 col-12  m-3 overflow-hidden' style={{backdropFilter: "blur(10px)" }}>
        <IoCloseCircleOutline onClick={()=>setAddFood(false)} className='cursor-pointer position-absolute top-0 start-0 m-2 fs-3 text-danger'/>
        <div className='m-3 '>
            <h3 className='text-white'>Select Food</h3>
            <div className='py-2'>
                <div>
                    <select onChange={(e)=>setSelectedCategories(e.target.value)} className='form-select w-25' name="" id="">
                        <option hidden value="">Categories</option>
                        <option value="">All</option>
                        {categories?.map((food, index) => (
                            <option key={index} value={food.name}>{food.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <main className='row overflow-scroll ' style={{ maxHeight: '75vh', overflowY: 'scroll' }}>
                <section className={`row  col-12 col-md-12 ${storeFood.length === 0 ? ' col-lg-12': ' col-lg-8' } `} >
                {
                    foodlist.length === 0 ? <div className=' text-danger text-center '>No food was found matching the selected category</div> :  foodlist?.map((food)=>{
                        return (
                             <div className= 'col-sm-12 col-md-12 col-lg-6 mb-3'>
                             <div className='position-relative rounded-3 overflow-hidden d-flex' style={css}>
                                <div className='w-25 overflow-hidden'>
                                <img width={'120px'} src={foodimg} alt='Food' />
                                </div>
                                <main className='ms-3 d-flex flex-row mt-2 w-75 position-relative ordercardwrapper'>
                                <aside style={{ width: '60%' }}>
                                    <h4>{food.name}</h4>
                                    <p className='text-muted w-100'>{food.description}</p>
                                </aside>
                                <aside style={{ width: '40%' }} className=' d-flex flex-column'>
                                    <div className='d-flex'>
                                    <h5>${food.price}.00</h5>
                                    <h5 className='text-danger ms-2'>-{food.discount}%</h5>
                                    </div>
                                    <div className='ms-2'>
                                    <button style={{ background: '#6c738f' }}
                                    onClick={()=>handleAdd(food.id)}
                                     className='btn text-white' >Add</button>
                                    </div>
                                </aside>
                                </main>
                            </div>
                        </div>

                        )
                    })
                }
                </section>
                {
                    storeFood.length > 0 &&              <section className='col-12 col-md-12 col-lg-4'>
                    <div className='d-flex justify-content-between'>
                                   <p>
                                <input  onChange={()=>toggleCheck()} checked={selectAll} className='form-check-input me-1' type="checkbox" />
                                Select All
                            </p>
                            <p  onClick={handleClearCheck} className='border p-1 rounded cursor-pointer' >
                            Delete
                            <FiTrash   className='ms-2 text-danger  fs-4'/>
                            </p>
                        </div>
    
                        <section >
                        <div className='w-100 p-2 mb-2 border rounded-3'>
                                    {
                                        storeFood?.map((food , index)=>(
                                            <div key={index} className='d-flex border-bottom p-2'>
                                                    <input 
                                                        checked={food.check}
                                                        className='form-check-input me-1' 
                                                        type="checkbox" 
                                                        onChange={()=>handleCheck(food.id)}
                                                    />
    
                                                <div style={{width:'33%'}}>
                                                    <div className='d-flex'>
                                                    <img className='rounded-3' width={50} src={foodimg} alt="" />
                                                    <h6 className='ms-2 text-nowrap'>{food.name.length > 15 ? food.name.slice(0,15) + '...' : food.name}</h6>
                                                    
                                                    </div>
                                                        
                                                </div>
                                                <div style={{width:'33%'}} className='d-flex  justify-content-end align-items-center'>
                                                <span onClick={()=>handleMinus(food.id)} className='fw-bold pe-2 mb-2 fs-4 cursor-pointer text-danger' >-</span>
                                                <h4>{food.quantity}</h4>
                                                <span style={{color:'#6c738f'}} onClick={()=>handlePlus(food.id)} className='fw-bold ps-2 mb-2 fs-4 cursor-pointer ' >+</span>
                                                </div>
                                                <div style={{width:'33%'}} className='d-flex justify-content-end align-items-center'>
                                                <h6 className='ms-2'><sup>$</sup>{food.price}</h6>
                                                </div>
                                            </div>
                                        ))
                                    }
                                 </div>
                        
                        </section>
                        <div className='d-flex justify-content-between my-4'>
                            <h4 className='' style={{color: '#6c738f'}}>Total Amount :  </h4>
                            <h4 className='text-danger'> <sup>$</sup>{ (storeFood?.reduce((acc, curr) => acc + (((curr.price * curr.quantity) * (1 - (curr.discount / 100)))), 0)).toFixed(2)}</h4>
                        </div>
                        <div>
                            <button onClick={handleAddOrder}  style={{background: '#6c738f'}} className='btn w-100 text-white fw-bold' >Add Order</button>
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