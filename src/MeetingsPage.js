import React, { useState, useEffect } from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import './Dashboard.css';

const MeetingsPage = () => {
  const [meetings, setMeetings] = useState([]);
  const [usersList, setUsersList] = useState([]);
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
  const [agenda, setAgenda] = useState([]);
  const [participants, setParticipants] = useState([]);
  // ...existing code...

  // Fetch meetings and users from backend
  useEffect(() => {
    fetch('http://localhost:5000/api/Meetings')
      .then(res => res.json())
      .then(data => setMeetings(data))
      .catch(() => setMeetings([]));
    fetch('http://localhost:5000/api/Users')
      .then(res => res.json())
      .then(data => {
        console.log('Fetched users:', data);
        setUsersList(data);
      })
      .catch(() => setUsersList([]));
  }, []);

  const handleOpenModal = () => {
    setEditMeeting(null);
    setForm({ title: '', description: '', date: '', duration: '', type: 'Virtuel' });
    setAgenda([]);
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

  // Create or update meeting
  const handleSubmit = async (e) => {
    e.preventDefault();
    // No documents, send as JSON
    const meetingData = {
      ...form,
      agenda,
      participants,
      location: '',
      time: '',
    };
    const url = editMeeting
      ? `http://localhost:5000/api/Meetings/${editMeeting._id || editMeeting.id}`
      : 'http://localhost:5000/api/Meetings';
    const method = editMeeting ? 'PUT' : 'POST';
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(meetingData),
    });
    // Refresh meetings
    fetch('http://localhost:5000/api/Meetings')
      .then(res => res.json())
      .then(data => setMeetings(data));
    setShowModal(false);
  };

  // Delete meeting
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/Meetings/${id}`, { method: 'DELETE' });
    fetch('http://localhost:5000/api/Meetings')
      .then(res => res.json())
      .then(data => setMeetings(data));
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
  // ...existing code...

  return (
    <div className="dashboard-container">
      <DashboardHeader />
      <DashboardSidebar />
      <main className="dashboard-main">
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24}}>
          <div>
            <h2 className="section-title" style={{marginBottom: 0}}>Réunions</h2>
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
              <div key={meeting._id || meeting.id} className="meeting-card" style={{background: '#fff', border: '1.5px solid #e0e0e0', borderRadius: 16, padding: '1.2rem 1.5rem', marginBottom: 0, boxShadow: 'none', display: 'flex', flexDirection: 'column', gap: 8, position: 'relative', transition: 'box-shadow 0.2s, transform 0.2s'}}>
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
                  <button className="meeting-action-btn" style={{background: '#F44336', color: 'white', border: 'none', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 600, fontSize: 15, cursor: 'pointer', transition: 'background 0.2s, transform 0.2s'}} onClick={() => handleDelete(meeting._id || meeting.id)}>Supprimer</button>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Meeting Detail Modal */}
        {selectedMeeting && (
          <div style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30,32,38,0.45)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{background: '#fff', borderRadius: 16, boxShadow: '0 8px 40px rgba(0,0,0,0.18)', padding: '2.5rem 2.2rem 2rem 2.2rem', minWidth: 380, maxWidth: 700, width: '95%', position: 'relative', maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 0}}>
              <button onClick={handleCloseDetail} style={{position: 'absolute', top: 18, right: 18, background: 'none', border: 'none', fontSize: 26, color: '#222', cursor: 'pointer', fontWeight: 700, lineHeight: 1}}>×</button>
              <div style={{marginBottom: 24, borderBottom: '1.5px solid #e0e0e0', paddingBottom: 12, display: 'flex', alignItems: 'center', gap: 12}}>
                <span style={{fontSize: 22, color: '#6d5dfc', fontWeight: 700}}>&#128197;</span>
                <h3 style={{margin: 0, fontWeight: 700, fontSize: 22, color: '#11192f'}}>Détail de la réunion</h3>
              </div>
              <div style={{display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap'}}>
                <div style={{minWidth: 80, textAlign: 'center', background: '#f8f9fa', borderRadius: 12, padding: '1rem 0', flex: '0 0 100px'}}>
                  <div style={{fontSize: 28, fontWeight: 700, color: '#021B79'}}>
                    {(() => {
                      const d = selectedMeeting.date;
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
                  {selectedMeeting.duration && (
                    <div style={{color: '#6d5dfc', fontWeight: 600, fontSize: 14, marginTop: 6}}>
                      Durée : {selectedMeeting.duration} min
                    </div>
                  )}
                </div>
                <div style={{flex: 1, minWidth: 200}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div style={{fontWeight: 600, fontSize: 20}}>{selectedMeeting.title}</div>
                    <div style={{color: '#8d99ae', fontSize: 15}}>Détails de la réunion</div>
                  </div>
                  <div style={{margin: '1rem 0', color: '#8d99ae'}}>{selectedMeeting.description}</div>
                  <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap'}}>
                    <div>
                      <div style={{fontWeight: 600, marginBottom: 8}}>Ordre du jour</div>
                      <ul style={{margin: 0, paddingLeft: 18}}>
                        {selectedMeeting.agenda.map((item, idx) => (
                          <li key={idx} style={{marginBottom: 4}}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    {/* Documents section removed to prevent map on undefined */}
                  </div>
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
            <div style={{background: '#fff', borderRadius: 16, boxShadow: '0 8px 40px rgba(0,0,0,0.18)', padding: '2.5rem 2.2rem 2rem 2.2rem', minWidth: 380, maxWidth: 520, width: '95%', position: 'relative', maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 0}}>
              <button onClick={handleCloseModal} style={{position: 'absolute', top: 18, right: 18, background: 'none', border: 'none', fontSize: 26, color: '#222', cursor: 'pointer', fontWeight: 700, lineHeight: 1}}>×</button>
              <div style={{marginBottom: 24, borderBottom: '1.5px solid #e0e0e0', paddingBottom: 12, display: 'flex', alignItems: 'center', gap: 12}}>
                <span style={{fontSize: 22, color: '#6d5dfc', fontWeight: 700}}>&#128197;</span>
                <h3 style={{margin: 0, fontWeight: 700, fontSize: 22, color: '#11192f'}}>{editMeeting ? 'Modifier la réunion' : 'Créer une nouvelle réunion'}</h3>
              </div>
              <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: 22}}>
                <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
                  <div style={{width: '100%'}}>
                    <label style={{fontWeight: 500, fontSize: 15, display: 'block', marginBottom: 8}}>Titre de la réunion</label>
                    <input type="text" name="title" value={form.title} onChange={handleFormChange} required style={{width: '100%', padding: '0.7rem', borderRadius: 8, border: '2px solid #e0e0e0', fontSize: 16, background: '#f8f9fa'}} />
                  </div>
                  <div style={{width: '100%'}}>
                    <label style={{fontWeight: 500, fontSize: 15, display: 'block', marginBottom: 8}}>Description</label>
                    <textarea name="description" value={form.description} onChange={handleFormChange} required rows={3} style={{width: '100%', padding: '0.7rem', borderRadius: 8, border: '2px solid #e0e0e0', fontSize: 16, background: '#f8f9fa', resize: 'vertical'}} />
                  </div>
                  <div style={{width: '100%', display: 'flex', gap: 12}}>
                    <div style={{flex: 1}}>
                      <label style={{fontWeight: 500, fontSize: 15, display: 'block', marginBottom: 8}}>Date</label>
                      <input type="date" name="date" value={form.date} onChange={handleFormChange} required style={{width: '100%', padding: '0.7rem', borderRadius: 8, border: '2px solid #e0e0e0', fontSize: 16, background: '#f8f9fa'}} />
                    </div>
                    <div style={{flex: 1}}>
                      <label style={{fontWeight: 500, fontSize: 15, display: 'block', marginBottom: 8}}>Heure de début</label>
                      <input type="time" name="time" value={form.time || ''} onChange={handleFormChange} required style={{width: '100%', padding: '0.6rem', borderRadius: 8, border: '2px solid #e0e0e0', fontSize: 16, background: '#f8f9fa',marginLeft:14}} />
                    </div>
                  </div>
                  <div style={{width: '100%'}}>
                    <label style={{fontWeight: 500, fontSize: 15, display: 'block', marginBottom: 8}}>Durée (minutes)</label>
                    <input type="number" name="duration" value={form.duration} onChange={handleFormChange} style={{width: '100%', padding: '0.7rem', borderRadius: 8, border: '2px solid #e0e0e0', fontSize: 16, background: '#f8f9fa'}} />
                  </div>
                  <div style={{width: '100%'}}>
                    <label style={{fontWeight: 500, fontSize: 15, display: 'block', marginBottom: 8}}>Type de réunion</label>
                    <select name="type" value={form.type} onChange={handleFormChange} style={{width: '100%', padding: '0.7rem', borderRadius: 8, border: '2px solid #e0e0e0', fontSize: 16, background: '#f8f9fa'}}>
                      <option>Virtuel</option>
                      <option>Présentiel</option>
                    </select>
                  </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                  <label style={{fontWeight: 500, fontSize: 15}}>Participants</label>
                  <select
                    multiple
                    value={participants}
                    onChange={e => {
                      const selected = Array.from(e.target.selectedOptions, option => option.value);
                      setParticipants(selected);
                    }}
                    style={{width: '100%', padding: '0.7rem', borderRadius: 8, border: '2px solid #e0e0e0', fontSize: 16, minHeight: 80, background: '#f8f9fa'}}
                  >
                    {usersList.map(user => {
                      // Support both 'name' and 'nom' fields for user display
                      const displayName = user.name || user.nom || user.email || 'Utilisateur inconnu';
                      return (
                        <option key={user.id || user._id || user.email} value={displayName}>
                          {displayName}
                        </option>
                      );
                    })}
                  </select>
                  <div style={{fontSize: 13, color: '#8d99ae'}}>
                    Maintenez Ctrl (Windows) ou Cmd (Mac) pour sélectionner plusieurs participants
                  </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                  <label style={{fontWeight: 500, fontSize: 15}}>Ordre du jour</label>
                  <div style={{display: 'flex', gap: 8}}>
                    <input value={agendaInput} onChange={e => setAgendaInput(e.target.value)} placeholder="Ajouter un point" style={{flex: 1, padding: '0.6rem', borderRadius: 8, border: '2px solid #e0e0e0', fontSize: 15, background: '#f8f9fa'}} />
                    <button onClick={handleAddAgenda} style={{background: '#6d5dfc', color: '#fff', border: 'none', borderRadius: 8, padding: '0.6rem 1.2rem', fontWeight: 600, fontSize: 15, cursor: 'pointer'}}>Ajouter</button>
                  </div>
                  <ul style={{margin: 0, paddingLeft: 18}}>
                    {agenda.map((item, idx) => (
                      <li key={idx} style={{marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8}}>
                        {item}
                        <button type="button" onClick={() => handleRemoveAgenda(idx)} style={{background: 'none', border: 'none', color: '#F44336', fontWeight: 700, cursor: 'pointer', fontSize: 18, lineHeight: 1}}>×</button>
                      </li>
                    ))}
                  </ul>
                </div>
                <button type="submit" style={{background: '#11192f', color: '#fff', fontWeight: 700, fontSize: 17, borderRadius: 8, padding: '0.9rem 0', border: 'none', marginTop: 10, width: '100%', cursor: 'pointer', boxShadow: '0 2px 8px rgba(17,25,47,0.08)'}}>{editMeeting ? 'Enregistrer' : 'Créer la réunion'}</button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MeetingsPage;
