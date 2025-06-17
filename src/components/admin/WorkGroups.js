import React, { useState } from 'react';
import { FaUsers, FaPlus, FaEdit, FaTrash, FaSearch, FaCalendarAlt, FaFileAlt } from 'react-icons/fa';
import '../../AdminDashboard.css';

const WorkGroups = () => {
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Groupe de travail Environnement",
      description: "Coordination des actions environnementales",
      members: 12,
      meetings: 5,
      documents: 8,
      status: "Actif",
      lastActivity: "2024-02-20 15:30"
    },
    {
      id: 2,
      name: "Groupe de travail Social",
      description: "Actions sociales et solidarité",
      members: 8,
      meetings: 3,
      documents: 5,
      status: "Actif",
      lastActivity: "2024-02-19 10:15"
    },
    {
      id: 3,
      name: "Groupe de travail Économie",
      description: "Développement économique local",
      members: 15,
      meetings: 4,
      documents: 6,
      status: "Inactif",
      lastActivity: "2024-02-15 09:45"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    status: 'Actif'
  });

  const handleAddGroup = (e) => {
    e.preventDefault();
    const group = {
      id: groups.length + 1,
      ...newGroup,
      members: 0,
      meetings: 0,
      documents: 0,
      lastActivity: new Date().toLocaleString()
    };
    setGroups([...groups, group]);
    setShowAddGroup(false);
    setNewGroup({
      name: '',
      description: '',
      status: 'Actif'
    });
  };

  const handleDeleteGroup = (groupId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce groupe de travail ?')) {
      setGroups(groups.filter(group => group.id !== groupId));
    }
  };

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="work-groups">
      <div className="section-header">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher un groupe de travail..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
          />
        </div>
        <button
          className="action-button"
          onClick={() => setShowAddGroup(true)}
        >
          <FaPlus className="action-icon" />
          Nouveau groupe
        </button>
      </div>

      {showAddGroup && (
        <div className="admin-card">
          <h3 className="card-title">Nouveau groupe de travail</h3>
          <form onSubmit={handleAddGroup} className="admin-form">
            <div className="form-group">
              <label className="form-label">Nom du groupe</label>
              <input
                type="text"
                className="form-input"
                value={newGroup.name}
                onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="form-input"
                value={newGroup.description}
                onChange={(e) => setNewGroup({...newGroup, description: e.target.value})}
                rows="3"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Statut</label>
              <select
                className="form-input"
                value={newGroup.status}
                onChange={(e) => setNewGroup({...newGroup, status: e.target.value})}
              >
                <option value="Actif">Actif</option>
                <option value="Inactif">Inactif</option>
              </select>
            </div>
            <div className="form-actions">
              <button type="submit" className="action-button">
                Créer
              </button>
              <button
                type="button"
                className="action-button secondary"
                onClick={() => setShowAddGroup(false)}
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="groups-grid">
        {filteredGroups.map(group => (
          <div key={group.id} className="group-card">
            <div className="group-header">
              <h3 className="group-title">{group.name}</h3>
              <span className={`status-badge ${group.status.toLowerCase()}`}>
                {group.status}
              </span>
            </div>
            <p className="group-description">{group.description}</p>
            <div className="group-stats">
              <div className="stat-item">
                <FaUsers className="stat-icon" />
                <span>{group.members} membres</span>
              </div>
              <div className="stat-item">
                <FaCalendarAlt className="stat-icon" />
                <span>{group.meetings} réunions</span>
              </div>
              <div className="stat-item">
                <FaFileAlt className="stat-icon" />
                <span>{group.documents} documents</span>
              </div>
            </div>
            <div className="group-footer">
              <span className="last-activity">
                Dernière activité: {group.lastActivity}
              </span>
              <div className="action-buttons">
                <button className="icon-button" title="Modifier">
                  <FaEdit />
                </button>
                <button
                  className="icon-button"
                  title="Supprimer"
                  onClick={() => handleDeleteGroup(group.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkGroups; 