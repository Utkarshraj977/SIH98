import React, { useState } from "react";
import "./AdminDashboard.css";
import { 
  FaUsers, FaUserTie, FaFileInvoiceDollar, 
  FaClipboardList, FaBell, FaSignOutAlt, FaSearch 
} from "react-icons/fa";

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="logo-container">
          <h2 className="logo">College Admin</h2>
          <p className="subtitle">St. Mary’s College of Engineering</p>
        </div>

        <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>

        <ul className="menu">
          <li className="active">Dashboard</li>
          <li>Admissions</li>
          <li>Staff Management</li>
          <li>Fee Management</li>
          <li>Reports</li>
          <li>Academic Calendar</li>
          <li>College Settings</li>
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

        {/* Stats Section */}
        <section className="stats">
          <div className="card">
            <FaUsers className="icon blue" />
            <h3>Total Students</h3>
            <p className="number">2,847</p>
            <span className="trend">+2.5% from last month</span>
          </div>
          <div className="card">
            <FaUserTie className="icon green" />
            <h3>Staff Members</h3>
            <p className="number">189</p>
            <span className="trend">+2.5% from last month</span>
          </div>
          <div className="card">
            <FaFileInvoiceDollar className="icon orange" />
            <h3>Fee Collection</h3>
            <p className="number">₹45.2L</p>
            <span className="trend">+2.5% from last month</span>
          </div>
          <div className="card">
            <FaClipboardList className="icon gray" />
            <h3>Pending Applications</h3>
            <p className="number">23</p>
            <span className="trend">+2.5% from last month</span>
          </div>
        </section>

        {/* Tabs */}
        <div className="tabs">
          <button className="active">Recent Admissions</button>
          <button>Staff Overview</button>
          <button>Financial Summary</button>
        </div>

        {/* Admission Management */}
        <section className="admissions">
          <h2>Admission Management</h2>
          <p>Review and manage student applications</p>

          <div className="recent-applications">
            <h3>Recent Applications</h3>
            <div className="application-card">
              <div>
                <strong>Rahul Sharma</strong>
                <p>Computer Science</p>
                <small>Applied: 2024-01-15</small>
              </div>
              <span className="status approved">Approved</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
