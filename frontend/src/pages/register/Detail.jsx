import "./signup.css";
import { useState } from "react";
import FileUpload from "./FileUpload";
function Detail() {
  const [profileAvatar, setProfileAvatar] = useState(null);
  const [aadhaarCard, setAadhaarCard] = useState(null);
  const [collegeImage, setCollegeImage] = useState(null);
  const [naacCertificate, setNaacCertificate] = useState(null);
  const [nbaCertificate, setNbaCertificate] = useState(null);
  const [aicteCertificate, setAicteCertificate] = useState(null);

    const statesOfIndia = [
    // States
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal",

    // Union Territories
    "Andaman and Nicobar Islands", "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu", "Delhi",
    "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
  ];


  const bloodGroups = ["A+", "A−", "B+", "B−", "O+", "O−", "AB+", "AB−"];

  return (
<div className="app-container">
      <h1 className="form-title">Admin Registration Form</h1>
      <p className="form-subtitle">Complete your profile and college information</p>

      <form className="form-grid">
        {/* Admin & Personal Details */}
        <div className="form-section left">
          <h2><i className="fas fa-user"></i> Admin & Personal Details</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Full Name *</label>
              <input type="text" placeholder="Enter your full name" required />
            </div>
            <div className="form-group">
              <label>Email Address *</label>
              <input type="email" placeholder="Enter email address" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
                <label>Phone Number *</label>
              <input type="text" placeholder="Enter 10-digit phone number" required />
            </div>
            <div className="form-group">
              <label>Age *</label>
              <input type="number" placeholder="Enter your age" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Password *</label>
              <input type="password" placeholder="Enter secure password" required />
            </div>
            <div className="form-group">
              <label>Blood Group *</label>
              <select required>
                <option value="">Select Blood Group</option>
                {bloodGroups.map((bg, idx) => (
                  <option key={idx}>{bg}</option>
                ))}
              </select>
            </div>
          </div>

          <FileUpload
            label="Profile Avatar"
            file={profileAvatar}
            onChange={setProfileAvatar}
            accept="image/*"
          />
          <FileUpload
            label="Aadhaar Card"
             file={aadhaarCard}
            onChange={setAadhaarCard}
            accept="image/*,.pdf"
          />
        </div>

        {/* College Information */}
        <div className="form-section right">
          <h2><i className="fas fa-university"></i> College Information</h2>
          <div className="form-row">
            <div className="form-group">
              <label>College Name *</label>
              <input type="text" placeholder="Enter college name" required />
            </div>
            <div className="form-group">
              <label>College Code *</label>
              <input type="text" placeholder="Enter college code" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Venue/Location *</label>
              <input type="text" placeholder="Enter college venue/location" required />
            </div>
            <div className="form-group">
              <label>State *</label>
              <select required>
                <option value="">Select State</option>
                {statesOfIndia.map((state, idx) => (
                  <option key={idx}>{state}</option>
                ))}
              </select>
            </div>
         </div>

          <div className="form-row">
            <div className="form-group">
              <label>Registration Number *</label>
              <input type="text" placeholder="Enter college registration number" required />
            </div>
            <div className="form-group">
              <label>Institute Type *</label>
              <select required>
                <option value="">Select Institute Type</option>
                <option>Private</option>
                <option>Government</option>
                <option>Central</option>
                <option>State</option>
                <option>Semi-Government</option>
              </select>
            </div>
          </div>

          <FileUpload
            label="College Image"
            file={collegeImage}
            onChange={setCollegeImage}
            accept="image/*"
          />
          <FileUpload
            label="AICTE Certificate"
            file={aicteCertificate}
            onChange={setAicteCertificate}
            accept=".pdf,.doc,.docx"
          />
          <FileUpload
            label="NAAC Certificate"
            file={naacCertificate}
            onChange={setNaacCertificate}
            accept=".pdf,.doc,.docx"
          />
          <FileUpload
            label="NBA Certificate"
            file={nbaCertificate}
            onChange={setNbaCertificate}
            accept=".pdf,.doc,.docx"
          />
        </div>
      </form>

      <div className="form-footer">
        <button type="submit" className="submit-btn">Register Admin</button>
      </div>
    </div>
  );
}

export default Detail;