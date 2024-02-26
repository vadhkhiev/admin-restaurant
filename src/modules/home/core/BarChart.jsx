import React from 'react';
import { Bar } from 'react-chartjs-2';

const generateRandomData = () => {
  const data = [];
  for (let i = 0; i < 5; i++) {
    data.push(Math.floor(Math.random() * 100));
  }
  return data;
};

const BarChart = () => {
  const data = {
    labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
    datasets: [
      {
        label: 'Random Data',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: generateRandomData(),
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Random Bar Chart</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
