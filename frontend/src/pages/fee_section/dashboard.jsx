import React, { useEffect, useState } from "react";
import "./dashboard.css";

export default function FeePortalDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth > 900);
  const [showModal, setShowModal] = useState(false);

  // small demo data
  const recentPayments = [
    {
      name: "John Smith",
      time: "2 hours ago",
      amount: "₹15,000",
      method: "Online",
    },
    {
      name: "Emma Wilson",
      time: "3 hours ago",
      amount: "₹12,000",
      method: "Cash",
    },
  ];
  const pending = [
    {
      name: "David Miller",
      code: "CS001",
      amount: "₹15,000",
      note: "Due: 10 Sept 2025",
    },
    {
      name: "Sarah Johnson",
      code: "CS002",
      amount: "₹12,000",
      note: "2 days overdue",
    },
  ];
  const paymentMethods = [
    { title: "Online", amount: "₹6,75,000", tx: 45 },
    { title: "Cash", amount: "₹4,56,000", tx: 38 },
  ];
  const paymentsHistory = [
    {
      id: "P-1001",
      student: "John Smith",
      date: "2025-09-07",
      amount: "₹15,000",
      mode: "Online",
    },
    {
      id: "P-1000",
      student: "Emma Wilson",
      date: "2025-09-06",
      amount: "₹12,000",
      mode: "Cash",
    },
  ];

  useEffect(() => {
    function onResize() {
      const desktop = window.innerWidth > 900;
      setIsDesktop(desktop);
      if (desktop) setSidebarOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        setShowModal(false);
        setSidebarOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleSidebar = () => {
    if (isDesktop) setCollapsed((c) => !c);
    else setSidebarOpen((s) => !s);
  };

  return (
    <div className="fp-root">
      {/* Mobile topbar */}
      <div className="fp-topbar">
        <button
          aria-label="Toggle menu"
          className="fp-hamburger"
          onClick={toggleSidebar}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 6h18M3 12h18M3 18h18"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <div className="fp-top-title">Fee Management</div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button className="fp-btn ghost">Refresh</button>
          <button className="fp-btn primary" onClick={() => setShowModal(true)}>
            Quick Collection
          </button>
        </div>
      </div>

      {/* Layout grid */}
<div className={`fp-layout ${isDesktop && collapsed ? "collapsed" : ""}`}>
        {/* Sidebar */}
        <aside
          className={`fp-sidebar ${sidebarOpen ? "open" : ""} ${
            isDesktop && collapsed ? "collapsed" : ""
          }`}
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="fp-sidebar-head">
            <div className="fp-logo" aria-hidden>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 10.5L12 4l9 6.5"
                  stroke="#1DBBC6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 11v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6"
                  stroke="#1DBBC6"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="fp-brand-wrap">
              <div className="fp-brand">Fee Portal</div>
              {isDesktop && (
                <button
                  className="fp-collapse-btn"
                  onClick={() => setCollapsed((c) => !c)}
                  aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                  {collapsed ? "➤" : "⬅"}
                </button>
              )}
            </div>
          </div>

          <nav className="fp-nav" aria-label="Sidebar items">
            <button className="fp-nav-item active">
              <span className="fp-nav-icon">🏠</span>
              <span className="fp-nav-text">Dashboard</span>
            </button>

            <button className="fp-nav-item">
              <span className="fp-nav-icon">👥</span>
              <span className="fp-nav-text">Student Records</span>
            </button>

            <button className="fp-nav-item">
              <span className="fp-nav-icon">💵</span>
              <span className="fp-nav-text">Fee Collection</span>
            </button>

            <button className="fp-nav-item">
              <span className="fp-nav-icon">🧾</span>
              <span className="fp-nav-text">Payment History</span>
            </button>

            <button className="fp-nav-item">
              <span className="fp-nav-icon">⚠</span>
              <span className="fp-nav-text">Pending Fees</span>
              <span className="fp-badge">32</span>
            </button>

            <button className="fp-nav-item">
              <span className="fp-nav-icon">📊</span>
              <span className="fp-nav-text">Reports</span>
            </button>

            <button className="fp-nav-item">
              <span className="fp-nav-icon">💳</span>
              <span className="fp-nav-text">Payment Methods</span>
            </button>

            <button className="fp-nav-item">
              <span className="fp-nav-icon">✉</span>
              <span className="fp-nav-text">Messages</span>
              <span className="fp-badge">5</span>
            </button>

            <button className="fp-nav-item">
              <span className="fp-nav-icon">⚙</span>
              <span className="fp-nav-text">Settings</span>
            </button>
          </nav>

          <div className="fp-profile">
            <div className="fp-avatar">R</div>
            <div className="fp-profile-info">
              <div className="fp-name">Mr. Rajesh</div>
              <div className="fp-role">Fee Section</div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main
          className="fp-main"
          role="main"
          onClick={() => {
            if (!isDesktop && sidebarOpen) setSidebarOpen(false);
          }}
        >
          <header className="fp-header-desktop">
            <div>
              <h1 className="fp-title">Fee Management Dashboard</h1>
              <div className="fp-subtitle">
                Today is Sunday, September 7, 2025
              </div>
            </div>
            <div className="fp-actions-desktop">
              <button className="fp-btn ghost">Refresh</button>
              <button
                className="fp-btn primary"
                onClick={() => setShowModal(true)}
              >
                Quick Collection
              </button>
            </div>
          </header>

          {/* KPIs */}
          <section className="fp-kpis">
            <div className="card">
              <div className="card-left">
                <div className="card-icon teal">💸</div>
              </div>
              <div className="card-right">
                <div className="card-value">₹85,000</div>
                <div className="card-label">Today's Collection</div>
                <div className="card-change up">↑ +12%</div>
              </div>
            </div>

            <div className="card">
              <div className="card-right full">
                <div className="card-value">₹4,50,000</div>
                <div className="card-label">Monthly Collection</div>
                <div className="progress-wrap">
                  <div className="progress-bg">
                    <div className="progress-fill" style={{ width: "80%" }} />
                  </div>
                </div>
                <div className="progress-text">90% of target</div>
              </div>
            </div>

            <div className="card">
              <div className="card-left">
                <div className="card-icon red">⚠</div>
              </div>
              <div className="card-right">
                <div className="card-value">15</div>
                <div className="card-label">Overdue Payments</div>
                <div style={{ marginTop: 8 }}>
                  <button className="fp-btn ghost">Send Reminders</button>
                </div>
              </div>
            </div>
          </section>

          {/* Recent / Pending */}
          <section className="fp-lists">
            <div className="panel">
              <div className="panel-head">
                <h3>Recent Payments</h3>
                <button className="fp-btn ghost small">View All</button>
              </div>
              <div className="panel-body list">
                {recentPayments.map((r, i) => (
                  <div key={i} className="list-item">
                    <div>
                      <div className="list-title">{r.name}</div>
                      <div className="list-sub">{r.time}</div>
                    </div>
                    <div className="list-right">
                      <div className="list-amount teal">{r.amount}</div>
                      <div className="list-method">{r.method}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel">
              <div className="panel-head">
                <h3>Pending Fees</h3>
                <button className="fp-btn ghost small">Filter</button>
              </div>
              <div className="panel-body list">
                {pending.map((p, i) => (
                  <div key={i} className="list-item pending">
                    <div>
                      <div className="list-title">{p.name}</div>
                      <div className="list-sub">{p.code}</div>
                    </div>
                    <div className="list-right">
                      <div className="list-amount red">{p.amount}</div>
                      <div className="list-note">{p.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Payment Methods & Payment History & Reports panels */}
          <section className="fp-payment-methods">
            <div className="panel full">
              <div className="panel-head">
                <h3>Payment Methods</h3>
                <div className="filter">This Month ▾</div>
              </div>
              <div className="panel-body grid">
                {paymentMethods.map((m, i) => (
                  <div key={i} className="method-card">
                    <div className="method-icon">💳</div>
                    <div className="method-title">{m.title}</div>
                    <div className="method-amount teal">{m.amount}</div>
                    <div className="method-tx">{m.tx} transactions</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel" style={{ marginTop: 16 }}>
              <div className="panel-head">
                <h3>Payment History</h3>
                <button className="fp-btn ghost small">Export</button>
              </div>
              <div className="panel-body list">
                {paymentsHistory.map((h, idx) => (
                  <div key={idx} className="list-item">
                    <div>
                      <div className="list-title">
                        {h.student}{" "}
                        <small style={{ color: "#9aa0a0", marginLeft: 8 }}>
                          {h.id}
                        </small>
                      </div>
                      <div className="list-sub">{h.date}</div>
                    </div>
                    <div className="list-right">
                      <div className="list-amount teal">{h.amount}</div>
                      <div className="list-method">{h.mode}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel" style={{ marginTop: 16 }}>
              <div className="panel-head">
                <h3>Reports</h3>
                <button className="fp-btn ghost small">Generate</button>
              </div>
              <div className="panel-body list">
                <div
                  className="list-item"
                  style={{ justifyContent: "space-between" }}
                >
                  <div>
                    <div className="list-title">Monthly Summary</div>
                    <div className="list-sub">Sep 2025</div>
                  </div>
                  <div>
                    <button className="fp-btn ghost small">Download</button>
                  </div>
                </div>
                <div
                  className="list-item"
                  style={{ justifyContent: "space-between" }}
                >
                  <div>
                    <div className="list-title">Pending Report</div>
                    <div className="list-sub">Overdue summary</div>
                  </div>
                  <div>
                    <button className="fp-btn ghost small">Download</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fp-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Quick Collection Modal */}
      {showModal && (
        <div
          className="modal-wrap"
          role="dialog"
          aria-modal="true"
          aria-label="Quick Fee Collection"
        >
          <div className="modal-backdrop" onClick={() => setShowModal(false)} />
          <div className="modal-card">
            <div className="modal-head">
              <h2>Quick Fee Collection</h2>
              <button
                className="modal-close"
                aria-label="Close"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <label className="field">
                <div className="field-label">Student ID/Name</div>
                <input
                  className="input"
                  placeholder="Enter student ID or name"
                />
              </label>
              <label className="field">
                <div className="field-label">Amount</div>
                <input className="input" placeholder="Enter amount" />
              </label>
              <label className="field">
                <div className="field-label">Payment Method</div>
                <select className="input">
                  <option>Cash</option>
                  <option>Online</option>
                  <option>Cheque</option>
                </select>
              </label>
            </div>

            <div className="modal-foot">
              <button
                className="fp-btn ghost"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="fp-btn primary"
                onClick={() => {
                  /* implement collect */ setShowModal(false);
                }}
              >
                Collect Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}