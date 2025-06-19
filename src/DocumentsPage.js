import React, { useState } from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import './Dashboard.css';
import { FaUpload, FaCalendarAlt, FaFileAlt, FaTrash, FaDownload } from 'react-icons/fa';

const initialDocuments = [
  // Example:
   {
     id: 1,
    name: 'CR Atelier Aménagement Urbain',
     file: 'charte_eau_v2.1.pdf',
     type: 'Compte-rendu',
     date: '18 juin 2025',
   },
];

const docTypes = [
  { key: 'Ordre du jour', label: 'Ordre du jour' },
  { key: 'Compte-rendu', label: 'Compte-rendu' },
  { key: 'Document projet', label: 'Document projet' },
  { key: 'Contrat', label: 'Contrat' },
  { key: 'Rapport', label: 'Rapport' },
  { key: 'Autre', label: 'Autre' },
];

const typeColors = {
  'Ordre du jour': '#e57373',
  'Compte-rendu': '#6d5dfc',
  'Document projet': '#1976d2',
  'Contrat': '#8d99ae',
  'Rapport': '#4CAF50',
  'Autre': '#FFC107',
};

const DocumentsPage = () => {
  const [documents, setDocuments] = useState(initialDocuments);
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: '',
    file: '',
    type: docTypes[0].key,
    date: new Date().toISOString().slice(0, 10),
  });

  const filteredDocs = filter === 'all' ? documents : documents.filter(d => d.type === filter);

  // Count for summary card
  const totalDocs = documents.length;

  const handleDelete = (id) => {
    setDocuments(documents.filter(d => d.id !== id));
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    setForm(f => ({ ...f, [name]: files ? files[0].name : value }));
  };

  const handleUpload = (e) => {
    e.preventDefault();
    setDocuments([
      ...documents,
      {
        id: documents.length + 1,
        name: form.name,
        file: form.file,
        type: form.type,
        date: form.date.split('-').reverse().join(' '),
      },
    ]);
    setShowModal(false);
    setForm({ name: '', file: '', type: docTypes[0].key, date: new Date().toISOString().slice(0, 10) });
  };

  // Helper to download a dummy file if not present
  const handleDownload = (doc) => {
    // If you have a real file URL, use it here. Otherwise, create a dummy file.
    const content = `Ceci est un fichier factice pour ${doc.name}`;
    const blob = new Blob([content], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = doc.file || 'document.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader />
      <DashboardSidebar />
      <main className="dashboard-main">
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24}}>
          <div>
            <h2 className="section-title" style={{marginBottom: 0}}>Gestion Documentaire</h2>
            <div style={{color: '#8d99ae', fontSize: 16}}>Consultez les documents partagés</div>
          </div>
          <button className="action-button" style={{background: '#6d5dfc', color: '#fff', fontWeight: 500, fontSize: 16, borderRadius: 10, padding: '0.6rem 1.5rem', display: 'flex', alignItems: 'center', gap: 8}} onClick={() => setShowModal(true)}>
            <FaUpload /> téléverser un document
          </button>
        </div>
        {/* Modal for upload */}
        {showModal && (
          <div style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30,32,38,0.45)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{background: '#fff', borderRadius: 10, boxShadow: '0 4px 32px rgba(0,0,0,0.18)', padding: '2rem', minWidth: 420, maxWidth: 540, width: '100%', position: 'relative'}}>
              <button onClick={() => setShowModal(false)} style={{position: 'absolute', top: 18, right: 18, background: 'none', border: 'none', fontSize: 22, color: '#222', cursor: 'pointer'}}>×</button>
              <h3 style={{marginTop: 0, marginBottom: 18, fontWeight: 600, fontSize: 22}}>Téléverser un document</h3>
              <form onSubmit={handleUpload}>
                <div style={{marginBottom: 16}}>
                  <label style={{fontWeight: 500, fontSize: 15}}>Nom du document</label>
                  <input name="name" value={form.name} onChange={handleFormChange} required style={{width: '100%', padding: '0.6rem', borderRadius: 6, border: '2px solid #222', fontSize: 16, marginTop: 4}} />
                </div>
                <div style={{marginBottom: 16}}>
                  <label style={{fontWeight: 500, fontSize: 15}}>Fichier</label>
                  <input name="file" type="file" onChange={handleFormChange} required style={{width: '100%', padding: '0.6rem', borderRadius: 6, border: '2px solid #e0e0e0', fontSize: 16, marginTop: 4}} />
                </div>
                <div style={{display: 'flex', gap: 16, marginBottom: 16}}>
                  <div style={{flex: 1}}>
                    <label style={{fontWeight: 500, fontSize: 15}}>Catégorie</label>
                    <select name="type" value={form.type} onChange={handleFormChange} style={{width: '100%', padding: '0.6rem', borderRadius: 6, border: '2px solid #e0e0e0', fontSize: 16, marginTop: 4}}>
                      {docTypes.map(dt => (
                        <option key={dt.key} value={dt.key}>{dt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div style={{flex: 1}}>
                    <label style={{fontWeight: 500, fontSize: 15}}>Date d'ajout</label>
                    <input name="date" value={form.date} onChange={handleFormChange} type="date" required style={{width: '100%', padding: '0.6rem', borderRadius: 6, border: '2px solid #e0e0e0', fontSize: 16, marginTop: 4}} />
                  </div>
                </div>
                <button type="submit" style={{background: '#11192f', color: '#fff', fontWeight: 600, fontSize: 16, borderRadius: 8, padding: '0.7rem 1.5rem', border: 'none', marginTop: 8, float: 'right', cursor: 'pointer'}}>Téléverser</button>
              </form>
            </div>
          </div>
        )}
        {/* Summary Card */}
        <div style={{background: '#e3f0fa', borderRadius: 16, padding: '1.2rem 2.2rem', minWidth: 120, textAlign: 'left', marginBottom: 24, maxWidth: 400}}>
          <div style={{fontSize: 18, color: '#2b2d42', fontWeight: 600}}>Total documents</div>
          <div style={{fontSize: 32, fontWeight: 700}}>{totalDocs}</div>
        </div>
        {/* Filter Buttons */}
        <div style={{display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap'}}>
          <button
            key="all"
            onClick={() => setFilter('all')}
            style={{
              background: filter === 'all' ? '#6d5dfc' : '#f3f3f3',
              color: filter === 'all' ? '#fff' : '#444',
              border: 'none',
              borderRadius: 10,
              padding: '0.5rem 1.2rem',
              fontWeight: 600,
              fontSize: 15,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Toutes
          </button>
          {docTypes.map(t => (
            <button
              key={t.key}
              onClick={() => setFilter(t.key)}
              style={{
                background: filter === t.key ? '#6d5dfc' : '#f3f3f3',
                color: filter === t.key ? '#fff' : '#444',
                border: 'none',
                borderRadius: 10,
                padding: '0.5rem 1.2rem',
                fontWeight: 600,
                fontSize: 15,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
        {/* Document List */}
        {filteredDocs.length === 0 ? (
          <div style={{background: '#faf9fb', border: '1.5px solid #e0e0e0', borderRadius: 16, padding: '3rem 0', textAlign: 'center', color: '#444', fontSize: 22, fontWeight: 500, letterSpacing: 0.5, minHeight: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <FaFileAlt style={{fontSize: 48, marginBottom: 12, color: '#8d99ae'}} />
            Aucun document
            <div style={{color: '#8d99ae', fontSize: 16, marginTop: 8}}>Aucun document disponible pour le moment</div>
          </div>
        ) : (
          <div style={{display: 'flex', gap: 18, flexWrap: 'wrap'}}>
            {filteredDocs.map(doc => (
              <div key={doc.id} style={{background: '#fff', border: '1.5px solid #e0e0e0', borderRadius: 16, padding: '1.2rem 1.5rem', minWidth: 280, maxWidth: 340, flex: '1 1 280px', display: 'flex', flexDirection: 'column', gap: 8, position: 'relative'}}>
                <div style={{fontWeight: 700, fontSize: 18, marginBottom: 2}}>{doc.name}</div>
                <div style={{color: '#8d99ae', fontSize: 15, marginBottom: 2}}>Fichier: {doc.file}</div>
                <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2}}>
                  <FaCalendarAlt style={{color: '#444'}} />
                  <span style={{fontSize: 14}}>Ajouté le: {doc.date}</span>
                </div>
                <div style={{display: 'flex', gap: 8, marginBottom: 2}}>
                  <span style={{background: typeColors[doc.type] || '#eee', color: '#fff', borderRadius: 16, padding: '0.2rem 1.1rem', fontWeight: 600, fontSize: 14}}>{doc.type}</span>
                </div>
                <div style={{display: 'flex', gap: 8, marginTop: 8}}>
                  <button onClick={() => handleDownload(doc)} style={{background: '#43b36a', color: '#fff', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 600, fontSize: 15, border: 'none', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer'}}>
                    <FaDownload /> Télécharger
                  </button>
                  <button onClick={() => handleDelete(doc.id)} style={{background: '#e53935', color: '#fff', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 600, fontSize: 15, border: 'none', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer'}}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default DocumentsPage;