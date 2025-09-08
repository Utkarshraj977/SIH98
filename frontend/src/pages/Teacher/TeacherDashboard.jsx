import React from "react";
import "./TeacherDashboard.css";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUserGraduate,
  FaBook,
  FaCertificate,
  FaUniversity,
  FaClock
} from "react-icons/fa";

const dummyTeacher = {
  name: "Uttkarsh kumar shaw",
  avatar: { url: "https://i.pravatar.cc/150?img=3" },
  course: "Computer Science",
  stream: "Engineering",
  email: "r@hulshaw101.com",
  phone: "+91 9876543210",
  address: "123 Main St, City",
  collegeCode: "C123",
  experience: 5,
  createdAt: new Date(),
  updatedAt: new Date(),
  certificate: { url: "" },
  AllStudent: [
    { name: "Uttkarsh shaw", stream: "Engineering" },
    { name: "sameer", stream: "bca" },
    { name: "saurav", stream: "mca" },
    { name: "utkarsh raj", stream: "Engineering" },
    { name: "sumit", stream: "Science" },
  ],
  message: ["Welcome to the dashboard!", "Next meeting on Monday."]
};

const TeacherDashboard = ({ teacher }) => {
  const t = teacher || dummyTeacher;

  // Count students per stream for simple bar chart
  const streams = {};
  t.AllStudent.forEach(s => { streams[s.stream] = (streams[s.stream] || 0) + 1 });

  return (
    <div className="teacher-dashboard">
      {/* Profile */}
      <section className="profile-card">
        <img src={t.avatar.url} alt="Profile" className="avatar" />
        <h2>{t.name}</h2>
        <p>{t.course} | {t.stream}</p>
        <div className="profile-info">
          <p><FaEnvelope /> {t.email}</p>
          <p><FaPhone /> {t.phone}</p>
          <p><FaMapMarkerAlt /> {t.address}</p>
          <p><FaUniversity /> College: {t.collegeCode}</p>
          <p>Experience: {t.experience} yrs</p>
        </div>
        <div className="timestamps">
          <p><FaClock /> Joined: {t.createdAt.toLocaleDateString()}</p>
          <p><FaClock /> Updated: {t.updatedAt.toLocaleDateString()}</p>
        </div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div className="stat-card">
          <FaUserGraduate className="stat-icon" />
          <h3>{t.AllStudent.length}</h3>
          <p>Total Students</p>
        </div>
        <div className="stat-card">
          <FaBook className="stat-icon" />
          <h3>{t.course}</h3>
          <p>Course</p>
        </div>
        <div className="stat-card">
          <FaCertificate className="stat-icon" />
          {t.certificate?.url ? (
            <a href={t.certificate.url} target="_blank" rel="noreferrer">View Certificate</a>
          ) : <p>No Certificate</p>}
        </div>
      </section>

      {/* Students */}
      <section className="students">
        <h2>My Students</h2>
        <div className="students-grid">
          {t.AllStudent.map((s, i) => (
            <div key={i} className="student-card">
              <strong>{s.name}</strong>
              <p>{s.stream}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Messages */}
      <section className="messages">
        <h2>Messages</h2>
        <ul>
          {t.message.map((msg, i) => (
            <li key={i}>
              <p>{msg}</p>
              <span>{new Date().toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Simple CSS Bar Chart */}
      <section className="charts">
        <h2>Student Distribution</h2>
        <div className="charts-grid">
          {Object.entries(streams).map(([stream, count], i) => (
            <div key={i} className="bar-chart-card">
              <p>{stream} ({count})</p>
              <div className="bar-bg">
                <div className="bar-fill" style={{ width: `${count * 20}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TeacherDashboard;
