import React from 'react';
import './Layout.css';

const Layout = ({ children }) => {
    return (
        <div className="layout-container">
            {/* Top Bar */}
            <header className="top-bar">
                <div className="top-bar-left">
                    <span className="project-name">KodNest Premium Build System</span>
                </div>
                <div className="top-bar-center">
                    <span className="progress-indicator">Step 1 / 5</span>
                </div>
                <div className="top-bar-right">
                    <span className="status-badge" data-status="in-progress">In Progress</span>
                </div>
            </header>

            {/* Context Header */}
            <section className="context-header">
                <h1>System Initialization</h1>
                <p className="subtext">Configure the foundational parameters for your new SaaS product.</p>
            </section>

            {/* Main Content Area */}
            <div className="main-content-split">
                {/* Primary Workspace (70%) */}
                <main className="primary-workspace">
                    {children}
                </main>

                {/* Secondary Panel (30%) */}
                <aside className="secondary-panel">
                    <div className="panel-section">
                        <h3>Step Explanation</h3>
                        <p>This phase establishes the core design tokens and architectural patterns required for a coherent system.</p>
                    </div>

                    <div className="panel-section">
                        <label className="panel-label">Command Prompt</label>
                        <div className="prompt-box">
                            <code>npm init kodnest-app@latest</code>
                            <button className="btn-copy">Copy</button>
                        </div>
                    </div>

                    <div className="panel-actions">
                        <button className="btn btn-secondary full-width">Build in Lovable</button>
                        <div className="row-actions">
                            <button className="btn btn-success flex-1">It Worked</button>
                            <button className="btn btn-warning flex-1">Error</button>
                        </div>
                        <button className="btn btn-secondary full-width">Add Screenshot</button>
                    </div>
                </aside>
            </div>

            {/* Proof Footer */}
            <footer className="proof-footer">
                <div className="proof-container">
                    <label className="proof-item">
                        <input type="checkbox" /> <span>UI Built</span>
                    </label>
                    <label className="proof-item">
                        <input type="checkbox" /> <span>Logic Working</span>
                    </label>
                    <label className="proof-item">
                        <input type="checkbox" /> <span>Test Passed</span>
                    </label>
                    <label className="proof-item">
                        <input type="checkbox" /> <span>Deployed</span>
                    </label>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
