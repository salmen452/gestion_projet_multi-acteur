import React, { useEffect, useRef } from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import './Dashboard.css';
import { FaUsers, FaCalendarCheck, FaTasks, FaFileContract } from 'react-icons/fa';
import { MdEmail} from 'react-icons/md';
import Chart from 'chart.js/auto';

const Dashboard = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      const ctx = chartRef.current.getContext('2d');
      chartInstanceRef.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Environnement', 'Éducation', 'Infrastructures', 'Santé'],
          datasets: [{
            data: [12, 8, 10, 7],
            backgroundColor: ['#6d5dfc', '#4CAF50', '#FFC107', '#F44336'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 12,
                padding: 20
              }
            }
          },
          cutout: '70%'
        }
      });
    }
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="dashboard-container">
      <DashboardHeader />
      <DashboardSidebar />
      
      <main className="dashboard-main">
        {/* Stats Overview */}
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon blue">
              <FaUsers />
            </div>
            <div className="stat-info">
              <div className="stat-value">42</div>
              <div className="stat-label">Acteurs impliqués</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon green">
              <FaCalendarCheck />
            </div>
            <div className="stat-info">
              <div className="stat-value">7</div>
              <div className="stat-label">Réunions ce mois</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon orange">
              <FaTasks />
            </div>
            <div className="stat-info">
              <div className="stat-value">19</div>
              <div className="stat-label">Actions en cours</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon purple">
              <FaFileContract />
            </div>
            <div className="stat-info">
              <div className="stat-value">28</div>
              <div className="stat-label">Documents partagés</div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="dashboard-grid">
          {/* Upcoming Meetings */}
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <FaCalendarCheck className="card-icon" />
                Réunions à venir
              </div>
              <div className="card-actions">
                <div className="action-dots">•••</div>
              </div>
            </div>
            <div className="card-body">
              <div className="meeting-item">
                <div className="meeting-date">
                  <div className="meeting-day">15</div>
                  <div className="meeting-month">Oct</div>
                </div>
                <div className="meeting-details">
                  <div className="meeting-title">Comité de pilotage projet</div>
                  <div className="meeting-time">
                    <span className="time-icon">🕒</span>
                    10:00 - 12:00 | Salle A
                  </div>
                  <div className="meeting-participants">
                    <span className="participant-avatar">MP</span>
                    <span className="participant-avatar">JC</span>
                    <span className="participant-avatar">AD</span>
                    +5 autres
                  </div>
                </div>
              </div>
              <div className="meeting-item">
                <div className="meeting-date">
                  <div className="meeting-day">18</div>
                  <div className="meeting-month">Oct</div>
                </div>
                <div className="meeting-details">
                  <div className="meeting-title">Groupe travail environnement</div>
                  <div className="meeting-time">
                    <span className="time-icon">🕒</span>
                    14:30 - 16:00 | Salle virtuelle
                  </div>
                  <div className="meeting-participants">
                    <span className="participant-avatar">EL</span>
                    <span className="participant-avatar">TC</span>
                    <span className="participant-avatar">RG</span>
                    +3 autres
                  </div>
                </div>
              </div>
              <div className="meeting-item">
                <div className="meeting-date">
                  <div className="meeting-day">22</div>
                  <div className="meeting-month">Oct</div>
                </div>
                <div className="meeting-details">
                  <div className="meeting-title">Réunion technique infrastructures</div>
                  <div className="meeting-time">
                    <span className="time-icon">🕒</span>
                    09:00 - 11:00 | Salle B
                  </div>
                  <div className="meeting-participants">
                    <span className="participant-avatar">LP</span>
                    <span className="participant-avatar">MB</span>
                    <span className="participant-avatar">AD</span>
                    +4 autres
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Items */}
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <FaTasks className="card-icon" />
                Actions prioritaires
              </div>
              <div className="card-actions">
                <div className="action-dots">•••</div>
              </div>
            </div>
            <div className="card-body">
              <div className="action-item">
                <div className="action-checkbox">
                  <input type="checkbox" />
                </div>
                <div className="action-details">
                  <div className="action-title">Finaliser le rapport d'évaluation environnementale</div>
                  <div className="action-meta">
                    <div className="action-deadline">
                      <span className="calendar-icon">📅</span>
                      20 Oct 2023
                    </div>
                    <div className="action-priority priority-high">Haute</div>
                  </div>
                </div>
              </div>
              <div className="action-item">
                <div className="action-checkbox">
                  <input type="checkbox" />
                </div>
                <div className="action-details">
                  <div className="action-title">Contacter les partenaires financiers</div>
                  <div className="action-meta">
                    <div className="action-deadline">
                      <span className="calendar-icon">📅</span>
                      17 Oct 2023
                    </div>
                    <div className="action-priority priority-medium">Moyenne</div>
                  </div>
                </div>
              </div>
              <div className="action-item">
                <div className="action-checkbox">
                  <input type="checkbox" />
                </div>
                <div className="action-details">
                  <div className="action-title">Préparer l'ordre du jour pour la prochaine réunion</div>
                  <div className="action-meta">
                    <div className="action-deadline">
                      <span className="calendar-icon">📅</span>
                      14 Oct 2023
                    </div>
                    <div className="action-priority priority-high">Haute</div>
                  </div>
                </div>
              </div>
              <div className="action-item">
                <div className="action-checkbox">
                  <input type="checkbox" checked readOnly />
                </div>
                <div className="action-details">
                  <div className="action-title">Mettre à jour la base de données des acteurs</div>
                  <div className="action-meta">
                    <div className="action-deadline">
                      <span className="calendar-icon">📅</span>
                      10 Oct 2023
                    </div>
                    <div className="action-priority priority-low">Faible</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <span className="history-icon">🔄</span>
                Activité récente
              </div>
              <div className="card-actions">
                <div className="action-dots">•••</div>
              </div>
            </div>
            <div className="card-body">
              <div className="activity-item">
                <div className="activity-icon">
                  <MdEmail />
                </div>
                <div className="activity-details">
                  <div className="activity-text">
                    <strong>Marie Dupont</strong> a ajouté un nouveau document "Rapport financier Q3"
                  </div>
                  <div className="activity-time">Il y a 2 heures</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">
                  <span className="comment-icon">💬</span>
                </div>
                <div className="activity-details">
                  <div className="activity-text">
                    <strong>Jean Claude</strong> a commenté le plan d'action environnemental
                  </div>
                  <div className="activity-time">Il y a 5 heures</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">
                  <span className="check-icon">✅</span>
                </div>
                <div className="activity-details">
                  <div className="activity-text">
                    <strong>Thomas Martin</strong> a marqué une action comme terminée
                  </div>
                  <div className="activity-time">Hier, 16:30</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">
                  <span className="user-icon">👤</span>
                </div>
                <div className="activity-details">
                  <div className="activity-text">
                    <strong>Lucie Petit</strong> a rejoint le groupe de travail Éducation
                  </div>
                  <div className="activity-time">Hier, 11:15</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">
                  <span className="calendar-add">📅</span>
                </div>
                <div className="activity-details">
                  <div className="activity-text">
                    Nouvelle réunion planifiée: "Comité technique" le 25 Oct
                  </div>
                  <div className="activity-time">Avant-hier</div>
                </div>
              </div>
            </div>
          </div>

          {/* Groups and Members */}
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-title">
                <FaUsers className="card-icon" />
                Groupes de travail
              </div>
              <div className="card-actions">
                <div className="action-dots">•••</div>
              </div>
            </div>
            <div className="card-body">
              <div className="group-chart-container">
                <canvas ref={chartRef} id="groupChart"></canvas>
              </div>
              <div className="group-list">
                <div className="group-item">
                  <div className="group-color" style={{ backgroundColor: '#6d5dfc' }}></div>
                  <div className="group-name">Environnement et développement durable</div>
                  <div className="group-members">12 membres</div>
                </div>
                <div className="group-item">
                  <div className="group-color" style={{ backgroundColor: '#4CAF50' }}></div>
                  <div className="group-name">Éducation et formation</div>
                  <div className="group-members">8 membres</div>
                </div>
                <div className="group-item">
                  <div className="group-color" style={{ backgroundColor: '#FFC107' }}></div>
                  <div className="group-name">Infrastructures urbaines</div>
                  <div className="group-members">10 membres</div>
                </div>
                <div className="group-item">
                  <div className="group-color" style={{ backgroundColor: '#F44336' }}></div>
                  <div className="group-name">Santé et protection sociale</div>
                  <div className="group-members">7 membres</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;