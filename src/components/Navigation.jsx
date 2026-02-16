import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navigation.css';

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navItems = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Saved', path: '/saved' },
        { name: 'Digest', path: '/digest' },
        { name: 'Settings', path: '/settings' },
        { name: 'Proof', path: '/proof' },
    ];

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo / Brand */}
                <Link to="/" className="navbar-brand">
                    Job Notification Tracker
                </Link>

                {/* Desktop Navigation */}
                <div className="navbar-links desktop-only">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `nav-link ${isActive ? 'active' : ''}`
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="mobile-menu-btn mobile-only"
                    onClick={toggleMenu}
                    aria-label="Toggle navigation"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation Dropdown */}
            {isOpen && (
                <div className="mobile-menu mobile-only">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `mobile-nav-link ${isActive ? 'active' : ''}`
                            }
                            onClick={() => setIsOpen(false)}
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navigation;
