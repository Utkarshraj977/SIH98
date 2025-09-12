import React, { useEffect, useState } from "react";
import "./HostelDashboard.css";

const DESKTOP_BREAK = 1024;

export default function HostelDashboard() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < DESKTOP_BREAK);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications] = useState(3);

  const [hostels, setHostels] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const onResize = () => {
      const mobileNow = window.innerWidth < DESKTOP_BREAK;
      setIsMobile(mobileNow);
      if (mobileNow) {
        setSidebarOpen(false);
        setSidebarCollapsed(false);
      } else {
        setSidebarOpen(true);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setHostels([
      { id: 1, collegeName: "ABC College", total_room: 50, total_vacent: 12, students: 38, rating: 4.5, status: "active" },
      { id: 2, collegeName: "XYZ University", total_room: 40, total_vacent: 8, students: 32, rating: 4.2, status: "active" },
      { id: 3, collegeName: "PQR Institute", total_room: 60, total_vacent: 15, students: 45, rating: 4.0, status: "pending" },
    ]);
    setStudents([
      { id: 1, name: "Amit Singh", hostel: "ABC College", room: "101", status: "active", joinDate: "2024-08-15" },
      { id: 2, name: "Sneha Gupta", hostel: "XYZ University", room: "201", status: "active", joinDate: "2024-08-20" },
      { id: 3, name: "Rahul Kumar", hostel: "ABC College", room: "105", status: "inactive", joinDate: "2024-07-10" },
    ]);
  }, []);

  const totalStudents = students.length;
  const availableRooms = hostels.reduce((a, h) => a + (h.total_vacent || 0), 0);
  const monthlyRevenue = "₹2.4L";
  const monthlyMaintenance = "₹12,500";

  const menuItems = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "students", label: "Students", icon: "👥" },
    { id: "rooms", label: "Rooms", icon: "🏠" },
    { id: "analytics", label: "Analytics", icon: "📈" },
    { id: "settings", label: "Settings", icon: "⚙" },
  ];

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen((s) => !s);
      setSidebarCollapsed(false);
      return;
    }
    if (!sidebarOpen) {
      setSidebarOpen(true);
      setSidebarCollapsed(false);
      return;
    }
    if (!sidebarCollapsed) {
      setSidebarCollapsed(true);
      return;
    }
    setSidebarOpen(false);
    setSidebarCollapsed(false);
  };

  const closeSidebar = () => {
    if (isMobile) setSidebarOpen(false);
    else {
      setSidebarOpen(false);
      setSidebarCollapsed(false);
    }
  };

  const dashboardClass = [
    "dashboard",
    isMobile ? "is-mobile" : "is-desktop",
    sidebarOpen ? "sidebar-open" : "sidebar-closed",
    sidebarCollapsed ? "sidebar-collapsed" : "",
  ].join(" ");

  const filteredHostels = hostels.filter((h) =>
    h.collegeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={dashboardClass}>
      <aside className="sidebar" aria-hidden={isMobile ? !sidebarOpen : false}>
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">🏢</span>
            {!sidebarCollapsed && <span className="logo-text">HostelHub</span>}
          </div>
          <div className="sidebar-actions">
            <button className="sidebar-toggle" aria-label="Toggle sidebar" onClick={toggleSidebar}>
              <span />
              <span />
              <span />
            </button>
            {!isMobile && sidebarOpen && (
              <button className="sidebar-close" onClick={closeSidebar} aria-label="Close sidebar">
                ✕
              </button>
            )}
          </div>
        </div>

        <nav className="sidebar-nav" role="navigation" aria-label="Main navigation">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? "active" : ""}`}
              onClick={() => {
                setActiveTab(item.id);
                if (isMobile) setSidebarOpen(false);
              }}
              aria-current={activeTab === item.id ? "page" : undefined}
            >
              <span className="nav-icon">{item.icon}</span>
              {!sidebarCollapsed && <span className="nav-label">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          {!sidebarCollapsed ? <small>v1.0 • © HostelHub</small> : <small>v1.0</small>}
        </div>
      </aside>

      {isMobile && sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar} aria-hidden />}

      <main className="main-content">
        <header className="dashboard-header">
          <div className="header-left">
            <button className="header-hamburger" onClick={toggleSidebar} aria-label="Open menu">
              <span />
              <span />
              <span />
            </button>
            <h1 className="page-title">{menuItems.find((m) => m.id === activeTab)?.label || "Dashboard"}</h1>
          </div>

          <div className="header-right">
            <div className="search-container">
              <input
                className="search-input"
                type="search"
                placeholder="Search hostels..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search hostels"
              />
              <span className="search-icon">🔍</span>
            </div>

            <div className="header-actions">
              <button className="notification-btn" aria-label="Notifications">
                🔔
                {notifications > 0 && <span className="notification-badge">{notifications}</span>}
              </button>

              <div className="user-profile" role="button" tabIndex={0} aria-label="Admin profile">
                <img className="profile-avatar" src="https://via.placeholder.com/40" alt="profile" />
                <div className="profile-info">
                  <span className="profile-name">Admin User</span>
                  <span className="profile-role">Administrator</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="content-area">
          {activeTab === "overview" && (
            <Overview
              totalStudents={totalStudents}
              availableRooms={availableRooms}
              monthlyRevenue={monthlyRevenue}
              monthlyMaintenance={monthlyMaintenance}
            />
          )}
          {activeTab === "students" && <Students students={students} />}
          {activeTab === "rooms" && <Rooms hostels={filteredHostels} />}
          {activeTab === "analytics" && <Analytics hostels={hostels} />}
          {activeTab === "settings" && <Settings />}
        </div>
      </main>
    </div>
  );
}

/* ---------------- Subcomponents ---------------- */

function Overview({ totalStudents, availableRooms, monthlyRevenue, monthlyMaintenance }) {
  const stats = [
    { id: "students", title: "Total Students", value: totalStudents, icon: "👥" },
    { id: "rooms", title: "Available Rooms", value: availableRooms, icon: "🏠" },
    { id: "revenue", title: "Monthly Revenue", value: monthlyRevenue, icon: "💰" },
    { id: "maint", title: "Maintenance", value: monthlyMaintenance, icon: "🛠" },
  ];

  return (
    <section className="overview-section">
      <div className="stats-grid">
        {stats.map((s) => (
          <div key={s.id} className="stat-card">
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-body">
              <div className="stat-value">{s.value}</div>
              <div className="stat-title">{s.title}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="overview-grid">
        <div className="quick-actions-card">
          <h2>Quick Actions</h2>
          <div className="quick-actions">
            <button className="action-btn">➕ Add</button>
            <button className="action-btn">📝 Manage</button>
            <button className="action-btn">📊 Reports</button>
          </div>
        </div>

        <div className="recent-activity-card">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon">🏢</div>
              <div className="activity-content">
                <p>New hostel registered</p>
                <span className="activity-time">2 hours ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">👥</div>
              <div className="activity-content">
                <p>New student applications</p>
                <span className="activity-time">4 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Students({ students }) {
  return (
    <section className="students-section">
      <div className="content-header">
        <h2>Student Management</h2>
        <button className="add-btn">➕ Add Student</button>
      </div>

      <div className="table-wrap">
        <div className="table-card">
          <table className="data-table" aria-label="Students table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Hostel</th>
                <th>Room</th>
                <th>Join Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>{s.hostel}</td>
                  <td>{s.room}</td>
                  <td>{s.joinDate}</td>
                  <td>
                    <span className={`status-badge ${s.status}`}>{s.status}</span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button className="small-btn">✏</button>
                      <button className="small-btn">🗑</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Rooms({ hostels }) {
  return (
    <section className="rooms-section">
      <div className="content-header">
        <h2>Room Management</h2>
        <select className="form-control">
          <option>All Hostels</option>
          {hostels.map((h) => (
            <option key={h.id}>{h.collegeName}</option>
          ))}
        </select>
      </div>

      <div className="room-grid">
        {hostels.map((h) => {
          const pct = Math.round((h.students / Math.max(1, h.total_room)) * 100);
          return (
            <div key={h.id} className="room-card">
              <h3>{h.collegeName}</h3>
              <div className="room-stats">
                <div className="room-num">{h.students} occupied</div>
                <div className="room-num">{h.total_vacent} available</div>
                <div className="room-num">{h.total_room} total</div>
              </div>

              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${pct}%` }} />
              </div>
              <div className="occupancy-text">{pct}% Occupied</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Analytics() {
  return (
    <section className="analytics-section">
      <div className="content-header">
        <h2>Analytics</h2>
        <select className="form-control">
          <option>This Month</option>
          <option>This Year</option>
        </select>
      </div>
      <div className="analytics-grid">
        <div className="chart-card">
          <h3>Occupancy Trends</h3>
        </div>
        <div className="chart-card">
          <h3>Revenue Growth</h3>
        </div>
      </div>
    </section>
  );
}

function Settings() {
  return (
    <section className="settings-section">
      <div className="content-header">
        <h2>Settings</h2>
      </div>
      <div className="settings-grid">
        <div className="settings-card">
          <h3>Profile</h3>
        </div>
        <div className="settings-card">
          <h3>Notifications</h3>
        </div>
      </div>
    </section>
  );
}
