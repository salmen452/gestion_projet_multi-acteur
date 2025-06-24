import React, { useState } from 'react';
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

  // Stats data
  const statsData = [
    {
      icon: <FaUsers />,
      title: "Acteurs impliqués",
      value: "42",
      trend: 12
    },
    {
      icon: <FaCalendarCheck />,
      title: "Réunions ce mois",
      value: "7",
      trend: -5
    },
    {
      icon: <FaTasks />,
      title: "Actions en cours",
      value: "19",
      trend: 8
    },
    {
      icon: <FaFileContract />,
      title: "Documents partagés",
      value: "28",
      trend: 15
    }
  ];

  // Meetings data
  const meetingsData = [
    {
      date: "15",
      month: "Oct",
      time: "10:00 - 12:00 | Salle A",
      title: "Comité de pilotage projet",
      participants: [
        { avatar: "MP" },
        { avatar: "JC" },
        { avatar: "AD" }
      ],
      additionalParticipants: 5
    },
    {
      date: "18",
      month: "Oct",
      time: "14:30 - 16:00 | Salle virtuelle",
      title: "Groupe travail environnement",
      participants: [
        { avatar: "EL" },
        { avatar: "TC" },
        { avatar: "RG" }
      ],
      additionalParticipants: 3
    },
    {
      date: "22",
      month: "Oct",
      time: "09:00 - 11:00 | Salle B",
      title: "Réunion technique infrastructures",
      participants: [
        { avatar: "LP" },
        { avatar: "MB" },
        { avatar: "AD" }
      ],
      additionalParticipants: 4
    }
  ];

  // Actions data
  const actionsData = [
    {
      status: "pending",
      title: "Finaliser le rapport d'évaluation environnementale",
      description: "Rapport d'évaluation environnementale pour le projet X",
      dueDate: "20 Oct 2023",
      priority: "high"
    },
    {
      status: "pending",
      title: "Contacter les partenaires financiers",
      description: "Prise de contact avec les partenaires pour le financement",
      dueDate: "17 Oct 2023",
      priority: "medium"
    },
    {
      status: "pending",
      title: "Préparer l'ordre du jour pour la prochaine réunion",
      description: "Ordre du jour pour la réunion du comité de pilotage",
      dueDate: "14 Oct 2023",
      priority: "high"
    },
    {
      status: "completed",
      title: "Mettre à jour la base de données des acteurs",
      description: "Mise à jour des informations des acteurs impliqués",
      dueDate: "10 Oct 2023",
      priority: "low"
    }
  ];

  // Activities data
  const activitiesData = [
    {
      icon: <MdEmail />,
      user: "Marie Dupont",
      time: "Il y a 2 heures",
      description: "a ajouté un nouveau document \"Rapport financier Q3\""
    },
    {
      icon: "💬",
      user: "Jean Claude",
      time: "Il y a 5 heures",
      description: "a commenté le plan d'action environnemental"
    },
    {
      icon: "✅",
      user: "Thomas Martin",
      time: "Hier, 16:30",
      description: "a marqué une action comme terminée"
    },
    {
      icon: "👤",
      user: "Lucie Petit",
      time: "Hier, 11:15",
      description: "a rejoint le groupe de travail Éducation"
    },
    {
      icon: "📅",
      user: "Système",
      time: "Avant-hier",
      description: "Nouvelle réunion planifiée: \"Comité technique\" le 25 Oct"
    }
  ];

  // Documents data
  const [documents] = useState([
    {
      id: 1,
      name: 'CR Atelier Aménagement Urbain',
      file: 'charte_eau_v2.1.pdf',
      type: 'Compte-rendu',
      date: '18 juin 2025',
    },
    // Ajoutez d'autres documents ici si besoin
  ]);

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
          <ActionItems actions={actionsData} />
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