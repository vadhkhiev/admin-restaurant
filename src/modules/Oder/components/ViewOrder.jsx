import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import getorderid from '../core/getorderid';
import foodimg from '../../../assets/img/dummy.png'
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegWindowClose } from "react-icons/fa";
import updateOrder from '../core/updateOrder';

import { MdSaveAlt } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import axios from 'axios';
import AddFood from './AddFood';
const ViewOrder = () => {
  const id = useSelector((state) => state.orders.viewId); 
  const foodlist = useSelector((state)=> state.foodList.foodList)
  const orderinfo = useSelector((state) => state.orders.clickedorder[0]);
  const navigate = useNavigate();
  const [currentFood , setCurrentFood] = useState([])
  const [loadingscreen , setLoadingscreen] = useState(true)
  const [selectAll , setSelectAll] = useState(false)
  const [defaultorder , setDefaultorder] = useState({})
  const [defaultStatus , setDefaultStatus] = useState({})
  const [ showEdit , setShowEdit] = useState(false)
  const [message , setMessage] = useState('')
  const [error , setError] = useState('')
  const statuss = ['Prepare' , 'Cooking' , 'Complete' , 'Cancel']
  const [addmoreFood , setAddmoreFood] = useState([])
  const [addFood , setAddFood] = useState(false)



  useEffect(() => {
    if(selectAll === true){
      setCurrentFood(prev=> prev.map(obj=>({...obj,check:true})))
      setAddmoreFood(prev=> prev.map(obj=>({...obj,check:true})))
    }else{
      setCurrentFood(prev=> prev.map(obj=>({...obj,check:false})))
      setAddmoreFood(prev=> prev.map(obj=>({...obj,check:false})))
    }
  },[selectAll])
  const handleBack =()=>{
    navigate(-1)
  }
  const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');

useEffect(()=>{
  const fetchdata = async () => {
   try {
    const response = await getorderid(token , id)
    setCurrentFood(prev=> response.data.map(obj=>({...obj,check:false})))
    setDefaultorder(prev=> response.data.map(obj=>({...obj,check:false})))
    setDefaultStatus(prev=> response.data[0]?.orderEntity )
    setLoadingscreen(false)
   } catch (error) {
    setLoadingscreen(false)
   }
  }
  fetchdata();
},[message])
console.log(currentFood)

const handleDelete = () =>{
  setCurrentFood(prev=> prev.filter(obj=> obj.check === false))
  setAddmoreFood(prev=> prev.filter(obj=> obj.check === false))
  setSelectAll(false)
}
const handleChecked = (id)=>{
  setCurrentFood(prev=> prev.map(obj=>({...obj,check:obj.id === id ? !obj.check : obj.check})))
}


const css = {
  boxShadow: "rgba(0, 0, 0, 0.15) 1.4px 1.4px 2.2px",
  border: '1px solid #c0c8ff', 
  height: '80px',

};


const handleEdit = async ()=>{
    try {
      const response = await axios.put(`/api/orders/payment/${id}`,{paymentMethod : defaultStatus?.paymentMethod}
      ,{headers: {Authorization: `Bearer ${token}`}})
      await axios.put(`/api/orders/status/${id}`,{status : defaultStatus?.status},{headers: {Authorization: `Bearer ${token}`}})
      setShowEdit(!showEdit)
      setMessage(response.data.message)
      setTimeout(() => {
        setMessage('')
      }, 1000);
      
    } catch (error) {
      console.log(error)
      setError(error.response.data.message)
      setTimeout(() => {
        setError('')
      }, 1000);
    } 

  
}
const handleReset = () => {
  setCurrentFood(defaultorder)
  setAddmoreFood([])
  setSelectAll(false)
}
const handleAddmoreFood = (id) => {
  const existingFoodIndex = addmoreFood.findIndex(food => food.id === id);
  if (existingFoodIndex !== -1) {
      const updatedAddmoreFood = [...addmoreFood]; 
      updatedAddmoreFood[existingFoodIndex].check = !updatedAddmoreFood[existingFoodIndex].check; 
      setAddmoreFood(updatedAddmoreFood); 
  }
}

const handleSave = async () => {
  const curr = currentFood?.map((food) => {
    return {
      foodId: foodlist.find((f) => f.name === food.foodEntity.name)?.id,
      quantity: food.quantity,
    };
  });
  const add = addmoreFood?.map((food) => {
    return {
      foodId: foodlist.find((f) => f.name === food.name)?.id,
      quantity: food.quantity,
    };
  })

 if (currentFood.length === 0 && addmoreFood.length === 0) {
   alert('deleted')
  } 
  const orderUpdate = {tableId : orderinfo?.tableEntity?.id, userId : orderinfo?.userEntity?.id , items: [...curr, ...add]}
  if(orderUpdate){
    try {
      const result = await updateOrder(token, id, orderUpdate ); 
      setMessage(result.message);
      setAddmoreFood([]);
      setTimeout(() => {
        setMessage('');
      },1000);
      setError('');
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
    } 
  }
}


  return (
    <>
    {addFood && <AddFood addmoreFood={addmoreFood} setAddmoreFood={setAddmoreFood} setAddFood={setAddFood} />}
   <div className='m-3 d-flex justify-content-between'>
   <div className='ms-1'>
          <h3 style={{color:'#45495c'}} className='fw-bold '>Viewing order</h3> 
        </div>
    <button onClick={handleBack} className='btn text-white' style={{background:'#6c738f'}}>Back</button>
   </div>
    <div  className='m-3 mt-3 bg-white p-3 rounded-3 pb-5'>

      {/* decoration here */}
      <div className=' mb-4  mt-3 d-flex justify-content-between border-bottom pb-3'>
        <div>
          <h4 style={{color:'#45495c'}} className='fw-bold border-bottom'>Order ID : {orderinfo?.id} </h4>
        </div>
        <div className='d-flex'>
          {
            currentFood?.length > 0 ? <>
            <span className=' border rounded-3 p-2 me-3'>
             <div className=' d-flex'>
              <label style={{color:'#45495c'}} htmlFor="" className='text-nowrap '>Payment Method : 
              </label>
              <span className='ms-1 text-danger'>
               {showEdit ? <select onChange={(e)=>setDefaultStatus(prev=>({...prev,paymentMethod:e.target.value}))} className='form-select form-select-sm rounded-3' name="" id="">
                 {currentFood[0]?.orderEntity?.paymentMethod === 'Cash' ?
                  <>
                  <option  key={1} value="Cash" selected>Cash</option>
                  <option key={2} value="Bank">Bank</option>
                 </> :
                 <>
                 <option key={1}  value="Bank" selected>Bank</option>
                 <option key={2} value="Cash">Cash</option>
                 </>
                 }

               </select> : defaultStatus ? defaultStatus?.paymentMethod : currentFood[0]?.orderEntity?.paymentMethod}
              </span>
             </div>

           </span>
           <span className=' border rounded-3 p-2'>
            <div className=' d-flex'>
              <label style={{color:'#45495c'}} htmlFor="" className='text-nowrap '>Order Status : </label>
              <span className='ms-1 text-danger'>
                {showEdit ? <select onChange={(e)=>setDefaultStatus(prev=>({...prev,status:e.target.value}))} className='form-select form-select-sm rounded-3' name="" id="">
                  <option value={currentFood[0]?.orderEntity?.status}>{currentFood[0]?.orderEntity?.status}</option>
                 {statuss.filter(status => status !== currentFood[0]?.orderEntity?.status).map((status,index)=> <option key={index} value={status}>{status}</option>)}
                </select> :defaultStatus ? defaultStatus?.status : currentFood[0]?.orderEntity?.status}
                </span>
            </div>
           </span>
           <span className='d-flex  ms-3  rounded-3 p-2'>
           
            {showEdit ? <MdSaveAlt onClick={()=>handleEdit()}  className=' fs-3 cursor-pointer text-primary'/> : null}
            {!showEdit ?  <FaRegEdit onClick={()=>setShowEdit(true)}  className='ms-1  fs-4 cursor-pointer'/> : <FaRegWindowClose
            className='ms-3 mt-1 text-danger  fs-4 cursor-pointer' onClick={()=>setShowEdit(false)}/>}
            
           </span>
            </>
            : null
          }
        </div>

      </div>

      <main className='row mt-3 '>
      <section style={{width:'25%'}} className=' d-flex border-end '>
         <div  className=' rounded-3 w-100  '>
          <div className='p-2 rounded-3 ' >
          <div className=' p-2 border-bottom'>
             <h4 style={{color:'#45495c'}} className='fw-bold'>Table entity</h4>
             <div className='mt-1 d-flex justify-content-between'>
              <h5 style={{color:'#45495c'}} className=''>Name</h5>
              <span>{orderinfo?.tableEntity?.name}</span>
             </div>
             <div className='mt-1 d-flex justify-content-between'>
              <h5 style={{color:'#45495c'}} className=''>ID</h5>
              <span>{orderinfo?.tableEntity?.id}</span>
             </div>
    

          </div>
          <div className=' p-2 border-bottom'>
             <h4 style={{color:'#45495c'}} className='fw-bold'>Ordered by</h4>
             <div className='mt-1 d-flex justify-content-between'>
              <h5 style={{color:'#45495c'}} className=''>Name</h5>
              <span>{orderinfo?.userEntity?.name}</span>
             </div>
             <div className='mt-1 d-flex justify-content-between'>
              <h5 style={{color:'#45495c'}} className=''>ID</h5>
              <span>{orderinfo?.userEntity?.id}</span>
             </div>

          </div>

          <div className=' p-2'>
             <div className='mt-1 d-flex justify-content-between'>
              <h4 style={{color:'#45495c'}} className='fw-bold'>Total price</h4>
              <div>
              <span className='fw-bold me-1'><sup className='text-danger'>$</sup> {currentFood?.reduce((acc, curr) => acc + (curr.totalPrice || 0), 0)?.toFixed(2)} 
              </span>
              
              <span>
                
                {addmoreFood.length > 0 ?  <span className='fw-bold me-1'><sup className='text-danger'>+ $</sup>{(addmoreFood?.reduce((acc, curr) => acc + (((curr.price||0) * (1 - (curr.discount||0)/100)) * (curr.quantity||1)), 0)).toFixed(2)}</span> : null}
              </span>
              </div>
             
             </div>
             {
              addmoreFood.length > 0 ?  
              <div className='mt-1 d-flex justify-content-end'>
              <div>
                <span className='fs-3 fw-bold'>
                  =
                <sup className='fs-5 text-danger'>$</sup> {((currentFood?.reduce((acc, curr) => acc + (curr.totalPrice || 0), 0) || 0) + 
                (addmoreFood?.reduce((acc, curr) => acc + (((curr.price||0) * (1 - (curr.discount||0)/100)) * (curr.quantity||1)), 0) || 0)).toFixed(2)}
                </span>
              </div>
             </div> 
             : null
             }
          </div>
          </div>

         </div>
        </section>
        <section style={{width:'75%'}}  className=''>
          <div  className=''>
           <div className='d-flex justify-content-between mb-3'>
            <span className=' cursor-pointer'>
              <input 
              checked={selectAll}
              onChange={() => setSelectAll(!selectAll)} 
              className=' form-check-input me-2 cursor-pointer' type="checkbox" name="" id="" />
              Select All
            </span>
            <div>
            <span onClick={()=>setAddFood(true)} style={{backgroundColor:'#6c738f'}} className='btn border me-3 text-white'>
              Add Food
            </span>
            <span onClick={handleDelete} className='btn border'>
              delete
             <FaRegTrashAlt className='fs-4 ms-2 cursor-pointer text-danger ' style={{ color: '#6c738f' }} />
             </span>
            </div>
           </div>
            
     {/* card */}
     {
      currentFood?.length > 0 ?        currentFood?.map((food)=>(
        <div className=' mb-3 '>
        <div className='d-flex'> 
          <span className='ms-3 me-2'>
          <input
          onChange={()=> handleChecked(food.id)} 
           checked={food?.check} 
           
           className=' form-check-input cursor-pointer' type="checkbox" name="" id="" />
          </span>
        <div  className='position-relative rounded-3 w-100 overflow-hidden d-flex' style={css}>
          <div className='w-25 overflow-hidden'>
            <img width={'120px'} src={foodimg} alt='Food' />
          </div>
          <main className='ms-3 d-flex flex-row mt-2 w-75 position-relative ordercardwrapper'>
            <aside style={{ width: '60%' }}>
              <h4>{food.foodEntity.name}</h4>
              
             
            </aside>
            <aside style={{ width: '40%' }} className=' d-flex flex-column'>
              <div className=''>
                <h5>Price before discount <span className='ms-2 text-danger'>${(food?.foodEntity?.price).toFixed(2)}</span></h5>
                <p className=''>quantity ordered : <span className='text-danger ms-2'>{food.quantity}</span></p>
              </div>

            </aside>
          </main>
        </div>
        </div>
        
       </div>
       
       )) :
       loadingscreen? <div className='text-center'>Loading...</div> :
        (addmoreFood?.length === 0 && currentFood?.length === 0) && <div className='text-center text-danger'>Order is removed</div>

     }
     {addmoreFood?.length > 0 && <h4>Newly added</h4>}
     {
      
      (addmoreFood?.length > 0) && addmoreFood?.map((food)=>(
        <div className=' mb-3 '>
      <div className='d-flex'> 
        <span className='ms-3 me-2'>
        <input
        onChange={()=>handleAddmoreFood(food.id) }
         checked={food?.check} 
         
         className=' form-check-input cursor-pointer' type="checkbox" name="" id="" />
        </span>
      <div  className='position-relative rounded-3 w-100 overflow-hidden d-flex' style={css}>
        <div className='w-25 overflow-hidden'>
          <img width={'120px'} src={foodimg} alt='Food' />
        </div>
        <main className='ms-3 d-flex flex-row mt-2 w-75 position-relative ordercardwrapper'>
          <aside style={{ width: '60%' }}>
            <h4>{food?.name}</h4>
            
           
          </aside>
          <aside style={{ width: '40%' }} className=' d-flex flex-column'>
            <div className=''>
              <h5>Price before discount <span className='ms-2 text-danger'>${(food?.price).toFixed(2)}</span></h5>
              <p className=''>quantity ordered : <span className='text-danger ms-2'>{food.quantity}</span></p>
            </div>

          </aside>
        </main>
      </div>
      </div>
      
     </div> 
      ))
     }

           
          </div>
        </section>

      </main>
      <div className='d-flex justify-content-end'>
       <p onClick={handleSave} style={{background:'#6c738f'}} className='btn text-white'>Save</p>
       <p onClick={handleReset} className='btn bg-danger ms-2 text-white'>Reset</p>
      </div>

      
    </div>
    {
          message && <div style={{position:'fixed', top:'20px', left:'50%', transform:'translateX(-50%)', zIndex:4}} className="w-25 bg-success text-white text-center p-2 rounded ">
                {message}
              </div>
      }
      {
          error && <div style={{position:'fixed', top:'20px', left:'50%', transform:'translateX(-50%)', zIndex:4}} className="w-25 bg-danger text-white text-center p-2 rounded ">
                {error}
         </div>
      }
    </>
  )
}

export default ViewOrder