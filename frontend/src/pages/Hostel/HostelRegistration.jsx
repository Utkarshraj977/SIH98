import React, { useState } from "react";
import "./HostelRegistration.css";

const HostelRegistration = () => {
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
    confirmPassword: "",
    total_room: "",
    total_vacent: "",
  });

  const [files, setFiles] = useState({
    avatar: null,
    aadhar_card: null,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const indianStates = [/* your states array */];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    if (fileList && fileList[0]) {
      setFiles((prev) => ({ ...prev, [name]: fileList[0] }));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== "confirmPassword") {
        newErrors[key] = `${key.replace(/([A-Z])/g, " $1").toLowerCase()} is required`;
      }
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid Indian mobile number";
    }

    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (formData.age && (isNaN(formData.age) || formData.age < 18 || formData.age > 100)) {
      newErrors.age = "Please enter a valid age (18-100)";
    }

    if (!files.avatar) newErrors.avatar = "Profile photo is required";
    if (!files.aadhar_card) newErrors.aadhar_card = "Aadhar card document is required";

    if (formData.total_room && isNaN(formData.total_room)) {
      newErrors.total_room = "Please enter a valid number";
    }

    if (formData.total_vacent && isNaN(formData.total_vacent)) {
      newErrors.total_vacent = "Please enter a valid number";
    }

    if (
      formData.total_room &&
      formData.total_vacent &&
      parseInt(formData.total_vacent, 10) > parseInt(formData.total_room, 10)
    ) {
      newErrors.total_vacent = "Vacant rooms cannot exceed total rooms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key !== "confirmPassword") formDataToSend.append(key, formData[key]);
      });
      if (files.avatar) formDataToSend.append("avatar", files.avatar);
      if (files.aadhar_card) formDataToSend.append("aadhar_card", files.aadhar_card);

      console.log("Form data ready to submit:", formDataToSend);
      await new Promise((res) => setTimeout(res, 1500));
      alert("Registration successful!");
    } catch (err) {
      console.error(err);
      alert("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <h1>Hostel Registration</h1>
        <form onSubmit={handleSubmit} className="registration-form" noValidate>
          {/* Example of file upload corrected */}
          <label htmlFor="avatar" className={`file-upload clickable ${errors.avatar ? "error-border" : ""}`}>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="file-upload-text">
              {files.avatar ? files.avatar.name : "Click to upload profile photo"}
            </div>
          </label>

          <button
            type="submit"
            className={`submit-btn ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Register Hostel"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HostelRegistration;
