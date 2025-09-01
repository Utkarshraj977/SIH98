
import { Link } from 'react-router-dom';
import { FaFacebook,FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-10">
      <div className="footer-container mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Company Info */}
        <div>
        <div>
          <h2 className="text-2xl font-semibold mb-3">My Website</h2>
          <p className="text-sm text-gray-400">
            Your one-stop solution for learning and growth. Stay connected with us for updates.
          </p>
        </div>
         <div>
          <div className=" space-x-4 flex items-center justify-center">
            <div className='social flex'>
              <a href="#" className="hover:text-gray-300 ">
              <FaFacebook /> 
            </a>
            <a href="#" className="hover:text-gray-300">
              <FaSquareXTwitter />
            </a>
            <a href="#" className="hover:text-gray-300">
              <FaInstagram />
            </a>
            </div>
          </div>
        </div>
        </div>
        {/* Quick Links */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
            <li><Link to="/about" className="hover:text-gray-300">About</Link></li>
            <li><Link to="/services" className="hover:text-gray-300">Services</Link></li>
            <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-2xl font-semibold mb-3 text-center">Contact Us</h2>
          <ul className="space-y-2 text-gray-400 text-center">
            <li>📍 123 Learning Street, Knowledge City</li>
            <li>📞 +1 234 567 890</li>
            <li>✉️ contact@mywebsite.com</li>
          </ul>
       </div>
        
      </div>

      
        <div className="text-center text-gray-500 text-sm mt-6">
        © {new Date().getFullYear()} My Website. All rights reserved.
      </div>
      
    
    </footer>
  );
};

export default Footer;
