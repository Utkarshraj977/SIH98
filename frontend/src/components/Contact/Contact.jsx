import React from "react";
import "./Contact.css";
import { FaTwitter, FaInstagram, FaFacebookF } from "react-icons/fa";


const Contact = () => {
  return (
    <div className="contact-wrapper">
      <div className="contact-left">
        <h1>Contact Us</h1>
        <p>
          Have questions, feedback, or support inquiries? Fill out the form and
          we’ll get back to you as soon as possible.
        </p>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <input type="text" placeholder="Subject" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>

      <div className="contact-right">
        <h2>Get in Touch</h2>
        <div className="info-item">
          <span className="icon">📞</span>
          <span className="info-text">+91 9593626356</span>
        </div>
        <div className="info-item">
          <span className="icon">✉️</span>
          <span className="info-text">SIH98@gmail.com</span>
        </div>
        <div className="info-item">
          <span className="icon">📍</span>
          <span className="info-text">
            123, Education Street, Kolkata-700006, India
          </span>
        </div>

        <h3>Follow Us</h3>
        <div className="social-icons">
  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
    <FaTwitter size={30} color="#1DA1F2" />
  </a>
  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
    <FaInstagram size={30} color="#C13584" />
  </a>
  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
    <FaFacebookF size={30} color="#1877F2" />
  </a>
</div>


        <div className="map-container">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.123456!2d88.3645!3d22.5726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0279f0b1b7a1cd%3A0x123456789abcdef!2sKolkata!5e0!3m2!1sen!2sin!4v1693523990000!5m2!1sen!2sin"
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
