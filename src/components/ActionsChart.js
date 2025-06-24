import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend);

const ActionsChart = ({ actions }) => {
  // Count actions by status
  const statusCounts = actions.reduce((acc, action) => {
    acc[action.status] = (acc[action.status] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: [
          '#444', // À faire
          '#e57373', // En cours
          '#81c784', // Terminées
          '#ffd600', // Other
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: 320, margin: '0 auto' }}>
      <Pie data={data} options={{ plugins: { legend: { position: 'bottom' } } }} />
    </div>
  );
};

export default ActionsChart;
