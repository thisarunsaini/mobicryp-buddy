import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaDollarSign, FaCalculator, FaInfoCircle } from 'react-icons/fa';
import './styles/Navbar.css'; // Include your CSS styles

const NavigationBar: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

    const toggleNavbar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <NavLink className="navbar-brand px-2" to="/">
                <img height={30} src="/assets/logo.png" alt="Brand Logo" className="brand-logo" />
            </NavLink>
            <button
                className="navbar-toggler"
                type="button"
                onClick={toggleNavbar}
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse ${isCollapsed ? 'collapse' : 'show'}`} id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/landing">
                            <FaHome /> Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/arbitrage">
                            <FaDollarSign /> Arbitrage Model
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/calculator">
                            <FaCalculator /> Plan Calculator
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/usdt-usecases">
                            <FaCalculator /> Use Case
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/faqs">
                            <FaInfoCircle /> FAQs
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavigationBar;
