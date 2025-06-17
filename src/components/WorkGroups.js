import React, { useEffect, useRef } from 'react';
import { FaUsers } from 'react-icons/fa';
import Chart from 'chart.js/auto';
import '../Dashboard.css';

const WorkGroups = ({ groups }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      const ctx = chartRef.current.getContext('2d');
      chartInstanceRef.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: groups.map(group => group.name),
          datasets: [{
            data: groups.map(group => group.members),
            backgroundColor: groups.map(group => group.color),
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 12,
                padding: 20
              }
            }
          },
          cutout: '70%'
        }
      });
    }
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [groups]);

  return (
    <div className="dashboard-card">
      <div className="card-header">
        <div className="card-title">
          <FaUsers className="card-icon" />
          Groupes de travail
        </div>
        <div className="card-actions">
        </div>
      </div>
      <div className="card-body">
        <div className="group-chart-container">
          <canvas ref={chartRef} id="groupChart"></canvas>
        </div>
        <div className="group-list">
          {groups.map((group, index) => (
            <div key={index} className="group-item">
              <div className="group-color" style={{ backgroundColor: group.color }}></div>
              <div className="group-name">{group.name}</div>
              <div className="group-members">{group.members} membres</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkGroups; 