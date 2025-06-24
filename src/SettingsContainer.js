import React, { useState } from 'react';
import './SettingsContainer.css';

const SettingsContainer = ({ onClose }) => {
  const [form, setForm] = useState({
    prenom: '',
    nom: '',
    organisation: '',
    telephone: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userProfile', JSON.stringify(form));
    onClose();
  };

  return (
    <div className="settings-overlay">
      <div className="settings-container user-profile-container">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2 className="profile-title">Profil Utilisateur</h2>
        
        <form className="profile-form" onSubmit={handleSubmit}>
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
          <button className="save-btn" type="submit">Sauvegarder</button>
        </form>
      </div>
    </div>
  );
};

export default SettingsContainer;
