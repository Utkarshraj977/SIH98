import React, { useState } from "react";
import "./StudentDashboard.css";
import {
  FaUserGraduate,
  FaClipboardList,
  FaBookOpen,
  FaBell,
  FaSignOutAlt,
  FaSearch,
  FaCertificate,
  FaMoneyBillWave,
} from "react-icons/fa";

const StudentDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Profile");

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="logo-container">
          <h2 className="logo">Student Panel</h2>
          <p className="subtitle">St. Mary’s College of Engineering</p>
        </div>

        <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>

        <ul className="menu">
          <li className="active">Dashboard</li>
          <li>Profile</li>
          <li>Results</li>
          <li>Fees</li>
          <li>Certificates</li>
          <li>Messages</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main">
        {/* Navbar */}
        <header className="navbar">
          <div className="search-bar">
            <FaSearch /> <input type="text" placeholder="Search..." />
          </div>
          <div className="navbar-right">
            <FaBell className="icon" />
            <button className="logout">
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </header>

        {/* Profile Card */}
        <section className="profile-card">
          <div className="profile-avatar">👨‍🎓</div>
          <div className="profile-info">
            <h2>Rahul Sharma</h2>
            <p>Email: rahul.sharma@example.com</p>
            <p>Course: B.Tech in Computer Science</p>
            <p>Semester: 5th</p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats">
          <div className="card">
            <FaBookOpen className="icon blue" />
            <h3>Current Semester</h3>
            <p className="number">5th</p>
            <span className="trend">Ongoing</span>
          </div>
          <div className="card">
            <FaMoneyBillWave className="icon green" />
            <h3>Fee Status</h3>
            <p className="number">Paid</p>
            <span className="trend">₹50,000</span>
          </div>
          <div className="card">
            <FaClipboardList className="icon orange" />
            <h3>Results</h3>
            <p className="number">CGPA: 8.7</p>
            <span className="trend">Good Standing</span>
          </div>
          <div className="card">
            <FaCertificate className="icon purple" />
            <h3>Certificates</h3>
            <p className="number">3</p>
            <span className="trend">Latest: 2024</span>
          </div>
        </section>

        {/* Tabs */}
        <div className="tabs">
          <button
            className={activeTab === "Profile" ? "active" : ""}
            onClick={() => setActiveTab("Profile")}
          >
            👤 Profile
          </button>
          <button
            className={activeTab === "Results" ? "active" : ""}
            onClick={() => setActiveTab("Results")}
          >
            📊 Results
          </button>
          <button
            className={activeTab === "Fees" ? "active" : ""}
            onClick={() => setActiveTab("Fees")}
          >
            💳 Fees
          </button>
          <button
            className={activeTab === "Certificates" ? "active" : ""}
            onClick={() => setActiveTab("Certificates")}
          >
            📜 Certificates
          </button>
        </div>

        {/* Content Section */}
        <div className="content-section">
          <h2>{activeTab} Details</h2>

          {/* Profile Tab */}
          {activeTab === "Profile" && (
            <div className="detail-grid">
              <div className="detail-card">
                <div className="detail-card-header">
                  <span className="icon">👤</span> Personal Info
                </div>
                <div className="detail-card-body">
                  <h4>Name</h4>
                  <p>Rahul Sharma</p>
                  <h4>Email</h4>
                  <p>rahul.sharma@example.com</p>
                </div>
              </div>

              <div className="detail-card">
                <div className="detail-card-header">
                  <span className="icon">🎓</span> Academic Info
                </div>
                <div className="detail-card-body">
                  <h4>Course</h4>
                  <p>B.Tech in CSE</p>
                  <h4>Semester</h4>
                  <p>5th Semester</p>
                </div>
              </div>
            </div>
          )}

          {/* Results Tab */}
          {activeTab === "Results" && (
            <div className="detail-grid">
              <div className="detail-card">
                <div className="detail-card-header">
                  <span className="icon">📊</span> CGPA
                </div>
                <div className="detail-card-body">
                  <h4>Current CGPA</h4>
                  <p>8.7</p>
                </div>
              </div>
              <div className="detail-card">
                <div className="detail-card-header">
                  <span className="icon">📝</span> Last Semester
                </div>
                <div className="detail-card-body">
                  <h4>SGPA</h4>
                  <p>8.9</p>
                </div>
              </div>
            </div>
          )}

          {/* Fees Tab */}
          {activeTab === "Fees" && (
            <div className="detail-grid">
              <div className="detail-card">
                <div className="detail-card-header">
                  <span className="icon">💳</span> Fee Status
                </div>
                <div className="detail-card-body">
                  <h4>Status</h4>
                  <p>Paid</p>
                  <h4>Amount</h4>
                  <p>₹50,000</p>
                </div>
              </div>
            </div>
          )}

          {/* Certificates Tab */}
          {activeTab === "Certificates" && (
            <div className="detail-grid">
              <div className="detail-card">
                <div className="detail-card-header">
                  <span className="icon">📜</span> Certificates
                </div>
                <div className="detail-card-body">
                  <h4>Issued</h4>
                  <p>3 Certificates</p>
                  <h4>Latest</h4>
                  <p>2024</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
