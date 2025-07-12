import React, { useState, useEffect } from 'react';
import { authFetch } from './authFetch';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import SettingsContainer from './SettingsContainer';
import './Dashboard.css';
import { FaPlus, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';


const API_URL = 'http://localhost:5000/api/actions';

const statusList = [
  { key: 'all', label: 'Toutes' },
  { key: 'À faire', label: 'À faire' },
  { key: 'En cours', label: 'En cours' },
  { key: 'Terminées', label: 'Terminées' }
];

const statusColors = {
  'À faire': '#444',
  'En cours': '#e57373',
  'Terminées': '#81c784',
};

const priorityColors = {
  'Haute': '#f44336',
  'Moyenne': '#1976d2',
  'Basse': '#ffd600',
};


const ActionsPage = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [actions, setActions] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'Moyenne',
    dueDate: '',
    status: 'À faire',
  });
  const [usersList, setUsersList] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [editAction, setEditAction] = useState(null);
  // Get user role from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const isCoordinator = user && user.role === 'coordinator';

  // Fetch actions from backend
  useEffect(() => {
    authFetch(API_URL)
      .then(res => res.json())
      .then(data => setActions(data))
      .catch(() => setActions([]));
    fetch('http://localhost:5000/api/Users')
      .then(res => res.json())
      .then(data => setUsersList(data))
      .catch(() => setUsersList([]));
  }, []);

  // Filter actions based on user role
  let visibleActions = actions;
  if (!isCoordinator && user) {
    visibleActions = actions.filter(a => (a.participants || []).includes(user._id || user.id));
  }
  const filteredActions = filter === 'all' ? visibleActions : visibleActions.filter(a => a.status === filter);

  // Count for summary cards
  const summary = {
    total: actions.length,
    'À faire': actions.filter(a => a.status === 'À faire').length,
    'En cours': actions.filter(a => a.status === 'En cours').length,
    'Terminées': actions.filter(a => a.status === 'Terminées').length,
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleOpenModal = () => {
    setEditAction(null);
    setForm({ title: '', description: '', priority: 'Moyenne', dueDate: '', status: 'À faire' });
    setParticipants([]);
    setShowModal(true);
  };

  const handleEditAction = (action) => {
    setEditAction(action);
    setForm({
      title: action.title,
      description: action.description,
      priority: action.priority,
      dueDate: action.dueDate,
      status: action.status || 'À faire',
    });
    setParticipants(action.participants || []);
    setShowModal(true);
  };

  const handleSubmitAction = async (e) => {
    e.preventDefault();
    const actionData = {
      title: form.title,
      description: form.description,
      dueDate: form.dueDate,
      priority: form.priority,
      participants,
      status: form.status || (editAction ? editAction.status : 'À faire'),
    };
    if (editAction) {
      // PATCH update
      const res = await authFetch(`${API_URL}/${editAction._id || editAction.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(actionData),
      });
      const updated = await res.json();
      setActions(actions => actions.map(a => (a._id === updated._id ? updated : a)));
    } else {
      // POST create
      const res = await authFetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...actionData, status: 'À faire' }),
      });
      const savedAction = await res.json();
      setActions([...actions, savedAction]);
    }
    setShowModal(false);
    setForm({ title: '', description: '', priority: 'Moyenne', dueDate: '', status: 'À faire' });
    setParticipants([]);
    setEditAction(null);
  };


  // Update action status in backend
  const handleTerminer = async (id) => {
    const res = await authFetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Terminées' }),
    });
    const updated = await res.json();
    setActions(actions => actions.map(a => (a._id === id ? updated : a)));
  };

  const handleCommencer = async (id) => {
    const res = await authFetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'En cours' }),
    });
    const updated = await res.json();
    setActions(actions => actions.map(a => (a._id === id ? updated : a)));
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader />
      <DashboardSidebar onParametreClick={() => setShowSettings(true)} />
      {showSettings && (
        <SettingsContainer onClose={() => setShowSettings(false)} />
      )}
      <main className="dashboard-main">
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24}}>
          <div>
            <h2 className="section-title" style={{marginBottom: 0}}>Suivi des Actions</h2>
            <div style={{color: '#8d99ae', fontSize: 16}}>Consultez vos actions assignées</div>
          </div>
          {isCoordinator && (
            <button className="action-button" style={{background: '#6d5dfc', color: '#fff', fontWeight: 500, fontSize: 16, borderRadius: 10, padding: '0.6rem 1.5rem', display: 'flex', alignItems: 'center', gap: 8}} onClick={handleOpenModal}>
              <FaPlus /> Nouvelle Action
            </button>
          )}
        </div>
        {/* Modal for new/edit action */}
        {isCoordinator && showModal && (
          <div style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30,32,38,0.45)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{background: '#fff', borderRadius: 10, boxShadow: '0 4px 32px rgba(0,0,0,0.18)', padding: '2rem', minWidth: 420, maxWidth: 540, width: '100%', position: 'relative'}}>
              <button onClick={() => setShowModal(false)} style={{position: 'absolute', top: 18, right: 18, background: 'none', border: 'none', fontSize: 22, color: '#222', cursor: 'pointer'}}>×</button>
              <h3 style={{marginTop: 0, marginBottom: 18, fontWeight: 600, fontSize: 22}}>{editAction ? 'Modifier l\'action' : 'Créer une nouvelle action'}</h3>
              <form onSubmit={handleSubmitAction}>
                <div style={{marginBottom: 16}}>
                  <label style={{fontWeight: 500, fontSize: 15}}>Titre de l'action</label>
                  <input name="title" value={form.title} onChange={handleFormChange} required style={{width: '100%', padding: '0.6rem', borderRadius: 6, border: '2px solid #222', fontSize: 16, marginTop: 4}} />
                </div>
                <div style={{marginBottom: 16}}>
                  <label style={{fontWeight: 500, fontSize: 15}}>Description</label>
                  <textarea name="description" value={form.description} onChange={handleFormChange} rows={3} style={{width: '100%', padding: '0.6rem', borderRadius: 6, border: '2px solid #e0e0e0', fontSize: 16, marginTop: 4}} />
                </div>
                <div style={{display: 'flex', gap: 16, marginBottom: 16}}>
                  <div style={{flex: 1}}>
                    <label style={{fontWeight: 500, fontSize: 15}}>Priorité</label>
                    <select name="priority" value={form.priority} onChange={handleFormChange} style={{width: '100%', padding: '0.6rem', borderRadius: 6, border: '2px solid #e0e0e0', fontSize: 16, marginTop: 4}}>
                      <option value="Haute">Haute</option>
                      <option value="Moyenne">Moyenne</option>
                      <option value="Basse">Basse</option>
                    </select>
                  </div>
                  <div style={{flex: 1}}>
                    <label style={{fontWeight: 500, fontSize: 15}}>Date d'échéance</label>
                    <input name="dueDate" value={form.dueDate} onChange={handleFormChange} type="date" required style={{width: '100%', padding: '0.6rem', borderRadius: 6, border: '2px solid #e0e0e0', fontSize: 16, marginTop: 4}} />
                  </div>
                  {/* Status dropdown for coordinators when editing */}
                  {isCoordinator && editAction && (
                    <div style={{flex: 1}}>
                      <label style={{fontWeight: 500, fontSize: 15 , marginLeft: 10}}>Statut</label>
                      <select name="status" value={form.status} onChange={handleFormChange} style={{width: '100%', padding: '0.7rem', borderRadius: 5, border: '2px solid #e0e0e0', fontSize: 16, marginTop: 5, marginLeft: 10}}>
                        <option value="À faire">À faire</option>
                        <option value="En cours">En cours</option>
                        <option value="Terminées">Terminées</option>
                      </select>
                    </div>
                  )}
                </div>
                {/* Add participants multi-select to the modal */}
                <div style={{marginBottom: 16}}>
                  <label style={{fontWeight: 500, fontSize: 15}}>Participants</label>
                  <select
                    multiple
                    value={participants}
                    onChange={e => {
                      const selected = Array.from(e.target.selectedOptions, option => option.value);
                      setParticipants(selected);
                    }}
                    style={{width: '100%', padding: '0.6rem', borderRadius: 6, border: '2px solid #e0e0e0', fontSize: 16, marginTop: 4, minHeight: 60, background: '#f8f9fa'}}
                  >
                    {usersList.map(user => {
                      const displayName = user.name || user.nom || user.email || 'Utilisateur inconnu';
                      return (
                        <option key={user._id || user.id || user.email} value={user._id || user.id}>
                          {displayName}
                        </option>
                      );
                    })}
                  </select>
                  <div style={{fontSize: 13, color: '#8d99ae'}}>
                    Maintenez Ctrl (Windows) ou Cmd (Mac) pour sélectionner plusieurs participants
                  </div>
                </div>
                <button type="submit" style={{background: '#11192f', color: '#fff', fontWeight: 600, fontSize: 16, borderRadius: 8, padding: '0.7rem 1.5rem', border: 'none', marginTop: 8, float: 'right', cursor: 'pointer'}}>Créer l'action</button>
              </form>
            </div>
          </div>
        )}
        {/* Summary Cards */}
        <div style={{display: 'flex', gap: 24, marginBottom: 24}}>
          <div style={{background: '#e3f0fa', borderRadius: 16, padding: '1.2rem 2.2rem', minWidth: 120, textAlign: 'center'}}>
            <div style={{fontSize: 18, color: '#2b2d42', fontWeight: 600}}>Total</div>
            <div style={{fontSize: 32, fontWeight: 700}}>{summary.total}</div>
          </div>
          <div style={{background: '#e6e0fa', borderRadius: 16, padding: '1.2rem 2.2rem', minWidth: 120, textAlign: 'center'}}>
            <div style={{fontSize: 18, color: '#2b2d42', fontWeight: 600}}>À faire</div>
            <div style={{fontSize: 32, fontWeight: 700}}>{summary['À faire']}</div>
          </div>
          <div style={{background: '#f7e6e6', borderRadius: 16, padding: '1.2rem 2.2rem', minWidth: 120, textAlign: 'center'}}>
            <div style={{fontSize: 18, color: '#2b2d42', fontWeight: 600}}>En cours</div>
            <div style={{fontSize: 32, fontWeight: 700}}>{summary['En cours']}</div>
          </div>
          <div style={{background: '#f7e6e6', borderRadius: 16, padding: '1.2rem 2.2rem', minWidth: 120, textAlign: 'center', opacity: 0.7}}>
            <div style={{fontSize: 18, color: '#2b2d42', fontWeight: 600}}>Terminées</div>
            <div style={{fontSize: 32, fontWeight: 700}}>{summary['Terminées']}</div>
          </div>
        </div>
        {/* Filter Buttons */}
        <div style={{display: 'flex', gap: 16, marginBottom: 24}}>
          {statusList.map(s => (
            <button
              key={s.key}
              onClick={() => setFilter(s.key)}
              style={{
                background: filter === s.key ? '#444' : '#f3f3f3',
                color: filter === s.key ? '#fff' : '#444',
                border: 'none',
                borderRadius: 10,
                padding: '0.5rem 1.5rem',
                fontWeight: 600,
                fontSize: 16,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
        {/* Action List */}
        <div style={{marginTop: 16}}>
          {filteredActions.length === 0 ? (
            <div style={{background: '#faf9fb', border: '1.5px solid #e0e0e0', borderRadius: 16, padding: '3rem 0', textAlign: 'center', color: '#444', fontSize: 22, fontWeight: 500, letterSpacing: 0.5, minHeight: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
              <div style={{fontSize: 48, marginBottom: 12}}>&#10003;</div>
              Aucune action
              <div style={{color: '#8d99ae', fontSize: 16, marginTop: 8}}>Commencez par créer votre première action</div>
            </div>
          ) : (
            filteredActions.map(action => (
              <div key={action._id || action.id} style={{background: '#faf9fb', border: '1.5px solid #e0e0e0', borderRadius: 16, padding: '1.2rem 1.5rem', marginBottom: 18, boxShadow: 'none', display: 'flex', flexDirection: 'column', gap: 8, position: 'relative'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'space-between'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                    <FaInfoCircle style={{marginRight: 8, color: '#444'}} />
                    <span style={{fontWeight: 700, fontSize: 20}}>{action.title}</span>
                  </div>
                  {isCoordinator && (
                    <div>
                      {action.status === 'À faire' && (
                        <button
                          style={{
                            background: '#1976d2',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 16,
                            padding: '0.5rem 1.5rem',
                            fontWeight: 600,
                            fontSize: 16,
                            cursor: 'pointer',
                            marginLeft: 12
                          }}
                          onClick={() => handleCommencer(action._id || action.id)}
                        >
                          Commencer
                        </button>
                      )}
                      {action.status === 'En cours' && (
                        <button
                          style={{
                            background: '#ffa726',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 16,
                            padding: '0.5rem 1.5rem',
                            fontWeight: 600,
                            fontSize: 16,
                            cursor: 'pointer',
                            marginLeft: 12
                          }}
                          onClick={() => handleTerminer(action._id || action.id)}
                        >
                          Terminer
                        </button>
                      )}
                      {isCoordinator && (
                        <button style={{marginLeft: 8, background: '#e0e0e0', color: '#222', border: 'none', borderRadius: 8, padding: '0.4rem 1.1rem', fontWeight: 600, fontSize: 15, cursor: 'pointer'}} onClick={() => handleEditAction(action)}>
                          Modifier
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <div style={{color: '#8d99ae', fontSize: 16, marginLeft: 28}}>{action.description}</div>
                <div style={{display: 'flex', alignItems: 'center', gap: 16, marginLeft: 28, marginTop: 4}}>
                  <FaCalendarAlt style={{marginRight: 6, color: '#444'}} />
                  <span style={{fontSize: 15}}>Échéance: {action.dueDate}</span>
                </div>
                <div style={{display: 'flex', gap: 10, marginLeft: 28, marginTop: 6}}>
                  <span style={{background: priorityColors[action.priority] || '#eee', color: '#fff', borderRadius: 16, padding: '0.2rem 1.1rem', fontWeight: 600, fontSize: 15}}>{action.priority}</span>
                  <span style={{background: statusColors[action.status] || '#eee', color: '#fff', borderRadius: 16, padding: '0.2rem 1.1rem', fontWeight: 600, fontSize: 15}}>{action.status}</span>
                </div>
                {/* Assigned members */}
                <div style={{marginLeft: 28, marginTop: 6, display: 'flex', alignItems: 'center', gap: 8}}>
                  <span style={{fontWeight: 500}}>Assignés:</span>
                  {(action.participants || []).length === 0 ? (
                    <span style={{color: '#8d99ae'}}>Aucun membre</span>
                  ) : (
                    (action.participants || []).map((pid, idx) => {
                      const userObj = usersList.find(u => (u._id === pid || u.id === pid));
                      const prenom = userObj ? (userObj.name || userObj.nom || userObj.email).split(' ')[0] : pid;
                      return (
                        <span key={idx} style={{background:'#e3eaff',color:'#1a237e',fontWeight:500,fontSize:13,padding:'2px 10px',borderRadius:12,marginRight:4}}>
                          {prenom}
                        </span>
                      );
                    })
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default ActionsPage;