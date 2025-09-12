import React, { useState } from "react";
import axios from "axios";
import "./HostelRegistration.css"; // Your CSS file

const HostelRegistrations = () => {
  const [formData, setFormData] = useState({
    collegeName: "",
    gender: "",
    collegeCode: "",
    state: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    age: "",
    password: "",
    total_room: "",
    total_vacent: "",
    avatar: null,
    aadhar_card: null,
  });

  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }

      const res = await axios.post("/api/hostels/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(res.data.message || "Hostel registered successfully!");
      // Reset form
      setFormData({
        collegeName: "",
        gender: "",
        collegeCode: "",
        state: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        age: "",
        password: "",
        total_room: "",
        total_vacent: "",
        avatar: null,
        aadhar_card: null,
      });
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong. Try again!"
      );
    }
  };

  return (
    <div className="hostel-register-container">
      <h2>Hostel Registration</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="hostel-register-form">
        <input
          type="text"
          name="collegeName"
          placeholder="College Name"
          value={formData.collegeName}
          onChange={handleChange}
          required
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="co-ed">Co-ed</option>
        </select>
        <input
          type="text"
          name="collegeCode"
          placeholder="College Code"
          value={formData.collegeCode}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Hostel Name / In-Charge Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="total_room"
          placeholder="Total Rooms"
          value={formData.total_room}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="total_vacent"
          placeholder="Total Vacant"
          value={formData.total_vacent}
          onChange={handleChange}
          required
        />
        <label>
          Upload Avatar:
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Upload Aadhar Card:
          <input
            type="file"
            name="aadhar_card"
            accept="image/*,application/pdf"
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Register Hostel</button>
      </form>
    </div>
  );
};

export default HostelRegistrations;
