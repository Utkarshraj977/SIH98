import React, { useState } from "react";
import "./Login.css"
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../Context/AdminContext";
function Login() {
  const navigate = useNavigate();
  const {setToken} = useAdmin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Added missing state for error/success messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important for cookies (access & refresh tokens)
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      
      // Store token if received
      if (data?.data?.accessToken) {
        localStorage.setItem("adminToken", data.data.accessToken);
      }
      setToken(true);
      navigate("/admin-dash");
      setMessage("Login successful! Redirecting...");
      // Redirect after login (example: dashboard)
      
    } catch (error) {
      setMessage(error.message || "Something went wrong");
    }
  };

  return (
    <div className="h-[80vh] flex items-center justify-center">
      <div className="login-container p-6 shadow-lg rounded-lg bg-white w-full max-w-md">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>

          <div className="form-group mb-4">
            <label htmlFor="email" className="block mb-1">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border p-2 w-full rounded"
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="password" className="block mb-1">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border p-2 w-full rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
          >
            Login
          </button>

          {message && (
            <p className={`text-center mt-3 text-sm ${message.includes("success") ? "text-green-500" : "text-red-500"}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
