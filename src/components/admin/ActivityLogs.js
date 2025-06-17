import React, { useState } from 'react';
import { FaDownload, FaFilter, FaTrash } from 'react-icons/fa';
import '../../AdminDashboard.css';

const ActivityLogs = () => {
  const [logs, setLogs] = useState([
    {
      id: 1,
      type: 'warning',
      message: 'Tentative de connexion échouée - IP: 192.168.1.100',
      timestamp: '2024-02-20 15:45',
      user: 'Système'
    },
    {
      id: 2,
      type: 'info',
      message: 'Sauvegarde automatique effectuée',
      timestamp: '2024-02-20 15:00',
      user: 'Système'
    },
    {
      id: 3,
      type: 'error',
      message: 'Erreur de synchronisation avec le serveur de fichiers',
      timestamp: '2024-02-20 14:30',
      user: 'Système'
    },
    {
      id: 4,
      type: 'info',
      message: 'Utilisateur Marie Dupont a modifié le document "Rapport Q4"',
      timestamp: '2024-02-20 14:15',
      user: 'Marie Dupont'
    },
    {
      id: 5,
      type: 'warning',
      message: 'Stockage serveur à 85% de capacité',
      timestamp: '2024-02-20 13:45',
      user: 'Système'
    }
  ]);

  const [filter, setFilter] = useState('all');

  const filteredLogs = logs.filter(log => {
    if (filter === 'all') return true;
    return log.type === filter;
  });

  const handleClearLogs = () => {
    if (window.confirm('Êtes-vous sûr de vouloir effacer tous les logs ?')) {
      setLogs([]);
    }
  };

  const handleExportLogs = () => {
    const logData = JSON.stringify(logs, null, 2);
    const blob = new Blob([logData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `system-logs-${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="activity-logs">
      <div className="section-header">
        <div className="filter-controls">
          <FaFilter className="filter-icon" />
          <select
            className="form-input"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Tous les logs</option>
            <option value="info">Information</option>
            <option value="warning">Avertissement</option>
            <option value="error">Erreur</option>
          </select>
        </div>
        <div className="action-buttons">
          <button className="action-button" onClick={handleExportLogs}>
            <FaDownload className="action-icon" />
            Exporter
          </button>
          <button className="action-button danger" onClick={handleClearLogs}>
            <FaTrash className="action-icon" />
            Effacer
          </button>
        </div>
      </div>

      <div className="logs-container">
        {filteredLogs.length > 0 ? (
          filteredLogs.map(log => (
            <div key={log.id} className={`log-item ${log.type}`}>
              <div className="log-timestamp">{log.timestamp}</div>
              <div className="log-content">
                <div className="log-message">{log.message}</div>
                <div className="log-user">{log.user}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-logs">
            Aucun log à afficher
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityLogs; 