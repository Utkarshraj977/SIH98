// StudentRegister.jsx
import React, { useState } from "react";
import axios from "axios";
import "./StudentRegister.css";

const StudentRegister = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal & Family
    name: "",
    email: "",
    DOB: "",
    sex: "",
    bloodgroup: "",
    fathername: "",
    mothername: "",
    student_phone: "",
    father_phone: "",
    father_email: "",
    curr_address: "",
    permanent_address: "",
    password: "",

    // College
    course: "",
    stream: "",
    collegeCode: "",

    // Academic
    prev_School_name: "",
    school_address: "",
    prev_equivalent_class: "",
    prev_equivalent_board: "",
    prev_equivalent_marks: "",
    prev_equivalent_marks_percent: "",
    appearIn: "",
    rankIn_comp: "",
    marksIn_comp: "",

    // Documents
    avatar: null,
    pre_equi_cert: null,
    prev_equi_rank_card: null,
    aadhar_card: null,
    father_aadhar_card: null,
    sign_student: null,
    certificate: [],

    // Fees
    sem_fee: [
      { sem: "1st", paid: false, amountPaid: 0 },
      { sem: "2nd", paid: false, amountPaid: 0 },
    ],
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, files, dataset } = e.target;

    if (type === "file" && dataset.multiple === "true") {
      setFormData({ ...formData, [name]: Array.from(files) });
    } else if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === "checkbox" && dataset.fee) {
      const index = parseInt(dataset.fee);
      const updatedFees = [...formData.sem_fee];
      updatedFees[index].paid = e.target.checked;
      setFormData({ ...formData, sem_fee: updatedFees });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((item, index) => {
          if (item instanceof File) data.append(`${key}[${index}]`, item);
          else data.append(`${key}[${index}]`, JSON.stringify(item));
        });
      } else if (formData[key] instanceof File) {
        data.append(key, formData[key]);
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      const res = await axios.post("/api/student/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Student Registered Successfully!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Error registering student");
    }
  };

  return (
    <div className="app-container">
      <h1 className="form-title">Student Registration</h1>
      <p className="form-subtitle">Fill all required fields</p>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="form-section">
            <h2>Personal & Family Details</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>DOB</label>
                <input type="date" name="DOB" value={formData.DOB} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Sex</label>
                <select name="sex" value={formData.sex} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Blood Group</label>
                <input type="text" name="bloodgroup" value={formData.bloodgroup} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Student Phone</label>
                <input type="text" name="student_phone" value={formData.student_phone} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Father Name</label>
                <input type="text" name="fathername" value={formData.fathername} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Mother Name</label>
                <input type="text" name="mothername" value={formData.mothername} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Father Phone</label>
                <input type="text" name="father_phone" value={formData.father_phone} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Father Email</label>
                <input type="email" name="father_email" value={formData.father_email} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Current Address</label>
                <input type="text" name="curr_address" value={formData.curr_address} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Permanent Address</label>
                <input type="text" name="permanent_address" value={formData.permanent_address} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-footer">
              <button type="button" className="submit-btn" onClick={nextStep}>Next</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="form-section">
            <h2>College & Academic Details</h2>
            {/* College Details */}
            <div className="form-row">
              <div className="form-group">
                <label>Course</label>
                <input type="text" name="course" value={formData.course} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Stream</label>
                <input type="text" name="stream" value={formData.stream} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>College Code</label>
                <input type="text" name="collegeCode" value={formData.collegeCode} onChange={handleChange} required />
              </div>
            </div>

            {/* Academic Details */}
            <h3>Previous Education & Competitive Exams</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Previous School Name</label>
                <input type="text" name="prev_School_name" value={formData.prev_School_name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>School Address</label>
                <input type="text" name="school_address" value={formData.school_address} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Previous Class</label>
                <input type="text" name="prev_equivalent_class" value={formData.prev_equivalent_class} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Board</label>
                <input type="text" name="prev_equivalent_board" value={formData.prev_equivalent_board} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Marks</label>
                <input type="text" name="prev_equivalent_marks" value={formData.prev_equivalent_marks} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Percentage</label>
                <input type="text" name="prev_equivalent_marks_percent" value={formData.prev_equivalent_marks_percent} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Appeared In</label>
                <input type="text" name="appearIn" value={formData.appearIn} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Rank in Competition</label>
                <input type="text" name="rankIn_comp" value={formData.rankIn_comp} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Marks in Competition</label>
                <input type="text" name="marksIn_comp" value={formData.marksIn_comp} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-footer">
              <button type="button" className="submit-btn" onClick={prevStep}>Previous</button>
              <button type="button" className="submit-btn" onClick={nextStep}>Next</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="form-section">
            <h2>Documents & Fees</h2>

            {/* Documents */}
            <div className="form-row">
              {["avatar", "pre_equi_cert", "prev_equi_rank_card", "aadhar_card", "father_aadhar_card", "sign_student"].map((doc) => (
                <div className="form-group" key={doc}>
                  <label>{doc.replace("_", " ").toUpperCase()}</label>
                  <input type="file" name={doc} onChange={handleChange} required />
                </div>
              ))}
              <div className="form-group">
                <label>Certificates</label>
                <input type="file" name="certificate" multiple data-multiple="true" onChange={handleChange} />
              </div>
            </div>

            {/* Fees */}
<h3>Fees</h3>
{formData.sem_fee.map((fee, idx) => (
  <div className="form-row fees-row" key={idx}>
    <div className="form-group fee-item">
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={fee.paid}
          data-fee={idx}
          onChange={handleChange}
        />
        {fee.sem} Fee
      </label>
      <input
        type="number"
        placeholder="Amount Paid"
        value={fee.amountPaid}
        onChange={(e) => {
          const updatedFees = [...formData.sem_fee];
          updatedFees[idx].amountPaid = e.target.value;
          setFormData({ ...formData, sem_fee: updatedFees });
        }}
      />
    </div>
  </div>
))}


            <div className="form-footer">
              <button type="button" className="submit-btn" onClick={prevStep}>Previous</button>
              <button type="submit" className="submit-btn" onClick={()=>navigate("student-dash")}>Submit</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default StudentRegister;
