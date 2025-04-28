import React from 'react';
import './styles/Footer.css'; // Custom CSS for styling

export const Footer: React.FC<any> = () => {
  return <footer className="text-white py-4">
    <hr></hr>
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
        </div>
      </div>
      <hr className="bg-light" />
      <div className="text-center">
        <p className="mb-0">
          © 2024 Mobicryp-buddy. All rights reserved.
          <br />
          <span>Let's Connect and Grow Together:</span>
          <div className="social-links d-flex justify-content-center">
            <a
              href="https://www.facebook.com/arun.6153"
              className="text-primary text-decoration-none me-3 social-icon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <i className="bi bi-facebook fs-4"></i>
            </a>
            <a
              href="https://www.instagram.com/this.saini/"
              className="text-danger text-decoration-none me-3 social-icon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <i className="bi bi-instagram fs-4"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/thisarunsaini/"
              className="text-info text-decoration-none me-3 social-icon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <i className="bi bi-linkedin fs-4"></i>
            </a>
          </div>
          <br />
          <span className="fw-bold">Join our community and let's stay connected!</span>
        </p>
      </div>
    </div>
  </footer>
}

export default Footer;    