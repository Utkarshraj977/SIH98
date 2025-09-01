import React from "react";
import "./About.css";
import img1 from "../../assets/about1.jpg";
import img2 from "../../assets/about2.jpg";


const About = () => {
  return (
    <div className="about">
      <h1>About Our Integrated Student Management System</h1>
      <p>
        Our ERP platform is designed to streamline academic, administrative, and
        student management processes in schools, colleges, and universities. 
        We provide a centralized system for students, teachers, and administrators.
      </p>

      <section className="features">
        <div className="feature-card">
          <h3>Student Records</h3>
          <p>
            Maintain detailed student profiles including grades, attendance,
            and personal information.
          </p>
        </div>
        <div className="feature-card">
          <h3>Academic Management</h3>
          <p>
            Plan timetables, schedule exams, track results, and manage courses
            easily.
          </p>
        </div>
        <div className="feature-card">
          <h3>Administration</h3>
          <p>
            Automate administrative tasks such as fee collection, reports, and
            notifications.
          </p>
        </div>
      </section>

      <div className="about-images">
        <img
          src={img2}
          alt="students"
        />
        <img
          src={img1}
          alt="technology"
        />
      </div>

      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          To provide educational institutions with a powerful and easy-to-use
          platform that enhances student experience, improves efficiency, and
          empowers teachers and administrators.
        </p>
      </section>
    </div>
  );
};

export default About;
