import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FeeRegister.module.css";

const FacultyRegistration = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const nextStep = () => setStep(2);
  const prevStep = () => setStep(1);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  const closeModal = () => setSuccess(false);

  return (
    <div className={styles.feeRegister}>
      {/* Background elements */}
      <div className={styles.animatedBackground}>
        <div className={`${styles.floatingParticle} ${styles.particle1}`}></div>
        <div className={`${styles.floatingParticle} ${styles.particle2}`}></div>
        <div className={`${styles.floatingParticle} ${styles.particle3}`}></div>
        <div className={`${styles.floatingParticle} ${styles.particle4}`}></div>
        <div className={`${styles.floatingParticle} ${styles.particle5}`}></div>
        <div className={`${styles.floatingParticle} ${styles.particle6}`}></div>
        <div className={`${styles.gradientOrb} ${styles.orb1}`}></div>
        <div className={`${styles.gradientOrb} ${styles.orb2}`}></div>
        <div className={`${styles.gradientOrb} ${styles.orb3}`}></div>
        <div className={`${styles.geometricShape} ${styles.shape1}`}></div>
        <div className={`${styles.geometricShape} ${styles.shape2}`}></div>
        <div className={`${styles.geometricShape} ${styles.shape3}`}></div>
        <div className={`${styles.geometricShape} ${styles.shape4}`}></div>
        <div className={`${styles.waveAnimation} ${styles.wave1}`}></div>
        <div className={`${styles.waveAnimation} ${styles.wave2}`}></div>
        <div className={`${styles.waveAnimation} ${styles.wave3}`}></div>
      </div>

      <div className={styles.signupContainer}>
        <div className={styles.signupCard}>
          {/* Header */}
          <div className={styles.signupHeader}>
            <div className={styles.headerGlow}></div>
            <h1 className={styles.headerTitle}>Faculty Registration</h1>
            <p className={styles.headerSubtitle}>
              Join Our Academic Excellence Community
            </p>
            <div className={styles.headerDecoration}></div>
          </div>

          {/* Progress */}
          <div className={styles.progressContainer}>
            <div className={`${styles.progressStep} ${step === 1 ? styles.active : ""}`}>
              <div className={styles.stepNumber}>
                <i className="fas fa-user"></i>
                <div className={styles.stepGlow}></div>
              </div>
              <span className={styles.stepLabel}>Personal Information</span>
            </div>
            <div className={styles.progressLine}>
              <div className={`${styles.progressFill} ${step === 2 ? styles.fill : ""}`}></div>
              <div className={styles.progressGlow}></div>
            </div>
            <div className={`${styles.progressStep} ${step === 2 ? styles.active : ""}`}>
              <div className={styles.stepNumber}>
                <i className="fas fa-upload"></i>
                <div className={styles.stepGlow}></div>
              </div>
              <span className={styles.stepLabel}>Document Upload</span>
            </div>
          </div>

          {/* Form */}
          <div className={styles.formContainer}>
            {step === 1 && (
              <div className={`${styles.formStep} ${styles.active}`}>
                <h2 className={styles.stepTitle}>Personal Information</h2>
                <div className={styles.formGrid}>
                  {/* Form fields */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      <i className="fas fa-user icon-glow"></i> Full Name *
                    </label>
                    <input
                      type="text"
                      className={styles.formControl}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      <i className="fas fa-envelope icon-glow"></i> Email Address *
                    </label>
                    <input
                      type="email"
                      className={styles.formControl}
                      placeholder="Enter your email address"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      <i className="fas fa-phone icon-glow"></i> Phone Number *
                    </label>
                    <input
                      type="tel"
                      className={styles.formControl}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      <i className="fas fa-building icon-glow"></i> College Code *
                    </label>
                    <input
                      type="text"
                      className={styles.formControl}
                      placeholder="Enter college code"
                    />
                  </div>
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label className={styles.formLabel}>
                      <i className="fas fa-briefcase icon-glow"></i> Teaching Experience *
                    </label>
                    <textarea
                      className={styles.formControl}
                      rows="4"
                      placeholder="Describe your teaching experience"
                    ></textarea>
                  </div>
                  <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label className={styles.formLabel}>
                      <i className="fas fa-map-marker-alt icon-glow"></i> Complete Address *
                    </label>
                    <textarea
                      className={styles.formControl}
                      rows="3"
                      placeholder="Enter your address"
                    ></textarea>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      <i className="fas fa-lock icon-glow"></i> Password *
                    </label>
                    <input
                      type="password"
                      className={styles.formControl}
                      placeholder="Create a strong password"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      <i className="fas fa-lock icon-glow"></i> Confirm Password *
                    </label>
                    <input
                      type="password"
                      className={styles.formControl}
                      placeholder="Confirm your password"
                    />
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button className={`${styles.btn} ${styles.premiumBtn}`} onClick={nextStep}>
                    Next Step <i className="fas fa-arrow-right"></i>
                  </button>
                </div>

                {/* Login link below the form */}
                <div className={styles.loginLinkContainer}>
                  <p className={styles.loginText}>
                    Already have an account?{" "}
                    <span
                      className={styles.loginLink}
                      onClick={() => navigate("/fee-login")}
                    >
                      Login
                    </span>
                  </p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className={`${styles.formStep} ${styles.active}`}>
                <h2 className={styles.stepTitle}>Document Upload</h2>
                <div className={styles.uploadSection}>
                  <div className={styles.uploadGroup}>
                    <label className={styles.uploadLabel}>
                      <i className="fas fa-user-circle icon-glow"></i> Profile Picture *
                    </label>
                    <input type="file" className={styles.formControl} />
                  </div>
                  <div className={styles.uploadGroup}>
                    <label className={styles.uploadLabel}>
                      <i className="fas fa-certificate icon-glow"></i> Teaching Certificate (Optional)
                    </label>
                    <input type="file" className={styles.formControl} />
                  </div>
                </div>
                <div className={styles.formActions}>
                  <button className={`${styles.btn} ${styles.premiumBtn} ${styles.secondary}`} onClick={prevStep}>
                    <i className="fas fa-arrow-left"></i> Previous Step
                  </button>
                  <button className={`${styles.btn} ${styles.premiumBtn} ${styles.primary}`} onClick={handleSubmit}>
                    Complete Registration <i className="fas fa-check"></i>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingContent}>
            <div className={styles.spinner}></div>
            <p className={styles.loadingText}>Processing your registration...</p>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {success && (
        <div className={styles.modal}>
          <div className={styles.modalBackdrop} onClick={closeModal}></div>
          <div className={`${styles.modalContent} ${styles.premiumModal}`}>
            <h3 className={styles.successTitle}>Registration Successful!</h3>
            <p className={styles.successMessage}>
              Welcome to our academic excellence community. Your account has
              been created.
            </p>
            <button className={`${styles.btn} ${styles.premiumBtn}`} onClick={closeModal}>
              Continue to Dashboard <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyRegistration;
