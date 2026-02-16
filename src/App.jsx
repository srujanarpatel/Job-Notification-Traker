import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

// Pages
import Dashboard from './pages/Dashboard';
import Saved from './pages/Saved';
import Digest from './pages/Digest';
import Settings from './pages/Settings';
import PlaceholderPage from './pages/PlaceholderPage';
import LandingPage from './pages/LandingPage';
import TestChecklist from './pages/TestChecklist';
import Ship from './pages/Ship';
import Proof from './pages/Proof'; // Now the real Proof page

// Components
import Layout from './components/Layout';
import './components/Navigation.css';

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Saved', path: '/saved' },
        { name: 'Digest', path: '/digest' },
        { name: 'Settings', path: '/settings' },
        { name: 'Proof', path: '/proof' },
        { name: 'Test', path: '/jt/07-test' },
    ];

    return (
        <nav className="nav-container">
            <div className="nav-content">
                <Link to="/" className="nav-logo">
                    JobTracker
                </Link>
                <div className="nav-desktop">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </div>
                <button className="nav-mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
            {isOpen && (
                <div className="nav-mobile-menu">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) => `nav-mobile-link ${isActive ? 'active' : ''}`}
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

const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Navigation />
                <div style={{ paddingBottom: '80px' }}>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/saved" element={<Saved />} />
                        <Route path="/digest" element={<Digest />} />
                        <Route path="/settings" element={<Settings />} />

                        {/* Map both /proof and /jt/proof to the Proof page as requested */}
                        <Route path="/proof" element={<Proof />} />
                        <Route path="/jt/proof" element={<Proof />} />

                        <Route path="/jt/07-test" element={<TestChecklist />} />
                        <Route path="/jt/08-ship" element={<Ship />} />
                    </Routes>
                </div>
            </Layout>
        </BrowserRouter>
    );
};

export default App;
