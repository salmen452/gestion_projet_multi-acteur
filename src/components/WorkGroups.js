import React, { useState } from 'react';
import { FaUsers, FaPlus, FaEdit, FaTrash, FaCalendarAlt, FaFileAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import '../Dashboard.css';

const initialGroups = [
  {
    id: 1,
    name: 'Environnement et développement durable',
    description: 'Coordination des actions environnementales',
    color: '#6d5dfc',
    members: [
      { name: 'Marie Dupont', avatar: 'MD' },
      { name: 'Jean Claude', avatar: 'JC' },
      { name: 'Alice Durand', avatar: 'AD' }
    ],
    meetings: 5,
    documents: 8,
    status: 'Actif',
    lastActivity: '2024-02-20 15:30'
  },
  {
    id: 2,
    name: 'Éducation et formation',
    description: 'Actions éducatives et formations',
    color: '#4CAF50',
    members: [
      { name: 'Lucie Petit', avatar: 'LP' },
      { name: 'Thomas Martin', avatar: 'TM' }
    ],
    meetings: 3,
    documents: 5,
    status: 'Actif',
    lastActivity: '2024-02-19 10:15'
  },
  {
    id: 3,
    name: 'Infrastructures urbaines',
    description: 'Développement des infrastructures urbaines',
    color: '#FFC107',
    members: [
      { name: 'Jean Claude', avatar: 'JC' },
      { name: 'Alice Durand', avatar: 'AD' }
    ],
    meetings: 4,
    documents: 6,
    status: 'Inactif',
    lastActivity: '2024-02-15 09:45'
  }
];

const statusList = [
  { key: 'all', label: 'Tous' },
  { key: 'Actif', label: 'Actifs' },
  { key: 'Inactif', label: 'Inactifs' }
];

const WorkGroups = ({ onViewGroup }) => {
  const [groups, setGroups] = useState(initialGroups);
  const [showAdd, setShowAdd] = useState(false);
  const [filter, setFilter] = useState('all');
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    color: '#0575E6',
    status: 'Actif',
    members: [],
    meetings: 0,
    documents: 0,
    lastActivity: new Date().toLocaleString()
  });

  const filteredGroups = filter === 'all' ? groups : groups.filter(g => g.status === filter);
  const totalGroups = groups.length;

  const handleAddGroup = (e) => {
    e.preventDefault();
    setGroups([
      ...groups,
      {
        ...newGroup,
        id: groups.length + 1,
        lastActivity: new Date().toLocaleString(),
      }
    ]);
    setShowAdd(false);
    setNewGroup({
      name: '',
      description: '',
      color: '#0575E6',
      status: 'Actif',
      members: [],
      meetings: 0,
      documents: 0,
      lastActivity: new Date().toLocaleString()
    });
  };

  const handleDeleteGroup = (id) => {
    if (window.confirm('Supprimer ce groupe ?')) {
      setGroups(groups.filter(g => g.id !== id));
    }
  };

  return (
    <div className="work-groups" style={{padding: '1rem'}}>
      {/* Header and Add Button */}
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24}}>
        <div>
          <h2 className="section-title" style={{marginBottom: 0}}>Gestion des Groupes de travail</h2>
          <div style={{color: '#8d99ae', fontSize: 16}}>Consultez les groupes de travail</div>
        </div>
        <button className="action-button" style={{background: '#6d5dfc', color: '#fff', fontWeight: 500, fontSize: 16, borderRadius: 10, padding: '0.6rem 1.5rem', display: 'flex', alignItems: 'center', gap: 8}} onClick={() => setShowAdd(v => !v)}>
          <FaPlus style={{marginRight: 6}} /> Nouveau groupe
        </button>
      </div>
      {/* Modal-like Add Form */}
      {showAdd && (
        <form onSubmit={handleAddGroup} className="dashboard-card" style={{marginBottom: '2rem', padding: 16, maxWidth: 540, marginLeft: 'auto', marginRight: 'auto'}}>
          <div style={{display: 'flex', gap: 16, flexWrap: 'wrap'}}>
            <input type="text" placeholder="Nom du groupe" required value={newGroup.name} onChange={e => setNewGroup({...newGroup, name: e.target.value})} className="form-input" style={{flex: 1}} />
            <input type="color" value={newGroup.color} onChange={e => setNewGroup({...newGroup, color: e.target.value})} style={{width: 40, height: 40, border: 'none'}} />
            <select value={newGroup.status} onChange={e => setNewGroup({...newGroup, status: e.target.value})} className="form-input">
              <option value="Actif">Actif</option>
              <option value="Inactif">Inactif</option>
            </select>
          </div>
          <textarea placeholder="Description" required value={newGroup.description} onChange={e => setNewGroup({...newGroup, description: e.target.value})} className="form-input" style={{width: '100%', marginTop: 8}} />
          <button type="submit" className="action-button" style={{marginTop: 8, float: 'right'}}>Ajouter</button>
        </form>
      )}
      {/* Summary Card */}
      <div style={{background: '#e3f0fa', borderRadius: 16, padding: '1.2rem 2.2rem', minWidth: 120, textAlign: 'left', marginBottom: 24, maxWidth: 400}}>
        <div style={{fontSize: 18, color: '#2b2d42', fontWeight: 600}}>Total groupes</div>
        <div style={{fontSize: 32, fontWeight: 700}}>{totalGroups}</div>
      </div>
      {/* Filter Buttons */}
      <div style={{display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap'}}>
        {statusList.map(s => (
          <button
            key={s.key}
            onClick={() => setFilter(s.key)}
            style={{
              background: filter === s.key ? '#6d5dfc' : '#f3f3f3',
              color: filter === s.key ? '#fff' : '#444',
              border: 'none',
              borderRadius: 10,
              padding: '0.5rem 1.2rem',
              fontWeight: 600,
              fontSize: 15,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {s.label}
          </button>
        ))}
      </div>
      {/* Group List */}
      {filteredGroups.length === 0 ? (
        <div style={{background: '#faf9fb', border: '1.5px solid #e0e0e0', borderRadius: 16, padding: '3rem 0', textAlign: 'center', color: '#444', fontSize: 22, fontWeight: 500, letterSpacing: 0.5, minHeight: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          Aucun groupe
          <div style={{color: '#8d99ae', fontSize: 16, marginTop: 8}}>Aucun groupe disponible pour le moment</div>
        </div>
      ) : (
        <div style={{display: 'flex', gap: 18, flexWrap: 'wrap'}}>
          {filteredGroups.map(group => (
            <div key={group.id} style={{background: '#fff', border: '1.5px solid #e0e0e0', borderRadius: 16, padding: '1.2rem 1.5rem', minWidth: 280, maxWidth: 340, flex: '1 1 280px', display: 'flex', flexDirection: 'column', gap: 8, position: 'relative'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 18, marginBottom: 2}}>
                <span className="group-color" style={{ backgroundColor: group.color, width: 16, height: 16, borderRadius: '50%' }}></span>
                {group.name}
                <span style={{marginLeft: 'auto', fontSize: 13, color: group.status === 'Actif' ? '#4CAF50' : '#F44336', display: 'flex', alignItems: 'center'}}>
                  {group.status === 'Actif' ? <FaCheckCircle style={{marginRight: 4}} /> : <FaTimesCircle style={{marginRight: 4}} />} {group.status}
                </span>
              </div>
              <div style={{color: '#8d99ae', fontSize: 15, marginBottom: 2}}>{group.description}</div>
              <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2}}>
                <FaUsers style={{color: '#0575E6'}} />
                <span style={{fontWeight: 500}}>{group.members.length} membres</span>
                <FaCalendarAlt style={{marginLeft: 12, color: '#6d5dfc'}} />
                <span>{group.meetings} réunions</span>
                <FaFileAlt style={{marginLeft: 12, color: '#FFC107'}} />
                <span>{group.documents} docs</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2}}>
                {group.members.map((m, idx) => (
                  <span key={idx} className="participant-avatar" title={m.name}>{m.avatar}</span>
                ))}
              </div>
              <div style={{fontSize: 12, color: '#8d99ae', marginBottom: 2}}>Dernière activité: {group.lastActivity}</div>
              <div style={{display: 'flex', gap: 8, marginTop: 8}}>
                <button className="icon-button" title="Modifier" style={{color: '#6d5dfc'}}><FaEdit /></button>
                <button className="icon-button" title="Supprimer" style={{color: '#F44336'}} onClick={() => handleDeleteGroup(group.id)}><FaTrash /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkGroups; 