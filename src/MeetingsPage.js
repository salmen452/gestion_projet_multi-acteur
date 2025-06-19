import React from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import './Dashboard.css';
import { NavLink } from 'react-router-dom';

const meetings = [
  {
    id: 1,
    date: "15",
    month: "Oct",
    time: "10:00 - 12:00 | Salle A",
    title: "Comité de pilotage projet",
    participants: ["MP", "JC", "AD"],
    additionalParticipants: 5
  },
  {
    id: 2,
    date: "18",
    month: "Oct",
    time: "14:30 - 16:00 | Salle virtuelle",
    title: "Groupe travail environnement",
    participants: ["EL", "TC", "RG"],
    additionalParticipants: 3
  },
  {
    id: 3,
    date: "22",
    month: "Oct",
    time: "09:00 - 11:00 | Salle B",
    title: "Réunion technique infrastructures",
    participants: ["LP", "MB", "AD"],
    additionalParticipants: 4
  },
  {
    id: 4,
    date: "25",
    month: "Oct",
    time: "11:00 - 12:30 | Salle C",
    title: "Réunion de coordination",
    participants: ["MD", "JC", "TM"],
    additionalParticipants: 2
  }
];

const MeetingsPage = () => {
  return (
    <div className="dashboard-container">
      <DashboardHeader />
      <DashboardSidebar />
      
      <main className="dashboard-main">
        <div className="section-header">
          <h2 className="section-title">Réunions</h2>
        </div>
        
        <div className="dashboard-card">
          <div className="card-header">
            <div className="card-title">Liste des réunions</div>
          </div>
          <div className="card-body" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {meetings.map(meeting => (
              <div key={meeting.id} style={{
                background: '#fff',
                borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                padding: '1rem',
                minWidth: '260px',
                maxWidth: '300px',
                flex: '1 1 260px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '8px',
                    background: '#ebf0ff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '1rem'
                  }}>
                    <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0575E6' }}>{meeting.date}</div>
                    <div style={{ fontSize: '0.8rem', color: '#0575E6', textTransform: 'uppercase' }}>{meeting.month}</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600 }}>{meeting.title}</div>
                    <div style={{ color: '#8d99ae', fontSize: '0.9rem' }}>{meeting.time}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.5rem' }}>
                  {meeting.participants.map((p, idx) => (
                    <span key={idx} className="participant-avatar">{p}</span>
                  ))}
                  {meeting.additionalParticipants > 0 && (
                    <span style={{ color: '#8d99ae', fontSize: '0.85rem' }}>+{meeting.additionalParticipants} autres</span>
                  )}
                </div>
                <NavLink to="/reunion" style={{ color: '#0575E6', fontWeight: 'bold', marginTop: '0.5rem', alignSelf: 'flex-start' }}>
                  Voir le détail
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MeetingsPage;