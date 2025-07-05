import React, { useState, useEffect } from 'react';
import { authFetch } from '../../authFetch';

const initialForm = { name: '', email: '', phone: '', organisation: '', password: '', role: 'member' };

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' or 'edit'
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchUsers = () => {
    setLoading(true);
    authFetch('http://localhost:5000/api/Users')
      .then(async res => {
        if (!res.ok) throw new Error('Erreur lors du chargement des utilisateurs');
        const text = await res.text();
        try {
          return JSON.parse(text);
        } catch (e) {
          throw new Error('Réponse inattendue du serveur. Vérifiez que le backend fonctionne et que l’URL est correcte.');
        }
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAddModal = () => {
    setForm(initialForm);
    setModalType('add');
    setShowModal(true);
    setEditId(null);
  };

  const openEditModal = (user) => {
    setForm({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      organisation: user.organisation || '',
      password: '',
      role: user.role || 'member',
    });
    setModalType('edit');
    setShowModal(true);
    setEditId(user._id);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Supprimer cet utilisateur ?')) return;
    setSaving(true);
    authFetch(`http://localhost:5000/api/Users/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(() => {
        setSaving(false);
        fetchUsers();
      })
      .catch(() => setSaving(false));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    if (modalType === 'add') {
      authFetch('http://localhost:5000/api/Users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
        .then(res => res.json())
        .then(() => {
          setShowModal(false);
          setSaving(false);
          fetchUsers();
        })
        .catch(() => setSaving(false));
    } else if (modalType === 'edit') {
      const update = { ...form };
      if (!update.password) delete update.password;
      authFetch(`http://localhost:5000/api/Users/${editId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(update)
      })
        .then(res => res.json())
        .then(() => {
          setShowModal(false);
          setSaving(false);
          fetchUsers();
        })
        .catch(() => setSaving(false));
    }
  };

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
          <button className="action-button" onClick={openAddModal}>
            + Ajouter un acteur
          </button>
        </div>
      </div>
      <div style={{overflowX: 'auto'}}>
        {loading ? (
          <div>Chargement...</div>
        ) : error ? (
          <div style={{color: 'red'}}>{error}</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Organisation</th>
                <th>Rôle</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user._id || user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.organisation}</td>
                  <td>{user.role}</td>
                  <td>
                    <button className="action-button" onClick={() => openEditModal(user)} disabled={saving}>Éditer</button>
                    <button className="action-button" style={{background:'#F44336',marginLeft:8}} onClick={() => handleDelete(user._id)} disabled={saving}>Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <form onSubmit={handleSubmit} style={{
            background: '#fff',
            padding: '2rem',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '500px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.5rem', color: '#333' }}>
              {modalType === 'add' ? 'Ajouter' : 'Éditer'} un utilisateur
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', color: '#555' }}>Nom</label>
              <input 
                required 
                name="name" 
                placeholder="Nom" 
                value={form.name} 
                onChange={e => setForm(f => ({...f, name: e.target.value}))} 
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1rem'
                }} 
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', color: '#555' }}>Email</label>
              <input 
                required 
                name="email" 
                type="email" 
                placeholder="Email" 
                value={form.email} 
                onChange={e => setForm(f => ({...f, email: e.target.value}))} 
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1rem'
                }} 
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', color: '#555' }}>Téléphone</label>
              <input 
                required 
                name="phone" 
                placeholder="Téléphone" 
                value={form.phone} 
                onChange={e => setForm(f => ({...f, phone: e.target.value}))} 
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1rem'
                }} 
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', color: '#555' }}>Organisation</label>
              <input 
                name="organisation" 
                placeholder="Organisation" 
                value={form.organisation} 
                onChange={e => setForm(f => ({...f, organisation: e.target.value}))} 
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1rem'
                }} 
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', color: '#555' }}>Rôle</label>
              <select 
                name="role" 
                value={form.role} 
                onChange={e => setForm(f => ({...f, role: e.target.value}))} 
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  backgroundColor: '#fff'
                }}
              >
                <option value="member">Membre</option>
                <option value="coordinator">Coordinateur</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', color: '#555' }}>
                {modalType === 'add' ? "Mot de passe" : "Nouveau mot de passe (laisser vide pour ne pas changer)"}
              </label>
              <input 
                name="password" 
                type="password" 
                placeholder={modalType === 'add' ? "Mot de passe" : "Nouveau mot de passe"} 
                value={form.password} 
                onChange={e => setForm(f => ({...f, password: e.target.value}))} 
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '1rem'
                }} 
              />
            </div>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'flex-end', 
              gap: '1rem', 
              marginTop: '1.5rem'
            }}>
              <button 
                type="button" 
                onClick={() => setShowModal(false)} 
                disabled={saving}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#eee',
                  color: '#333',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '500'
                }}
              >
                Annuler
              </button>
              <button 
                type="submit" 
                disabled={saving}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '500'
                }}
              >
                {saving ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserManagement;