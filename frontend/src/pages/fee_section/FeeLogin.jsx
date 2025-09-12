import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FeeLogin.module.css"; // Use CSS Module

const FeeLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    // Only allow password '1234' to login
    if (password === "1234") {
      navigate("/fee-dash");
    } else {
      setMessage("Invalid password");
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <h2 className={styles.loginTitle}>Fee Section Login</h2>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Login
          </button>

          {message && <p className={styles.message}>{message}</p>}

          <div className={styles.textCenter}>
            <p>
              Don't have an account?{" "}
              <span
                className={styles.signupLink}
                onClick={() => navigate("/fee-register")}
              >
                Signup
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeeLogin;
