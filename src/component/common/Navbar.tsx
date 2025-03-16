import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaDollarSign,
  FaCalculator,
  FaInfoCircle,
  FaChartLine,
  FaCogs,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "./styles/Navbar.css"; // Include your CSS styles
import { urlPath } from "../utils/imageUtils";

const NavigationBar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <NavLink className="navbar-brand px-2" to="/landing">
        <img
          height={30}
          src={urlPath("assets/logo.png")}
          alt="Brand Logo"
          className="brand-logo"
        />
      </NavLink>
      <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
        {isCollapsed ? <FaBars /> : <FaTimes color="red" />}
      </button>
      <div
        className={`collapse navbar-collapse ${
          isCollapsed ? "collapse" : "show"
        }`}
        id="navbarNav"
      >
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              to="/landing"
            >
              <FaHome /> Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              to="/arbitrage"
            >
              <FaDollarSign /> Arbitrage
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              to="/calculator"
            >
              <FaCalculator /> Calculator
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              to="/growth"
            >
              <FaChartLine /> Growth Planner
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              to="/usdt-usecases"
            >
              <FaCogs /> Use Case
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              to="/faqs"
            >
              <FaInfoCircle /> FAQs
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
