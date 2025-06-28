import React, { useState } from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import './Dashboard.css';

const initialMeetings = [
  {
    id: 1,
    title: 'Réunion technique infrastructures',
    description: "Finaliser le rapport d'évaluation",
    date: '10 juin 2025',
    type: 'Virtuel',
    agenda: [
      'Revue des objectifs du projet',
      "Point sur l’avancement des travaux",
      'Discussion des obstacles rencontrés',
      'Planification des prochaines étapes'
    ],
    documents: [
      { name: 'Ordre du jour', type: 'PDF' },
      { name: 'Rapport d’avancement', type: 'Excel' }
    ],
    location: 'Salle A',
    time: '10:00 - 12:00'
  }
];

const usersList = [
  { id: 1, name: 'Alice Dupont', type: 'Membre' },
  { id: 2, name: 'Bob Martin', type: 'Membre' },
  { id: 3, name: 'Carla Guest', type: 'Invité' },
  { id: 4, name: 'David Leroy', type: 'Membre' },
  { id: 5, name: 'Eva Guest', type: 'Invité' },
];

const MeetingsPage = () => {
  const [meetings, setMeetings] = useState(initialMeetings);
  const [showModal, setShowModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [editMeeting, setEditMeeting] = useState(null); // For editing
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    duration: '',
    type: 'Virtuel',
  });
  const [agendaInput, setAgendaInput] = useState('');
  const [documentsInput, setDocumentsInput] = useState({ name: '', type: '' });
  const [agenda, setAgenda] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [participants, setParticipants] = useState([]);

  const handleOpenModal = () => {
    setEditMeeting(null);
    setForm({ title: '', description: '', date: '', duration: '', type: 'Virtuel' });
    setAgenda([]);
    setDocuments([]);
    setParticipants([]);
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);
  const handleShowDetail = (meeting) => setSelectedMeeting(meeting);
  const handleCloseDetail = () => setSelectedMeeting(null);

  // Handle form changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle create or edit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMeeting) {
      setMeetings((prev) => prev.map((m) => m.id === editMeeting.id ? { ...m, ...form, date: form.date, agenda, documents, participants } : m));
    } else {
      setMeetings((prev) => [
        ...prev,
        {
          id: Date.now(),
          title: form.title,
          description: form.description,
          date: form.date,
          type: form.type,
          agenda,
          documents,
          participants,
          location: '',
          time: '',
        },
      ]);
    }
    setShowModal(false);
  };

  // Handle delete
  const handleDelete = (id) => {
    setMeetings((prev) => prev.filter((m) => m.id !== id));
  };

  // Handle edit
  const handleEdit = (meeting) => {
    setEditMeeting(meeting);
    setForm({
      title: meeting.title,
      description: meeting.description,
      date: meeting.date,
      duration: '',
      type: meeting.type,
    });
    setAgenda(meeting.agenda || []);
    setDocuments(meeting.documents || []);
    setParticipants(meeting.participants || []);
    setShowModal(true);
  };

  // Agenda handlers
  const handleAddAgenda = (e) => {
    e.preventDefault();
    if (agendaInput.trim()) {
      setAgenda([...agenda, agendaInput.trim()]);
      setAgendaInput('');
    }
  };
  const handleRemoveAgenda = (idx) => {
    setAgenda(agenda.filter((_, i) => i !== idx));
  };

  // Documents handlers
  const handleAddDocument = (e) => {
    e.preventDefault();
    if (documentsInput.name.trim() && documentsInput.type.trim()) {
      setDocuments([...documents, { ...documentsInput }]);
      setDocumentsInput({ name: '', type: '' });
    }
  };
  const handleRemoveDocument = (idx) => {
    setDocuments(documents.filter((_, i) => i !== idx));
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader />
      <DashboardSidebar />
      <main className="dashboard-main">
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24}}>
          <div>
            <h2 className="section-title" style={{marginBottom: 0}}>Gestion des Réunions</h2>
            <div style={{color: '#8d99ae', fontSize: 16}}>Consultez et gérez vos réunions</div>
          </div>
          <button className="action-button" style={{background: '#6d5dfc', color: '#fff', fontWeight: 500, fontSize: 16, borderRadius: 10, padding: '0.6rem 1.5rem', display: 'flex', alignItems: 'center', gap: 8}} onClick={handleOpenModal}>
            + Nouvelle réunion
          </button>
        </div>
        {/* Summary Card */}
        <div style={{background: '#e3f0fa', borderRadius: 16, padding: '1.2rem 2.2rem', minWidth: 120, textAlign: 'left', marginBottom: 24, maxWidth: 400}}>
          <div style={{fontSize: 18, color: '#2b2d42', fontWeight: 600}}>Total réunions</div>
          <div style={{fontSize: 32, fontWeight: 700}}>{meetings.length}</div>
        </div>
        {/* Meeting List */}
        {meetings.length === 0 ? (
          <div style={{background: '#faf9fb', border: '1.5px solid #e0e0e0', borderRadius: 16, padding: '3rem 0', textAlign: 'center', color: '#444', fontSize: 22, fontWeight: 500, letterSpacing: 0.5, minHeight: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{fontSize: 48, marginBottom: 12}}>&#128197;</div>
            Aucune réunion
            <div style={{color: '#8d99ae', fontSize: 16, marginTop: 8}}>Commencez par créer votre première réunion</div>
          </div>
        ) : (
          <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
            {meetings.map((meeting) => (
              <div key={meeting.id} className="meeting-card" style={{background: '#fff', border: '1.5px solid #e0e0e0', borderRadius: 16, padding: '1.2rem 1.5rem', marginBottom: 0, boxShadow: 'none', display: 'flex', flexDirection: 'column', gap: 8, position: 'relative', transition: 'box-shadow 0.2s, transform 0.2s'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                    <span style={{fontSize: 22, marginRight: 8}}>&#128197;</span>
                    <span style={{fontWeight: 700, fontSize: 20}}>{meeting.title}</span>
                  </div>
                  <button className="meeting-detail-btn" style={{background: '#e9ecef', color: '#021B79', border: 'none', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 600, fontSize: 15, cursor: 'pointer', transition: 'background 0.2s, transform 0.2s'}} onClick={() => handleShowDetail(meeting)}>Détail</button>
                </div>
                <div style={{color: '#8d99ae', fontSize: 16, marginLeft: 28}}>{meeting.description}</div>
                <div style={{display: 'flex', alignItems: 'center', gap: 16, marginLeft: 28, marginTop: 4}}>
                  <span style={{fontSize: 15}}>Date: {meeting.date}</span>
                  <span style={{background: '#6d5dfc', color: '#fff', borderRadius: 16, padding: '0.2rem 1.1rem', fontWeight: 600, fontSize: 15}}>{meeting.type}</span>
                </div>
                <div style={{display: 'flex', gap: 10, marginLeft: 28, marginTop: 6}}>
                  <button className="meeting-action-btn" style={{background: '#4CAF50', color: 'white', border: 'none', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 600, fontSize: 15, cursor: 'pointer', transition: 'background 0.2s, transform 0.2s'}} onClick={() => handleEdit(meeting)}>Modifier</button>
                  <button className="meeting-action-btn" style={{background: '#F44336', color: 'white', border: 'none', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 600, fontSize: 15, cursor: 'pointer', transition: 'background 0.2s, transform 0.2s'}} onClick={() => handleDelete(meeting.id)}>Supprimer</button>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Meeting Detail Modal */}
        {selectedMeeting && (
          <div style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30,32,38,0.45)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{background: '#fff', borderRadius: 10, boxShadow: '0 4px 32px rgba(0,0,0,0.18)', padding: '2rem', minWidth: 420, maxWidth: 900, width: '60vw', position: 'relative'}}>
              <button onClick={handleCloseDetail} style={{position: 'absolute', top: 18, right: 18, background: 'none', border: 'none', fontSize: 22, color: '#222', cursor: 'pointer'}}>×</button>
              <div style={{display: 'flex', gap: '2rem', alignItems: 'flex-start'}}>
                <div style={{minWidth: 80, textAlign: 'center', background: '#f8f9fa', borderRadius: 12, padding: '1rem 0'}}>
                  {/* Show only the day from the date */}
                  <div style={{fontSize: 28, fontWeight: 700, color: '#021B79'}}>
                    {(() => {
                      const d = selectedMeeting.date;
                      // Try to parse ISO (yyyy-mm-dd) or French (dd MMM yyyy)
                      let day = '';
                      if (/^\d{4}-\d{2}-\d{2}$/.test(d)) {
                        day = d.split('-')[2];
                      } else if (/^\d{1,2} /.test(d)) {
                        day = d.split(' ')[0];
                      }
                      return day;
                    })()}
                  </div>
                  <div style={{color: '#8d99ae', fontWeight: 500}}>{selectedMeeting.title.split(' ')[0]}</div>
                  <div style={{color: '#8d99ae', fontSize: 13}}>{selectedMeeting.time || ''}</div>
                  {/* Show duration if present */}
                  {selectedMeeting.duration && (
                    <div style={{color: '#6d5dfc', fontWeight: 600, fontSize: 14, marginTop: 6}}>
                      Durée : {selectedMeeting.duration} min
                    </div>
                  )}
                </div>
                <div style={{flex: 1}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div style={{fontWeight: 600, fontSize: 20}}>{selectedMeeting.title}</div>
                    <div style={{color: '#8d99ae', fontSize: 15}}>Détails de la réunion</div>
                  </div>
                  <div style={{margin: '1rem 0', color: '#8d99ae'}}>{selectedMeeting.description}</div>
                  <div style={{display: 'flex', gap: '2rem'}}>
                    <div>
                      <div style={{fontWeight: 600, marginBottom: 8}}>Ordre du jour</div>
                      <ul style={{margin: 0, paddingLeft: 18}}>
                        {selectedMeeting.agenda.map((item, idx) => (
                          <li key={idx} style={{marginBottom: 4}}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div style={{fontWeight: 600, marginBottom: 8}}>Documents attachés</div>
                      <ul style={{margin: 0, paddingLeft: 18}}>
                        {selectedMeeting.documents.map((doc, idx) => {
                          // If the document has a file property, create a download link
                          if (doc.file) {
                            const url = URL.createObjectURL(doc.file);
                            return (
                              <li key={idx} style={{marginBottom: 4}}>
                                <a href={url} download={doc.name} style={{color: '#11192f', textDecoration: 'underline', cursor: 'pointer'}} onClick={e => {
                                  // Revoke the object URL after download to avoid memory leaks
                                  setTimeout(() => URL.revokeObjectURL(url), 1000);
                                }}>
                                  {doc.name}
                                </a>
                                <span style={{color: '#8d99ae', fontSize: 13, marginLeft: 6}}>{doc.type || 'Fichier'}</span>
                              </li>
                            );
                          } else {
                            // Fallback for legacy/static documents
                            return (
                              <li key={idx} style={{marginBottom: 4}}>
                                {doc.name} <span style={{color: '#8d99ae', fontSize: 13}}>{doc.type}</span>
                              </li>
                            );
                          }
                        })}
                      </ul>
                    </div>
                  </div>
                  {/* Participants section */}
                  <div style={{marginTop: '2rem'}}>
                    <div style={{fontWeight: 600, marginBottom: 8}}>Participants</div>
                    <ul style={{margin: 0, paddingLeft: 18}}>
                      {(selectedMeeting.participants || []).length === 0 ? (
                        <li style={{color: '#8d99ae'}}>Aucun participant</li>
                      ) : (
                        (selectedMeeting.participants || []).map((name, idx) => {
                          const user = usersList.find(u => u.name === name);
                          return (
                            <li key={idx} style={{marginBottom: 4}}>
                              {name} {user ? <span style={{color: '#8d99ae', fontSize: 13}}>({user.type})</span> : null}
                            </li>
                          );
                        })
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* New Meeting Modal */}
        {showModal && (
          <div style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30,32,38,0.45)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{background: '#fff', borderRadius: 10, boxShadow: '0 4px 32px rgba(0,0,0,0.18)', padding: '2rem', minWidth: 420, maxWidth: 540, width: '100%', position: 'relative'}}>
              <button onClick={handleCloseModal} style={{position: 'absolute', top: 18, right: 18, background: 'none', border: 'none', fontSize: 22, color: '#222', cursor: 'pointer'}}>×</button>
              <h3 style={{marginTop: 0, marginBottom: 18, fontWeight: 600, fontSize: 22}}>{editMeeting ? 'Modifier la réunion' : 'Créer une nouvelle réunion'}</h3>
              <form onSubmit={handleSubmit}>
                <div style={{marginBottom: 16}}>
                  <label style={{fontWeight: 500, fontSize: 15}}>Titre de la réunion</label>
                  <input type="text" name="title" value={form.title} onChange={handleFormChange} required style={{width: '100%', padding: '0.6rem', borderRadius: 6, border: '2px solid #222', fontSize: 16, marginTop: 4}} />
                </div>
                <div style={{marginBottom: 16}}>
                  <label style={{fontWeight: 500, fontSize: 15}}>Description</label>
                  <textarea name="description" value={form.description} onChange={handleFormChange} rows={3} style={{width: '100%', padding: '0.6rem', borderRadius: 6, border: '2px solid #e0e0e0', fontSize: 16, marginTop: 4}} />
                </div>
                <div style={{marginBottom: 16}}>
                  <label style={{fontWeight: 500, fontSize: 15}}>Ordre du jour</label>
                  <div style={{display: 'flex', gap: 8, marginBottom: 8}}>
                    <input value={agendaInput} onChange={e => setAgendaInput(e.target.value)} placeholder="Ajouter un point" style={{flex: 1, padding: '0.5rem', borderRadius: 6, border: '2px solid #e0e0e0', fontSize: 15}} />
                    <button onClick={handleAddAgenda} style={{background: '#6d5dfc', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1.2rem', fontWeight: 600, fontSize: 15, cursor: 'pointer'}}>Ajouter</button>
                  </div>
                  <ul style={{margin: 0, paddingLeft: 18}}>
                    {agenda.map((item, idx) => (
                      <li key={idx} style={{marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8}}>
                        {item}
                        <button type="button" onClick={() => handleRemoveAgenda(idx)} style={{background: 'none', border: 'none', color: '#F44336', fontWeight: 700, cursor: 'pointer'}}>×</button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{marginBottom: 16}}>
                  <label style={{fontWeight: 500, fontSize: 15}}>Documents attachés</label>
                  <div style={{display: 'flex', gap: 8, marginBottom: 8}}>
                    <input
                      type="file"
                      onChange={e => {
                        const file = e.target.files[0];
                        if (file) {
                          setDocuments([...documents, { name: file.name, type: file.type || 'Fichier', file }]);
                        }
                        // Reset input so same file can be selected again if needed
                        e.target.value = '';
                      }}
                      style={{flex: 1, padding: '0.5rem', borderRadius: 6, border: '2px solid #e0e0e0', fontSize: 15}}
                    />
                  </div>
                  <ul style={{margin: 0, paddingLeft: 18}}>
                    {documents.map((doc, idx) => (
                      <li key={idx} style={{marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8}}>
                        {doc.name} <span style={{color: '#8d99ae', fontSize: 13}}>{doc.type || 'Fichier'}</span>
                        <button type="button" onClick={() => handleRemoveDocument(idx)} style={{background: 'none', border: 'none', color: '#F44336', fontWeight: 700, cursor: 'pointer'}}>×</button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap'}}>
                  <div style={{flex: 1, minWidth: 180}}>
                    <label style={{fontWeight: 500, fontSize: 15}}>Date</label>
                    <input type="date" name="date" value={form.date} onChange={handleFormChange} required style={{width: '100%', minWidth: 120, padding: '0.3rem', borderRadius: 6, border: '2px solid #e0e0e0', fontSize: 16, marginTop: 4}} />
                  </div>
                  <div style={{flex: 1, minWidth: 180}}>
                    <label style={{fontWeight: 500, fontSize: 15}}>Durée (minutes)</label>
                    <input type="number" name="duration" value={form.duration} onChange={handleFormChange} style={{width: '100%', minWidth: 120, padding: '0.4rem', borderRadius: 6, border: '2px solid #e0e0e0', fontSize: 16, marginTop: 4}} />
                  </div>
                </div>
                <div style={{marginBottom: 16}}>
                  <label style={{fontWeight: 500, fontSize: 15}}>Type de réunion</label>
                  <select name="type" value={form.type} onChange={handleFormChange} style={{width: '100%', padding: '0.6rem', borderRadius: 6, border: '2px solid #e0e0e0', fontSize: 16, marginTop: 4}}>
                    <option>Virtuel</option>
                    <option>Présentiel</option>
                  </select>
                </div>
                <div style={{marginBottom: 16}}>
                  <label style={{fontWeight: 500, fontSize: 15}}>Participants</label>
                  <select
                    multiple
                    value={participants}
                    onChange={e => {
                      const selected = Array.from(e.target.selectedOptions, option => option.value);
                      setParticipants(selected);
                    }}
                    style={{width: '100%', padding: '0.6rem', borderRadius: 6, border: '2px solid #e0e0e0', fontSize: 16, marginTop: 4, minHeight: 80}}
                  >
                    {usersList.map(user => (
                      <option key={user.id} value={user.name}>
                        {user.name} ({user.type})
                      </option>
                    ))}
                  </select>
                  <div style={{fontSize: 13, color: '#8d99ae', marginTop: 4}}>
                    Maintenez Ctrl (Windows) ou Cmd (Mac) pour sélectionner plusieurs participants
                  </div>
                </div>
                <button type="submit" style={{background: '#11192f', color: '#fff', fontWeight: 600, fontSize: 16, borderRadius: 8, padding: '0.7rem 1.5rem', border: 'none', marginTop: 8, float: 'right', cursor: 'pointer'}}>{editMeeting ? 'Enregistrer' : 'Créer la réunion'}</button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MeetingsPage;
