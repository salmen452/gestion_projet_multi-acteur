import React, { useState } from 'react';
import { FaSave, FaUndo } from 'react-icons/fa';
import '../../AdminDashboard.css';

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    general: {
      siteName: 'DataDolt',
      language: 'fr',
      timezone: 'Europe/Paris',
      dateFormat: 'DD/MM/YYYY'
    },
    security: {
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      passwordExpiry: 90,
      twoFactorAuth: false
    },
    backup: {
      autoBackup: true,
      backupFrequency: 'daily',
      backupTime: '02:00',
      retentionPeriod: 30
    },
    email: {
      smtpServer: 'smtp.example.com',
      smtpPort: 587,
      smtpUsername: 'admin@example.com',
      smtpPassword: '********',
      emailNotifications: true
    }
  });

  const [activeTab, setActiveTab] = useState('general');

  const handleSettingChange = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    // Here you would typically make an API call to save the settings
    console.log('Saving settings:', settings);
    alert('Paramètres sauvegardés avec succès !');
  };

  const handleReset = () => {
    if (window.confirm('Êtes-vous sûr de vouloir réinitialiser les paramètres ?')) {
      // Here you would typically fetch the default settings from the server
      setSettings({
        general: {
          siteName: 'DataDolt',
          language: 'fr',
          timezone: 'Europe/Paris',
          dateFormat: 'DD/MM/YYYY'
        },
        security: {
          sessionTimeout: 30,
          maxLoginAttempts: 5,
          passwordExpiry: 90,
          twoFactorAuth: false
        },
        backup: {
          autoBackup: true,
          backupFrequency: 'daily',
          backupTime: '02:00',
          retentionPeriod: 30
        },
        email: {
          smtpServer: 'smtp.example.com',
          smtpPort: 587,
          smtpUsername: 'admin@example.com',
          smtpPassword: '********',
          emailNotifications: true
        }
      });
    }
  };

  const renderGeneralSettings = () => (
    <div className="settings-section">
      <div className="form-group">
        <label className="form-label">Nom du site</label>
        <input
          type="text"
          className="form-input"
          value={settings.general.siteName}
          onChange={(e) => handleSettingChange('general', 'siteName', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Langue</label>
        <select
          className="form-input"
          value={settings.general.language}
          onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
        >
          <option value="fr">Français</option>
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Fuseau horaire</label>
        <select
          className="form-input"
          value={settings.general.timezone}
          onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
        >
          <option value="Europe/Paris">Europe/Paris</option>
          <option value="UTC">UTC</option>
          <option value="America/New_York">America/New_York</option>
        </select>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="settings-section">
      <div className="form-group">
        <label className="form-label">Délai d'expiration de session (minutes)</label>
        <input
          type="number"
          className="form-input"
          value={settings.security.sessionTimeout}
          onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Nombre maximum de tentatives de connexion</label>
        <input
          type="number"
          className="form-input"
          value={settings.security.maxLoginAttempts}
          onChange={(e) => handleSettingChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Expiration du mot de passe (jours)</label>
        <input
          type="number"
          className="form-input"
          value={settings.security.passwordExpiry}
          onChange={(e) => handleSettingChange('security', 'passwordExpiry', parseInt(e.target.value))}
        />
      </div>
      <div className="form-group">
        <label className="form-label">
          <input
            type="checkbox"
            checked={settings.security.twoFactorAuth}
            onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
          />
          Activer l'authentification à deux facteurs
        </label>
      </div>
    </div>
  );

  const renderBackupSettings = () => (
    <div className="settings-section">
      <div className="form-group">
        <label className="form-label">
          <input
            type="checkbox"
            checked={settings.backup.autoBackup}
            onChange={(e) => handleSettingChange('backup', 'autoBackup', e.target.checked)}
          />
          Sauvegarde automatique
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">Fréquence de sauvegarde</label>
        <select
          className="form-input"
          value={settings.backup.backupFrequency}
          onChange={(e) => handleSettingChange('backup', 'backupFrequency', e.target.value)}
        >
          <option value="hourly">Toutes les heures</option>
          <option value="daily">Quotidienne</option>
          <option value="weekly">Hebdomadaire</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Heure de sauvegarde</label>
        <input
          type="time"
          className="form-input"
          value={settings.backup.backupTime}
          onChange={(e) => handleSettingChange('backup', 'backupTime', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Période de rétention (jours)</label>
        <input
          type="number"
          className="form-input"
          value={settings.backup.retentionPeriod}
          onChange={(e) => handleSettingChange('backup', 'retentionPeriod', parseInt(e.target.value))}
        />
      </div>
    </div>
  );

  const renderEmailSettings = () => (
    <div className="settings-section">
      <div className="form-group">
        <label className="form-label">Serveur SMTP</label>
        <input
          type="text"
          className="form-input"
          value={settings.email.smtpServer}
          onChange={(e) => handleSettingChange('email', 'smtpServer', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Port SMTP</label>
        <input
          type="number"
          className="form-input"
          value={settings.email.smtpPort}
          onChange={(e) => handleSettingChange('email', 'smtpPort', parseInt(e.target.value))}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Nom d'utilisateur SMTP</label>
        <input
          type="text"
          className="form-input"
          value={settings.email.smtpUsername}
          onChange={(e) => handleSettingChange('email', 'smtpUsername', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Mot de passe SMTP</label>
        <input
          type="password"
          className="form-input"
          value={settings.email.smtpPassword}
          onChange={(e) => handleSettingChange('email', 'smtpPassword', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="form-label">
          <input
            type="checkbox"
            checked={settings.email.emailNotifications}
            onChange={(e) => handleSettingChange('email', 'emailNotifications', e.target.checked)}
          />
          Activer les notifications par email
        </label>
      </div>
    </div>
  );

  return (
    <div className="system-settings">
      <div className="settings-tabs">
        <button
          className={`settings-tab ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          Général
        </button>
        <button
          className={`settings-tab ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          Sécurité
        </button>
        <button
          className={`settings-tab ${activeTab === 'backup' ? 'active' : ''}`}
          onClick={() => setActiveTab('backup')}
        >
          Sauvegarde
        </button>
        <button
          className={`settings-tab ${activeTab === 'email' ? 'active' : ''}`}
          onClick={() => setActiveTab('email')}
        >
          Email
        </button>
      </div>

      <div className="settings-content">
        {activeTab === 'general' && renderGeneralSettings()}
        {activeTab === 'security' && renderSecuritySettings()}
        {activeTab === 'backup' && renderBackupSettings()}
        {activeTab === 'email' && renderEmailSettings()}
      </div>

      <div className="settings-actions">
        <button className="action-button" onClick={handleSave}>
          <FaSave className="action-icon" />
          Sauvegarder
        </button>
        <button className="action-button secondary" onClick={handleReset}>
          <FaUndo className="action-icon" />
          Réinitialiser
        </button>
      </div>
    </div>
  );
};

export default SystemSettings; 