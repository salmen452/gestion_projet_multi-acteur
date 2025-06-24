import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend);

const DocumentsChart = ({ documents }) => {
  // Count documents by type
  const typeCounts = documents.reduce((acc, doc) => {
    const type = doc.type || 'Autre';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const colorMap = {
    'Ordre du jour': '#e57373',
    'Compte-rendu': '#6d5dfc',
    'Document projet': '#1976d2',
    'Contrat': '#8d99ae',
    'Rapport': '#4CAF50',
    'Autre': '#FFC107',
  };

  const data = {
    labels: Object.keys(typeCounts),
    datasets: [
      {
        data: Object.values(typeCounts),
        backgroundColor: Object.keys(typeCounts).map(type => colorMap[type] || '#ccc'),
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

export default DocumentsChart;
