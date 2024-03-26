import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const LineChart = () => {
  const generateRandomData = (numPoints) => {
    const labels = [];
    const datasets = [];

    for (let i = 0; i < numPoints; i++) {
      labels.push(`Label ${i + 1}`);
    }

    for (let j = 0; j < 3; j++) { // Generating 3 datasets
      const values = [];
      for (let i = 0; i < numPoints; i++) {
        values.push(Math.floor(Math.random() * 100)); // Generating random values
      }
      datasets.push({
        label: `Dataset ${j + 1}`,
        values: values
      });
    }

    return {
      labels: labels,
      datasets: datasets
    };
  };

  const randomData = generateRandomData(10); // Generating data with 10 data points

  const chartData = {
    labels: randomData.labels,
    datasets: randomData.datasets.map((dataset, index) => ({
      label: dataset.label,
      fill: false,
      backgroundColor: `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.4)`,
      borderColor: `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},1)`,
      borderWidth: 1,
      data: dataset.values
    }))
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };

  return (
    <div >
      <Line
        data={chartData}
        options={options}
      />
    </div>
  );
};

export default LineChart;
