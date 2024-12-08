import React from 'react';
import './styles/Footer.css'; // Custom CSS for styling

export const Footer: React.FC<any> = () => {
  return <footer className="text-white py-4">
    <div className="container">
      <div className="row">
        {/* Footer Left Section */}
        <div className="col-md-4">
          <h5>About Us</h5>
          <p>
            We are dedicated to providing the best services and information.
            Empowering communities with knowledge and innovation.
          </p>
        </div>

        {/* Footer Center Section */}
        <div className="col-md-4 text-center">
          <h5>Quick Links</h5>
          <ul className="list-unstyled">
            <li>
              <a href="#home" className="text-white text-decoration-none">Home</a>
            </li>
            <li>
              <a href="#services" className="text-white text-decoration-none">Services</a>
            </li>
            <li>
              <a href="#contact" className="text-white text-decoration-none">Contact</a>
            </li>
          </ul>
        </div>

        {/* Footer Right Section */}
        <div className="col-md-4 text-center">
          <h5>Contact Us</h5>
          <p>
            Email: sarun6153@gmail.com <br />
            Phone: <a href="tel:8607972097">8607972097</a>
          </p>
          <div className="d-flex justify-content-center">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white me-3"
              aria-label="Facebook"
            >
              <i className="bi bi-facebook fs-4"></i>
            </a>

            {/* Twitter */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white me-3"
              aria-label="Twitter"
            >
              <i className="bi bi-twitter fs-4"></i>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white me-3"
              aria-label="Instagram"
            >
              <i className="bi bi-instagram fs-4"></i>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white me-3"
              aria-label="LinkedIn"
            >
              <i className="bi bi-linkedin fs-4"></i>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
              aria-label="YouTube"
            >
              <i className="bi bi-youtube fs-4"></i>
            </a>
          </div>
        </div>
      </div>

      <hr className="bg-light" />

      <div className="text-center">
        <p className="mb-0"> © 2024 Mobicryp. All rights reserved.<br></br>
          Follow us on social media: [Links to Social Media]</p>
      </div>
    </div>
  </footer>
}

export default Footer;    