import React, { useState } from "react";
import "./Registration.css";

function Registration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bloodgroup: "",
    address: "",
    experience: "",
    college_code: "",
    password: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, type) => {
    if (type === "avatar") setAvatar(e.target.files[0]);
    if (type === "certificate") setCertificate(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (avatar) data.append("avatar", avatar);
    if (certificate) data.append("certificate", certificate);

    try {
      const response = await fetch("/api/admin/register", {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Registration failed");

      setMessage("Registration successful!");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="registration-page">
      <div className="registration-container">
        <h2>Admin Registration</h2>
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-columns">
            <div className="left-column">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Blood Group</label>
                <input
                  type="text"
                  name="bloodgroup"
                  placeholder="Enter your blood group"
                  value={formData.bloodgroup}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="right-column">
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Experience</label>
                <input
                  type="text"
                  name="experience"
                  placeholder="Enter your experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>College Code</label>
                <input
                  type="text"
                  name="college_code"
                  placeholder="Enter college code"
                  value={formData.college_code}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-group full-width">
            <label>Avatar</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "avatar")}
              required
            />
          </div>

          <div className="form-group full-width">
            <label>Certificate</label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => handleFileChange(e, "certificate")}
              required
            />
          </div>

          <button type="submit" className="submit-btn">Register</button>
          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default Registration;
