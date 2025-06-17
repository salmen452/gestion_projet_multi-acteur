import React, { useState, useEffect } from 'react';
import { FaServer, FaDatabase, FaNetworkWired, FaClock } from 'react-icons/fa';
import '../../AdminDashboard.css';

const SystemMonitoring = () => {
  const [systemStats, setSystemStats] = useState({
    cpu: 45,
    memory: 60,
    storage: 75,
    network: 30,
    uptime: '15 jours, 7 heures',
    activeUsers: 42,
    totalRequests: 1250,
    responseTime: '120ms'
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStats(prev => ({
        ...prev,
        cpu: Math.floor(Math.random() * 100),
        memory: Math.floor(Math.random() * 100),
        network: Math.floor(Math.random() * 100),
        activeUsers: Math.floor(Math.random() * 50) + 20,
        totalRequests: prev.totalRequests + Math.floor(Math.random() * 10),
        responseTime: `${Math.floor(Math.random() * 200) + 50}ms`
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (value) => {
    if (value < 50) return 'success';
    if (value < 80) return 'warning';
    return 'danger';
  };

  return (
    <div className="system-monitoring">
      <div className="admin-grid">
        {/* CPU Usage */}
        <div className="admin-card monitoring-card">
          <FaServer className="card-icon" />
          <div className="card-title">Utilisation CPU</div>
          <div className={`monitoring-value ${getStatusColor(systemStats.cpu)}`}>
            {systemStats.cpu}%
          </div>
          <div className="monitoring-label">Utilisation moyenne</div>
        </div>

        {/* Memory Usage */}
        <div className="admin-card monitoring-card">
          <FaDatabase className="card-icon" />
          <div className="card-title">Utilisation Mémoire</div>
          <div className={`monitoring-value ${getStatusColor(systemStats.memory)}`}>
            {systemStats.memory}%
          </div>
          <div className="monitoring-label">Mémoire utilisée</div>
        </div>

        {/* Network Usage */}
        <div className="admin-card monitoring-card">
          <FaNetworkWired className="card-icon" />
          <div className="card-title">Trafic Réseau</div>
          <div className={`monitoring-value ${getStatusColor(systemStats.network)}`}>
            {systemStats.network}%
          </div>
          <div className="monitoring-label">Bande passante utilisée</div>
        </div>

        {/* System Uptime */}
        <div className="admin-card monitoring-card">
          <FaClock className="card-icon" />
          <div className="card-title">Temps de fonctionnement</div>
          <div className="monitoring-value">
            {systemStats.uptime}
          </div>
          <div className="monitoring-label">Depuis le dernier redémarrage</div>
        </div>
      </div>

      <div className="admin-grid">
        {/* Active Users */}
        <div className="admin-card">
          <div className="card-title">Utilisateurs actifs</div>
          <div className="monitoring-value">
            {systemStats.activeUsers}
          </div>
          <div className="monitoring-label">Utilisateurs connectés</div>
        </div>

        {/* Total Requests */}
        <div className="admin-card">
          <div className="card-title">Requêtes totales</div>
          <div className="monitoring-value">
            {systemStats.totalRequests}
          </div>
          <div className="monitoring-label">Requêtes traitées aujourd'hui</div>
        </div>

        {/* Response Time */}
        <div className="admin-card">
          <div className="card-title">Temps de réponse</div>
          <div className="monitoring-value">
            {systemStats.responseTime}
          </div>
          <div className="monitoring-label">Temps de réponse moyen</div>
        </div>
      </div>

      <div className="admin-card">
        <div className="card-title">Actions système</div>
        <div className="card-actions">
          <button className="action-button">
            Sauvegarder
          </button>
          <button className="action-button">
            Vérifier les mises à jour
          </button>
          <button className="action-button danger">
            Redémarrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default SystemMonitoring; 