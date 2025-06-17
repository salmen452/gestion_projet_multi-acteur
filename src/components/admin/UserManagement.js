import React, { useState } from 'react';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample user data
  const users = [
    {
      id: 1,
      name: 'Marie Dupont',
      email: 'marie.dupont@example.com',
      type: 'Collectivité',
      organization: 'Mairie de Lyon',
      role: 'Acteur local',
      status: 'Actif',
      lastLogin: '2024-02-20 14:30'
    },
    {
      id: 2,
      name: 'Jean Martin',
      email: 'jean.martin@example.com',
      type: 'OSC',
      organization: 'Association Développement Durable',
      role: 'Modérateur',
      status: 'Actif',
      lastLogin: '2024-02-20 13:15'
    },
    {
      id: 3,
      name: 'Sophie Bernard',
      email: 'sophie.bernard@example.com',
      type: 'PTF',
      organization: 'Banque Mondiale',
      role: 'Acteur local',
      status: 'Inactif',
      lastLogin: '2024-02-19 09:45'
    }
  ];

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-content-section">
      <div className="admin-section-header">
        <h2>Gestion des acteurs</h2>
        <div className="admin-actions">
          <input
            type="text"
            className="search-input"
            placeholder="Rechercher un utilisateur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="action-button">
            + Ajouter un acteur
          </button>
        </div>
      </div>
      
      <table className="admin-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Type d'acteur</th>
            <th>Organisation</th>
            <th>Rôle</th>
            <th>Statut</th>
            <th>Dernière connexion</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.type}</td>
              <td>{user.organization}</td>
              <td>{user.role}</td>
              <td className={`status-${user.status.toLowerCase() === 'actif' ? 'active' : 'inactive'}`}>
                {user.status}
              </td>
              <td>{user.lastLogin}</td>
              <td>
                <button className="action-button">Éditer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;