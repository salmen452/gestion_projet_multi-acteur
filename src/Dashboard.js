import React, { useState, useEffect } from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import StatsOverview from './components/StatsOverview';
import UpcomingMeetings from './components/UpcomingMeetings';
import ActionItems from './components/ActionItems';
import RecentActivity from './components/RecentActivity';
import './Dashboard.css';
import { FaUsers, FaCalendarCheck, FaTasks, FaFileContract } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import SettingsContainer from './SettingsContainer';
import ActionsChart from './components/ActionsChart';
import DocumentsChart from './components/DocumentsChart';
import DocumentsPage from './DocumentsPage';

const Dashboard = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [statsData, setStatsData] = useState([
    { icon: <FaUsers />, title: "Acteurs impliqués", value: "-", trend: 0 },
    { icon: <FaCalendarCheck />, title: "Réunions ce mois", value: "-", trend: 0 },
    { icon: <FaTasks />, title: "Actions en cours", value: "-", trend: 0 },
    { icon: <FaFileContract />, title: "Documents partagés", value: "-", trend: 0 }
  ]);
  const [meetingsData, setMeetingsData] = useState([]);
  const [actionsData, setActionsData] = useState([]);
  const [activitiesData, setActivitiesData] = useState([]);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // Fetch users
    fetch('http://localhost:5000/api/Users')
      .then(res => res.json())
      .then(users => {
        setStatsData(prev => prev.map((stat, idx) => idx === 0 ? { ...stat, value: users.length.toString() } : stat));
      });
    // Fetch meetings
    fetch('http://localhost:5000/api/Meetings')
      .then(res => res.json())
      .then(meetings => {
        // Réunions ce mois
        const now = new Date();
        const meetingsThisMonth = meetings.filter(m => {
          const d = new Date(m.date);
          return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        });
        setStatsData(prev => prev.map((stat, idx) => idx === 1 ? { ...stat, value: meetingsThisMonth.length.toString() } : stat));
        setMeetingsData(meetings.map(m => ({
          date: m.date ? (m.date.split('-')[2] || m.date) : '',
          month: m.date ? (new Date(m.date).toLocaleString('fr-FR', { month: 'short' })) : '',
          time: m.time || '',
          title: m.title,
          participants: (m.participants || []).map(name => ({ avatar: name.split(' ').map(n => n[0]).join('').toUpperCase() })),
          additionalParticipants: (m.participants || []).length > 3 ? (m.participants.length - 3) : 0
        })));
      });
    // Fetch actions
    fetch('http://localhost:5000/api/Actions')
      .then(res => res.json())
      .then(actions => {
        setStatsData(prev => prev.map((stat, idx) => idx === 2 ? { ...stat, value: actions.length.toString() } : stat));
        setActionsData(actions);
      });
    // Fetch documents
    fetch('http://localhost:5000/api/Documents')
      .then(res => res.json())
      .then(docs => {
        setStatsData(prev => prev.map((stat, idx) => idx === 3 ? { ...stat, value: docs.length.toString() } : stat));
        setDocuments(docs);
      });
    // Fetch activities (if you have an endpoint, otherwise keep static)
    // setActivitiesData([]);
  }, []);

  return (
    <div className="dashboard-container">
      <DashboardHeader />
      <DashboardSidebar onParametreClick={() => setShowSettings(true)} />
      {showSettings && (
        <SettingsContainer onClose={() => setShowSettings(false)} />
      )}

      <main className="dashboard-main">
        <StatsOverview stats={statsData} />

        <div className="dashboard-grid">
          <UpcomingMeetings meetings={meetingsData} />
          {/* Pass only the top 3 high-priority actions to ActionItems */}
          <ActionItems actions={actionsData.filter(a => a.priority === 'Haute').slice(0, 3)} />
        </div>

        <div style={{display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center', marginTop: 40}}>
          <div style={{background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', padding: 24, maxWidth: 400, minWidth: 320}}>
            <h3 style={{textAlign: 'center', marginBottom: 18}}>Répartition des Actions</h3>
            <ActionsChart actions={actionsData} />
          </div>
          <div style={{background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', padding: 24, maxWidth: 400, minWidth: 320}}>
            <h3 style={{textAlign: 'center', marginBottom: 18}}>Répartition des Documents</h3>
            <DocumentsChart documents={documents} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;