import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to the Student ERP System</h1>
        <p>
          Manage student records, academics, and administration in one
          powerful platform.
        </p>
        <button className="btn primary">Get Started</button>
      </section>
    </div>
  );
};

export default Home;
