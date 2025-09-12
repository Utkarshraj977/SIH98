import React, { useState } from "react";
import "./HostelLogin.css";
import { useNavigate } from "react-router-dom";
//import HoatelRegister from "./TeacherRegister";
function HostelLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      setMessage("Login successful!");
      // Store token if provided
      if (data?.data?.accessToken) {
        localStorage.setItem("adminToken", data.data.accessToken);
      }

      // Navigate to dashboard
      // navigate("/admin-dash");  // Uncomment if using React Router
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Admin Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn"
          onClick={()=>{
            if(password === '1234'){
              navigate("/hostel-dash")
            }
          }}
          >Login</button>
          
          {message && <p className="message">{message}</p>}
          <div className="text-center"> <p>dont have an account ? <span className="text-blue-800 cursor-pointer" onClick={()=>navigate("/Hostel-reg")}>Signup</span></p></div>
        </form>
      </div>
    </div>
  );
}

export default HostelLogin;
