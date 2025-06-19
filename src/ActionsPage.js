import React, { useState } from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import './Dashboard.css';
import { FaPlus, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';

const initialActions = [
  {
    id: 1,
    title: "Finaliser le rapport d'évaluation environnementale",
    description: "Finaliser le rapport d'évaluation",
    dueDate: "10 juin 2025",
    priority: "Moyenne",
    status: "En cours"
  },
  // Add more actions as needed
];

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
  const [actions, setActions] = useState(initialActions);
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'Moyenne',
    dueDate: '',
  });

  const filteredActions = filter === 'all' ? actions : actions.filter(a => a.status === filter);

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

  const handleCreateAction = (e) => {
    e.preventDefault();
    setActions([
      ...actions,
      {
        id: actions.length + 1,
        title: form.title,
        description: form.description,
        dueDate: form.dueDate,
        priority: form.priority,
        status: 'À faire',
      }
    ]);
    setShowModal(false);
    setForm({ title: '', description: '', priority: 'Moyenne', dueDate: '' });
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader />
      <DashboardSidebar />
      <main className="dashboard-main">
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24}}>
          <div>
            <h2 className="section-title" style={{marginBottom: 0}}>Suivi des Actions</h2>
            <div style={{color: '#8d99ae', fontSize: 16}}>Consultez vos actions assignées</div>
          </div>
          <button className="action-button" style={{background: '#6d5dfc', color: '#fff', fontWeight: 500, fontSize: 16, borderRadius: 10, padding: '0.6rem 1.5rem', display: 'flex', alignItems: 'center', gap: 8}} onClick={() => setShowModal(true)}>
            <FaPlus /> Nouvelle Action
          </button>
        </div>
        {/* Modal for new action */}
        {showModal && (
          <div style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30,32,38,0.45)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{background: '#fff', borderRadius: 10, boxShadow: '0 4px 32px rgba(0,0,0,0.18)', padding: '2rem', minWidth: 420, maxWidth: 540, width: '100%', position: 'relative'}}>
              <button onClick={() => setShowModal(false)} style={{position: 'absolute', top: 18, right: 18, background: 'none', border: 'none', fontSize: 22, color: '#222', cursor: 'pointer'}}>×</button>
              <h3 style={{marginTop: 0, marginBottom: 18, fontWeight: 600, fontSize: 22}}>Créer une nouvelle action</h3>
              <form onSubmit={handleCreateAction}>
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
              <div key={action.id} style={{background: '#faf9fb', border: '1.5px solid #e0e0e0', borderRadius: 16, padding: '1.2rem 1.5rem', marginBottom: 18, boxShadow: 'none', display: 'flex', flexDirection: 'column', gap: 8}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                  <FaInfoCircle style={{marginRight: 8, color: '#444'}} />
                  <span style={{fontWeight: 700, fontSize: 20}}>{action.title}</span>
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
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default ActionsPage;