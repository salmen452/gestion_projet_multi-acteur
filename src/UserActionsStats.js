import React, { useState, useEffect } from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import SettingsContainer from './SettingsContainer';
import './Dashboard.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LabelList } from 'recharts';

const UserActionsStats = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/user-actions-stats')
      .then(res => {
        if (!res.ok) throw new Error('Erreur lors du chargement des statistiques');
        return res.json();
      })
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="dashboard-container">
      <DashboardHeader />
      <DashboardSidebar onParametreClick={() => setShowSettings(true)} />
      {showSettings && (
        <SettingsContainer onClose={() => setShowSettings(false)} />
      )}
      <main className="dashboard-main">
        <h2 className="section-title" style={{marginBottom: 24}}>Statistiques des actions par utilisateur</h2>
        {loading ? (
          <div>Chargement...</div>
        ) : error ? (
          <div style={{color: 'red'}}>{error}</div>
        ) : stats.length === 0 ? (
          <div>Aucune donnée à afficher.</div>
        ) : (
          <div style={{background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', padding: 24, maxWidth: 700, minWidth: 320, margin: '0 auto'}}>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={stats} margin={{ top: 20, right: 30, left: 0, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="fullName" angle={-20} textAnchor="end" interval={0} height={70} />
                <YAxis allowDecimals={false} />
                <Tooltip formatter={(value) => [value, 'Actions']} />
                <Bar dataKey="actionCount" fill="#6d5dfc">
                  <LabelList dataKey="actionCount" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserActionsStats; 