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
  // Get user role from localStorage
  const [user, setUser] = useState(null);
  const [isCoordinator, setIsCoordinator] = useState(false);

  // For coordinator: global stats. For member: personalized stats.
  const [statsData, setStatsData] = useState([]);
  const [meetingsData, setMeetingsData] = useState([]);
  const [actionsData, setActionsData] = useState([]);
  const [activitiesData, setActivitiesData] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    // Get user info only once on mount
    let u = null;
    try {
      u = JSON.parse(localStorage.getItem('user'));
    } catch (e) {}
    setUser(u);
    setIsCoordinator(u && u.role === 'coordinator');
  }, []);

  useEffect(() => {
    if (!user) return;
    if (isCoordinator) {
      // Coordinator: show global stats
      setStatsData([
        { icon: <FaUsers />, title: "Acteurs impliqués", value: "-", trend: 0 },
        { icon: <FaCalendarCheck />, title: "Réunions ce mois", value: "-", trend: 0 },
        { icon: <FaTasks />, title: "Actions en cours", value: "-", trend: 0 },
        { icon: <FaFileContract />, title: "Documents partagés", value: "-", trend: 0 }
      ]);
      // Fetch users first, then meetings
      fetch('http://localhost:5000/api/Users')
        .then(res => res.json())
        .then(users => {
          setUsersList(users);
          setStatsData(prev => prev.map((stat, idx) => idx === 0 ? { ...stat, value: users.length.toString() } : stat));
          fetch('http://localhost:5000/api/Meetings')
            .then(res => res.json())
            .then(meetings => {
              let filteredMeetings = meetings;
              if (!isCoordinator && user) {
                const userId = user._id || user.id;
                filteredMeetings = meetings.filter(m => (m.participants || []).includes(userId));
              }
              const now = new Date();
              const meetingsThisMonth = filteredMeetings.filter(m => {
                const d = new Date(m.date);
                return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
              });
              setStatsData(prev => prev.map((stat, idx) => idx === 1 ? { ...stat, value: meetingsThisMonth.length.toString() } : stat));
              const userIdToName = {};
              users.forEach(u => {
                userIdToName[u._id || u.id] = u.name || u.nom || u.email;
              });
              setMeetingsData(filteredMeetings.map(m => {
                const dateObj = m.date ? new Date(m.date) : null;
                return {
                  date: dateObj ? dateObj.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }) : '',
                  time: m.time || '',
                  title: m.title,
                  participants: (m.participants || []).map(pid => {
                    const fullName = userIdToName[pid] || pid;
                    const prenom = fullName.split(' ')[0];
                    return { avatar: prenom };
                  }),
                  additionalParticipants: (m.participants || []).length > 3 ? (m.participants.length - 3) : 0
                };
              }));
            });
        });
      fetch('http://localhost:5000/api/Actions')
        .then(res => res.json())
        .then(actions => {
          setStatsData(prev => prev.map((stat, idx) => idx === 2 ? { ...stat, value: actions.length.toString() } : stat));
          setActionsData(actions);
        });
      fetch('http://localhost:5000/api/Documents')
        .then(res => res.json())
        .then(docs => {
          setStatsData(prev => prev.map((stat, idx) => idx === 3 ? { ...stat, value: docs.length.toString() } : stat));
          setDocuments(docs);
        });
    } else {
      // Member: show personalized stats
      setStatsData([
        { icon: <FaTasks />, title: "Mes tâches actives", value: "-", sub: "", color: "blue" },
        { icon: <FaTasks />, title: "Tâches complétées", value: "-", sub: "Ce mois", color: "green" },
        { icon: <FaFileContract />, title: "Mes documents", value: "-", sub: "", color: "purple" }
      ]);
      // Fetch users first, then meetings
      fetch('http://localhost:5000/api/Users')
        .then(res => res.json())
        .then(users => {
          setUsersList(users);
          fetch('http://localhost:5000/api/Meetings')
            .then(res => res.json())
            .then(meetings => {
              let filteredMeetings = meetings;
              if (!isCoordinator && user) {
                const userId = user._id || user.id;
                filteredMeetings = meetings.filter(m => (m.participants || []).includes(userId));
              }
              // Format meetings for UI (date, participants)
              const formattedMeetings = filteredMeetings.map(m => {
                const dateObj = m.date ? new Date(m.date) : null;
                return {
                  date: dateObj ? dateObj.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }) : '',
                  time: m.time || '',
                  title: m.title,
                  participants: (m.participants || []).map(pid => {
                    const userObj = users.find(u => (u._id === pid || u.id === pid));
                    const prenom = userObj ? (userObj.name || userObj.nom || userObj.email).split(' ')[0] : pid;
                    return { avatar: prenom };
                  }),
                  additionalParticipants: (m.participants || []).length > 3 ? (m.participants.length - 3) : 0
                };
              });
              setMeetingsData(formattedMeetings);
            });
        });
      // Fetch all actions and filter for this user
      fetch('http://localhost:5000/api/Actions')
        .then(res => res.json())
        .then(actions => {
          setActionsData(actions);
          // Active = status === 'En cours', Completed = status === 'Terminées' (all actions)
          const myActive = actions.filter(a => a.status === 'En cours');
          const myCompleted = actions.filter(a => a.status === 'Terminées');
          setStatsData(prev => prev.map((stat, idx) => {
            if (idx === 0) return { ...stat, value: myActive.length.toString(), sub: `+${myActive.length} en cours` };
            if (idx === 1) return { ...stat, value: myCompleted.length.toString(), sub: "Ce mois" };
            return stat;
          }));
        });
      // Fetch all documents and show the count
      fetch('http://localhost:5000/api/Documents')
        .then(res => res.json())
        .then(docs => {
          setDocuments(docs);
          setStatsData(prev => prev.map((stat, idx) => {
            if (idx === 2) return { ...stat, value: docs.length.toString() };
            return stat;
          }));
        });
      // Fetch all meetings and find the next one for this user
      fetch('http://localhost:5000/api/Meetings')
        .then(res => res.json())
        .then(meetings => {
          let filteredMeetings = meetings;
          if (!isCoordinator && user) {
            const userId = user._id || user.id;
            filteredMeetings = meetings.filter(m => (m.participants || []).includes(userId));
          }
          // Format meetings for UI (date, participants)
          const formattedMeetings = filteredMeetings.map(m => {
            const dateObj = m.date ? new Date(m.date) : null;
            return {
              date: dateObj ? dateObj.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }) : '',
              time: m.time || '',
              title: m.title,
              participants: (m.participants || []).map(pid => {
                // Try to get the name from usersList
                const userObj = usersList.find(u => (u._id === pid || u.id === pid));
                const prenom = userObj ? (userObj.name || userObj.nom || userObj.email).split(' ')[0] : pid;
                return { avatar: prenom };
              }),
              additionalParticipants: (m.participants || []).length > 3 ? (m.participants.length - 3) : 0
            };
          });
          setMeetingsData(formattedMeetings);
          const now = new Date();
          const myMeetings = filteredMeetings.filter(m => (m.participants || []).includes(user?._id || user?.id));
          const nextMeeting = myMeetings
            .map(m => ({ ...m, dateObj: new Date(m.date) }))
            .filter(m => m.dateObj > now)
            .sort((a, b) => a.dateObj - b.dateObj)[0];
          if (nextMeeting) {
            const diffDays = Math.ceil((nextMeeting.dateObj - now) / (1000 * 60 * 60 * 24));
            setStatsData(prev => prev.map((stat, idx) => idx === 2 ? { ...stat, value: `${diffDays}j`, sub: nextMeeting.title } : stat));
          }
        });
      // Documents can be shown in a list below if needed
      fetch('http://localhost:5000/api/Documents')
        .then(res => res.json())
        .then(docs => setDocuments(docs));
    }
  }, [user, isCoordinator]);

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
          <ActionItems actions={
            actionsData
              .filter(a => a.priority === 'Haute')
              .filter(a => isCoordinator || (user && (a.participants || []).includes(user._id || user.id)))
              .slice(0, 3)
          } />
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