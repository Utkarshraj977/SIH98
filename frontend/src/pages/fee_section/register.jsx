import "./register.css";
import React, { useState } from "react";

const FacultyRegistration = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Step navigation
  const nextStep = () => setStep(2);
  const prevStep = () => setStep(1);

  // Submit handler
  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  const closeModal = () => setSuccess(false);

  return (
    <div className="signup-container">
      <div className="signup-card">
        {/* Header */}
        <div className="signup-header">
          <div className="header-glow"></div>
          <h1 className="header-title">Faculty Registration</h1>
          <p className="header-subtitle">
            Join Our Academic Excellence Community
          </p>
          <div className="header-decoration"></div>
        </div>

        {/* Progress */}
        <div className="progress-container">
          <div className={`progress-step ${step === 1 ? "active" : ""}`}>
            <div className="step-number">
              <i className="fas fa-user"></i>
              <div className="step-glow"></div>
            </div>
            <span className="step-label">Personal Information</span>
          </div>
          <div className="progress-line">
            <div className={`progress-fill ${step === 2 ? "fill" : ""}`}></div>
            <div className="progress-glow"></div>
          </div>
          <div className={`progress-step ${step === 2 ? "active" : ""}`}>
            <div className="step-number">
              <i className="fas fa-upload"></i>
              <div className="step-glow"></div>
            </div>
            <span className="step-label">Document Upload</span>
          </div>
        </div>

        {/* Form */}
        <div className="form-container">
          {step === 1 && (
            <div className="form-step active">
              <h2 className="step-title">Personal Information</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-user icon-glow"></i> Full Name *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-envelope icon-glow"></i> Email Address
                    *
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email address"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-phone icon-glow"></i> Phone Number *
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-building icon-glow"></i> College Code *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter college code"
                  />
                </div>
                <div className="form-group full-width">
                  <label className="form-label">
                    <i className="fas fa-briefcase icon-glow"></i> Teaching
                    Experience *
                  </label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Describe your teaching experience"
                  ></textarea>
                </div>
                <div className="form-group full-width">
                  <label className="form-label">
                    <i className="fas fa-map-marker-alt icon-glow"></i> Complete
                    Address *
                  </label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Enter your address"
                  ></textarea>
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-lock icon-glow"></i> Password *
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Create a strong password"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-lock icon-glow"></i> Confirm Password *
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>
              <div className="form-actions">
                <button className="btn premium-btn" onClick={nextStep}>
                  Next Step <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-step active">
              <h2 className="step-title">Document Upload</h2>
              <div className="upload-section">
                <div className="upload-group">
                  <label className="upload-label">
                    <i className="fas fa-user-circle icon-glow"></i> Profile
                    Picture *
                  </label>
                  <input type="file" className="form-control" />
                </div>
                <div className="upload-group">
                  <label className="upload-label">
                    <i className="fas fa-certificate icon-glow"></i> Teaching
                    Certificate (Optional)
                  </label>
                  <input type="file" className="form-control" />
                </div>
              </div>
              <div className="form-actions">
                <button
                  className="btn premium-btn secondary"
                  onClick={prevStep}
                >
                  <i className="fas fa-arrow-left"></i> Previous Step
                </button>
                <button
                  className="btn premium-btn primary"
                  onClick={handleSubmit}
                >
                  Complete Registration <i className="fas fa-check"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="spinner"></div>
            <p className="loading-text">Processing your registration...</p>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {success && (
        <div className="modal">
          <div className="modal-backdrop" onClick={closeModal}></div>
          <div className="modal-content premium-modal">
            <h3 className="success-title">Registration Successful!</h3>
            <p className="success-message">
              Welcome to our academic excellence community. Your account has
              been created.
            </p>
            <button className="btn premium-btn" onClick={closeModal}>
              Continue to Dashboard <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyRegistration;
