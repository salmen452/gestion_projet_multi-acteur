import React from 'react';
import '../Dashboard.css';

const StatsOverview = ({ stats }) => {
  const colorClasses = ['blue', 'green', 'orange', 'purple'];
  
  return (
    <div className="stats-container">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className={`stat-icon ${colorClasses[index]}`}>
            {stat.icon}
          </div>
          <div className="stat-info">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.title}</div>
            <div className="stat-trend" style={{ color: stat.trend > 0 ? '#4CAF50' : '#F44336' }}>
              {stat.trend > 0 ? '↑' : '↓'} {Math.abs(stat.trend)}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;