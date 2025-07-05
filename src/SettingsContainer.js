import React, { useState, useEffect } from 'react';
import './SettingsContainer.css';


// Helper: get user from localStorage (after login, store user object there)
function getConnectedUser() {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch {
    return null;
  }
}

const SettingsContainer = ({ onClose }) => {
  const [form, setForm] = useState({
    prenom: '',
    nom: '',
    organisation: '',
    telephone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch user info on mount
  useEffect(() => {
    const user = getConnectedUser();
    if (!user) return;
    // Fetch from backend for latest info
    fetch(`http://localhost:5000/api/Users`)
      .then(res => res.json())
      .then(users => {
        const found = users.find(u => u.email === user.email);
        if (found) {
          // Split name if possible
          let prenom = '', nom = '';
          if (found.name) {
            const parts = found.name.split(' ');
            prenom = parts[0] || '';
            nom = parts.slice(1).join(' ') || '';
          }
          setForm({
            prenom,
            nom,
            organisation: found.organisation || '',
            telephone: found.phone || ''
          });
        }
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const user = getConnectedUser();
    if (!user) {
      setError('Utilisateur non connecté.');
      setLoading(false);
      return;
    }
    // Compose name
    const name = (form.prenom + ' ' + form.nom).trim();
    // PATCH user info
    try {
      const res = await fetch(`http://localhost:5000/api/Users/${user._id || user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone: form.telephone,
          organisation: form.organisation
        })
      });
      if (!res.ok) throw new Error('Erreur lors de la mise à jour');
      // Optionally update localStorage
      const updated = await res.json();
      localStorage.setItem('user', JSON.stringify(updated));
      onClose();
    } catch (err) {
      setError('Erreur lors de la sauvegarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-overlay">
      <div className="settings-container user-profile-container">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2 className="profile-title">Profil Utilisateur</h2>
        
        <form className="profile-form" onSubmit={handleSubmit}>
          {error && <div style={{color: 'red', marginBottom: 10}}>{error}</div>}
          <div className="profile-row">
            <div className="profile-field">
              <label>Prénom</label>
              <input
                type="text"
                name="prenom"
                value={form.prenom}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <div className="profile-field">
              <label>Nom</label>
              <input
                type="text"
                name="nom"
                value={form.nom}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
          </div>
          <div className="profile-field">
            <label>Organisation</label>
            <input
              type="text"
              name="organisation"
              value={form.organisation}
              onChange={handleChange}
              placeholder="Nom de votre organisation"
              autoComplete="off"
            />
          </div>
          <div className="profile-field">
            <label>Téléphone</label>
            <input
              type="tel"
              name="telephone"
              value={form.telephone}
              onChange={handleChange}
              placeholder="+33 1 23 45 67 89"
              autoComplete="off"
            />
          </div>
          <button className="save-btn" type="submit" disabled={loading}>{loading ? 'Sauvegarde...' : 'Sauvegarder'}</button>
        </form>
      </div>
    </div>
  );
};

export default SettingsContainer;
