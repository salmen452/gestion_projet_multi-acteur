import React from 'react';
import { FaCalendarCheck } from 'react-icons/fa';
import '../Dashboard.css';

const UpcomingMeetings = ({ meetings }) => {
  return (
    <div className="dashboard-card">
      <div className="card-header">
        <div className="card-title">
          <FaCalendarCheck className="card-icon" />
          Réunions à venir
        </div>
        <div className="card-actions">
        </div>
      </div>
      <div className="card-body">
        {meetings.map((meeting, index) => (
          <div key={index} className="meeting-item">
            <div className="meeting-date">
              <div className="meeting-day" style={{fontWeight:600, fontSize:18}}>{meeting.date}</div>
            </div>
            <div className="meeting-details">
              <div className="meeting-title">{meeting.title}</div>
              <div className="meeting-time">
                <span className="time-icon">🕒</span>
                {meeting.time}
              </div>
              <div className="meeting-participants">
                {meeting.participants.map((participant, idx) => (
                  <span key={idx} className="participant-avatar" style={{background:'#e3eaff',color:'#1a237e',fontWeight:500,fontSize:13,padding:'2px 10px',borderRadius:12,marginRight:4}}>
                    {participant.avatar}
                  </span>
                ))}
                {meeting.additionalParticipants > 0 && (
                  <span>+{meeting.additionalParticipants} autres</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingMeetings;