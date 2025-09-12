import React, { useState } from "react";
import "./TeacherDashboard.css";
import {
  FaUsers,
  FaChalkboardTeacher,
  FaMoneyBillWave,
  FaClipboardList,
  FaSignOutAlt,
  FaSearch,
  FaBell,
} from "react-icons/fa";

const dummyTeacher = {
  name: "Uttkarsh Kumar Shaw",
  course: "Computer Science",
  stream: "Engineering",
  AllStudent: [
    { name: "Uttkarsh Shaw", stream: "Engineering", applied: "2024-01-15", status: "Approved" },
    { name: "Sameer", stream: "BCA", applied: "2024-01-20", status: "Pending" },
    { name: "Saurav", stream: "MCA", applied: "2024-01-22", status: "Rejected" },
    { name: "Utkarsh Raj", stream: "Engineering", applied: "2024-01-25", status: "Approved" },
  ],
};

const TeacherDashboard = ({ teacher }) => {
  const t = teacher || dummyTeacher;
  const [activeTab, setActiveTab] = useState("recent");

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>College Admin</h2>
          <p>St. Mary’s College</p>
        </div>
        <nav>
          <ul>
            <li className="active">Dashboard</li>
            <li>Admissions</li>
            <li>Staff Management</li>
            <li>Fee Management</li>
            <li>Reports</li>
            <li>Academic Calendar</li>
            <li>College Settings</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <div className="search-box">
            <FaSearch />
            <input type="text" placeholder="Search..." />
          </div>
          <div className="topbar-right">
            <FaBell className="icon" />
            <button className="logout-btn">
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </header>

        {/* Stats */}
        <section className="stats-cards">
          <div className="stat-card blue">
            <FaUsers className="icon" />
            <h3>{t.AllStudent.length}</h3>
            <p>Total Students</p>
            <span>+2.5% from last month</span>
          </div>
          <div className="stat-card orange">
            <FaChalkboardTeacher className="icon" />
            <h3>12</h3>
            <p>Staff Members</p>
            <span>+1.2% from last month</span>
          </div>
          <div className="stat-card green">
            <FaMoneyBillWave className="icon" />
            <h3>₹45.2L</h3>
            <p>Fee Collection</p>
            <span>+2.5% from last month</span>
          </div>
          <div className="stat-card pink">
            <FaClipboardList className="icon" />
            <h3>23</h3>
            <p>Pending Applications</p>
            <span>+2.5% from last month</span>
          </div>
        </section>

        {/* Tabs */}
        <section className="tabs">
          <button
            className={activeTab === "recent" ? "active" : ""}
            onClick={() => setActiveTab("recent")}
          >
            Recent Admissions
          </button>
          <button
            className={activeTab === "staff" ? "active" : ""}
            onClick={() => setActiveTab("staff")}
          >
            Staff Overview
          </button>
          <button
            className={activeTab === "finance" ? "active" : ""}
            onClick={() => setActiveTab("finance")}
          >
            Financial Summary
          </button>
        </section>

        {/* Tab Content */}
        <section className="tab-content">
          {activeTab === "recent" && (
            <div className="card">
              <h4>Recent Applications</h4>
              <div className="applications-list">
                {t.AllStudent.map((s, i) => (
                  <div key={i} className="application-card">
                    <div className="applicant-info">
                      <h5>{s.name}</h5>
                      <p>{s.stream}</p>
                      <small>Applied: {s.applied}</small>
                    </div>
                    <span
                      className={`status-badge ${
                        s.status === "Approved"
                          ? "approved"
                          : s.status === "Pending"
                          ? "pending"
                          : "rejected"
                      }`}
                    >
                      {s.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "staff" && (
            <div className="card">
              <h4>Staff Overview</h4>
              <p>Staff list and details will appear here...</p>
            </div>
          )}

          {activeTab === "finance" && (
            <div className="card">
              <h4>Financial Summary</h4>
              <p>Fee collection and report details...</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default TeacherDashboard;
