import React from 'react'
import DoughnutChart from './components/DoughnutChart'

const Home = () => {
  return (
    <div>
      <div className="row">
        <div className="col-6">
         <h5 className="card-title">Home</h5>
        </div>
        <div className="col-6">
        <DoughnutChart/>
        </div>

      </div>
    </div>
  )
}

export default Home