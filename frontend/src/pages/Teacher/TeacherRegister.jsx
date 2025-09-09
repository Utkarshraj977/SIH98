import React, { useState } from "react";
import "./TeacherRegister.css";
import { useNavigate } from "react-router-dom";
const TeacherRegister = () => {

    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    collegeCode: "",
    course: "",
    stream: "",
    experience: "",
    address: "",
    avatar: "",
    certificate: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] }); // file input
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Teacher Data:", formData);

    // 👉 Call backend API here using fetch or axios
    // Example:
    // const response = await fetch("/api/teacher/register", {
    //   method: "POST",
    //   body: formData,
    // });
    // const data = await response.json();

    setMessage("Teacher registered successfully ✅");
  };

  return (
    <div className="registration-page">
      <div className="registration-container">
        <h2>Teacher Registration</h2>
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-columns">
            <div className="left-column">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                />
              </div>

              <div className="form-group">
                <label>College Code</label>
                <input
                  type="text"
                  name="collegeCode"
                  value={formData.collegeCode}
                  onChange={handleChange}
                  placeholder="Enter college code"
                  required
                />
              </div>

              <div className="form-group">
                <label>Course</label>
                <input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  placeholder="Enter course"
                  required
                />
              </div>
            </div>

            <div className="right-column">
              <div className="form-group">
                <label>Stream</label>
                <input
                  type="text"
                  name="stream"
                  value={formData.stream}
                  onChange={handleChange}
                  placeholder="Enter stream"
                  required
                />
              </div>

              <div className="form-group">
                <label>Experience</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="Enter experience (e.g. 5 years)"
                  required
                />
              </div>

              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter address"
                  required
                />
              </div>

              <div className="form-group">
                <label>Profile Picture (Avatar)</label>
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Certificate (Optional)</label>
                <input
                  type="file"
                  name="certificate"
                  accept="image/*,application/pdf"
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Register
          </button>
          {message && <p className="message">{message}</p>}
          <div className="text-center"> <p>already have an account ? <span className="text-blue-800 cursor-pointer" onClick={()=>navigate("/teacher-login")}>Signup</span></p></div>
        </form>
      </div>
    </div>
  );
};

export default TeacherRegister;