import React from "react";
import { FaChalkboardTeacher, FaUserTie, FaMoneyBillWave, FaHotel, FaBook } from "react-icons/fa";
import "./Staff.css";

const staffData = [
  {
    id: 1,
    role: "Teacher",
    icon: <FaChalkboardTeacher />,
    desc: "Responsible for delivering lessons, mentoring students, and creating an engaging learning environment.",
    className: "teacher",
    delay: "0s"
  },
  {
    id: 2,
    role: "Administrative",
    icon: <FaUserTie />,
    desc: "Handles office management, student records, and ensures smooth operation of the institution.",
    className: "admin",
    delay: "0.1s"
  },
  {
    id: 3,
    role: "Fees Section",
    icon: <FaMoneyBillWave />,
    desc: "Manages student fees, payment records, and financial reporting with accuracy.",
    className: "fees",
    delay: "0.2s"
  },
  {
    id: 4,
    role: "Hostel Management",
    icon: <FaHotel />,
    desc: "Oversees hostel facilities, room allocation, and ensures a safe and comfortable living environment.",
    className: "hostel",
    delay: "0.3s"
  },
  {
    id: 5,
    role: "Librarian",
    icon: <FaBook />,
    desc: "Manages library resources, assists students and staff, and ensures organized access to books and materials.",
    className: "librarian",
    delay: "0.4s"
  }
];

const Staff = () => {
  return (
    <div className="staff-page">
      <h1 className="staff-title">Our Staffs</h1>
      <div className="staff-grid">
        {staffData.map((staff) => (
          <div
            key={staff.id}
            className={`staff-card ${staff.className}`}
            style={{ animationDelay: staff.delay }}
          >
            <div className="icon">{staff.icon}</div>
            <h2 className="role-name">{staff.role}</h2>
            <p className="role-desc">{staff.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Staff;
