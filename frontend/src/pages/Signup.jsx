import React, { useState } from "react";

const AdminRegistrationForm = () => {
  const [formData, setFormData] = useState({
    // College Details
    collegeName: "",
    collegeCode: "",
    venue: "",
    state: "",
    collegeImage: null,
    collegeRegnum: "",
    AICTE: null,
    NAAC: null,
    NBA: null,
    Institute_Type: "",
    // Personal Details
    name: "",
    email: "",
    phone: "",
    age: "",
    avatar: null,
    password: "",
    blood_group: "",
    aadhar_card: null,
    staff_selection_id: {
      administrativecode: "726800",
      Teacher: "726800",
      student: "234567",
      fee_section: "5684525",
    },
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-10">
      <form
        onSubmit={handleSubmit}
        className="admin-reg bg-gray-400 p-10 rounded-2xl shadow-lg w-full max-w-5xl border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
          Admin Registration
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Personal Details */}
          <div>
            <h3 className="text-xl font-semibold mb-5">Personal Details</h3>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="border border-gray-300 p-2 rounded"
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="border border-gray-300 p-2 rounded"
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                className="border border-gray-300 p-2 rounded"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="age"
                placeholder="Age"
                className="border border-gray-300 p-2 rounded"
                onChange={handleChange}
                required
              />
              <input
                type="file"
                name="avatar"
                className="border border-gray-300 p-2 rounded"
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="border border-gray-300 p-2 rounded"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="blood_group"
                placeholder="Blood Group"
                className="border border-gray-300 p-2 rounded"
                onChange={handleChange}
              />
              <input
                type="file"
                name="aadhar_card"
                className="border border-gray-300 p-2 rounded"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* College Details */}
          <div>
            <h3 className="text-xl font-semibold mb-5">College Details</h3>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="collegeName"
                placeholder="College Name"
                className="border border-gray-300 p-2 rounded"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="collegeCode"
                placeholder="College Code"
                className="border border-gray-300 p-2 rounded"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="venue"
                placeholder="Venue"
                className="border border-gray-300 p-2 rounded"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                className="border border-gray-300 p-2 rounded"
                onChange={handleChange}
                required
              />
              <input
                type="file"
                name="collegeImage"
                className="border border-gray-300 p-2 rounded"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="collegeRegnum"
                placeholder="College Registration Number"
                className="border border-gray-300 p-2 rounded"
                onChange={handleChange}
                required
              />
              <input
                type="file"
                name="AICTE"
                className="border border-gray-300 p-2 rounded"
                onChange={handleChange}
              />
              <input
                type="file"
                name="NAAC"
                className="border border-gray-300 p-2 rounded"
                onChange={handleChange}
              />
              <input
                type="file"
                name="NBA"
                className="border border-gray-300 p-2 rounded"
                onChange={handleChange}
              />
              <input
                type="text"
                name="Institute_Type"
                placeholder="Institute Type"
                className="border border-gray-300 p-2 rounded"
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-8 w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default AdminRegistrationForm;
