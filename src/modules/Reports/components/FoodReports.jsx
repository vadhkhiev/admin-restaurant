import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import loadingImg from '../../../assets/img/loading.gif' 
const FoodReports = () => {
  const [startDate , setStartDate ] = useState('')
  const [endDate , setEndDate ] = useState('')
  const [reportData , setReportData ] = useState([])
  const [currpage , setCurrpage] = useState(1)
  const [pagingdetails, setPagingdetails] = useState({});
  const [loadingScreen , setLoadingScreen] = useState(true)
  const [size , setSize] = useState(20)
  const [filterbar , setFilterbar] = useState(false)
  const token = useSelector((state) => state.auth.token) || localStorage.getItem('token')

  useEffect(() => {
    if(startDate === '' || endDate === '') {
      return;
    }
    setStartDate(startDate.replace(/-/g, ":"))
    setEndDate(endDate.replace(/-/g, ":"))
  },[startDate,endDate]);

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    console.log(`${year}:${month}`);
   const fetchData = async () => {
    try {
      const url = `/report/food?month=${year}:${month}${startDate ? '&start=' + startDate : ''}${endDate ? '&end=' + endDate : ''}&page=${currpage}&size=${size}`;
      const headers = {
        'Authorization': `Bearer ${token}`
      };
      const response = await axios.get(url, { headers });
      setReportData(response.data.data);
      setPagingdetails(response.data.paging);
      console.log(response.data);
    } catch (error) {
      // Handle error here
    } finally {
      setLoadingScreen(false);
    }
  }; fetchData();
  }, [startDate, endDate, currpage,size]);

 



  const handlePagination = (paging) => {
    window.scrollTo(0, 0);
    if (paging === 'increase') {
      setCurrpage(pagingdetails.totalPage === currpage ? currpage : currpage + 1 );
    } else {
      setCurrpage(currpage === 1 ? 1 : currpage - 1);
    }
  }

  console.log(startDate,endDate)


  return (
    <>
     <div className='m-3 mt-0'>
      { /* start of div */ }
      <div style={{height:'35px'}} className='d-flex justify-content-between mb-3'>
        <div>
         <h3 style={{color:'#45495c'}} className='fw-bold mb-3'>Food Report <span className='text-primary fs-5'>
         {`${!(startDate && endDate) ? '(This Month)' : '' }`}</span></h3>
        </div>
        <div className='d-flex'>
          <div  style={{background:'#6c738f' , height:'35px'}} className='p-1 pb-2 rounded-start-3'>
            <button 
            onClick={() => setFilterbar(!filterbar)}
            className='btn p-1 px-3 ps-2 text-white fw-bold'> {`${filterbar ? '>' : '<'} Filter`}</button>
          </div>
          <div style={{height:'35px',backgroundColor:'#6c738f'}} className={`${filterbar ? '' : 'd-none'} d-flex p-1 px-3`}>
          <div className='d-flex text-nowrap'>
           <label className='p-1 text-white ' htmlFor="">Start date</label>
           <input 
           onChange={(e) => setStartDate(e.target.value)}
            className='form-control' type="date" name="" id="" />
          </div>
          <div className='d-flex text-nowrap'>
          <label className='p-1 text-white ' htmlFor="">End date</label>
           <input
           onChange={(e) => setEndDate(e.target.value)}
            className='form-control' type="date" name="" id="" />
          </div>
          <div className='d-flex ms-3'>
            <label htmlFor="" className=' text-white p-1'>Show</label>
            <select 
            onChange={(e) => setSize(parseInt(e.target.value))}
            className='form-select form-select-sm rounded ms-3' name="" id="">
              <option value="20">
                20
              </option>
              <option value="30">
                30
              </option>
              <option value="50">
                50
              </option>
            </select>
          </div>
          </div>

        </div>
      </div>
      {
        loadingScreen ? ( /* start of loading screen */ 
          <div className="d-flex justify-content-center">
            <p className="fs-4">Loading...</p>
            <div>
             <img width={20} src={loadingImg} alt="" />
            </div>
          </div>
        ) : (      
        reportData.length > 0 ? ( /* start of table */ 
          <table className='table bg-white rounded-3'>
          <thead>
            <tr>
              <th scope='col'>ID</th>
              <th scope='col'>Food Name</th>
              <th scope='col'>Price per Unit</th>
              <th scope='col'>Quantity Sold</th>
              <th scope='col'>Total Price</th>
            </tr>
          </thead>
          <tbody>
            
            {reportData.map((report, index) => (
              <tr key={index}>
                <td className='fw-bold '>{report?.foodEntity?.id}</td>
                <td className='fw-bold '>{report?.foodEntity?.name}</td>
                <td className='fw-bold '><sup className='text-danger'>$</sup>{(report?.unitPrice).toFixed(2)}</td>
                <td className='fw-bold'>{report?.totalQuantitySold} unit</td>
                <td className='fw-bold'>
                  <sup className='text-danger fw-bold'>$</sup>{(report?.totalPrice).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  ) : (
    <p className='text-center text-danger'>No Data found</p>
  )

  ) /* end of table */ 
      }
      {
        reportData.length > 0 && (
          <div className='p-0 d-flex justify-content-center'>
            <nav aria-label="Page navigation example">
              <ul className="pagination list-unstyled d-flex justify-content-center align-items-center">
                <li className="page-item underline-none me-4">
                  <a onClick={() => handlePagination('decrease')} style={{ fontSize: '25px' }} className="page-link" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li className="page-item underline-none" style={{ display: 'flex', gap: '5px', width: '60px' }}>
                  <span className="page-link" style={{ fontSize: '18px' }}>{currpage}</span>
                  <span className="page-link" style={{ fontSize: '18px' }}>/</span>
                  <span className="page-link" style={{ fontSize: '18px' }}>{pagingdetails?.totalPage}</span>
                </li>
                <li className="page-item">
                  <a onClick={() => handlePagination('increase')} style={{ fontSize: '25px' }} className="page-link" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>

          </div>
        ) /* end of pagination */ 
      }
      { /* end of div */ }
     </div>
    </>
  )
}

export default FoodReports