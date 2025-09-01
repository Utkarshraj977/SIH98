import React from "react";

import "./Cards.css";
import { FaUserGraduate } from "react-icons/fa";

const Card = () => {
  return (
    <div className="card-container">
      <div className="card-image">
        <FaUserGraduate className="card-icon" />
      </div>
      <div className="card-content">
        <h3>Student Management</h3>
        <p>
          Easily manage student profiles, academic records, attendance, and progress reports in a centralized system, ensuring smooth operations for administrators and teachers.
        </p>
      </div>
    </div>
  );
};

export default Card;
