import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MainPage.css'; // Importing the CSS file

function MainPage() {
    return (
        <div className="main-page">
            {/* Hero Section */}
            <header className="hero-section">
                <h1 className="hero-title">Welcome to Online Banking</h1>
                <p className="hero-description">Manage your finances with cutting-edge security and ease. Your money, your control.</p>
                <div className="hero-buttons">
                    <Link to="/profile" className="hero-button">View Profile</Link>
                    <Link to="/banking-services" className="hero-button">Banking Services</Link>
                    <Link to="/transactions" className="hero-button">View Transactions</Link>
                </div>
            </header>

            {/* Features Section */}
            <section className="features-section">
                <div className="feature">
                    <h2 className="feature-title">🛡️ Secure Transactions</h2>
                    <p className="feature-description">Experience peace of mind with every transaction, protected by top-notch security.</p>
                </div>
                <div className="feature">
                    <h2 className="feature-title">⚡ Real-Time Updates</h2>
                    <p className="feature-description">Get instant notifications and keep track of your finances effortlessly.</p>
                </div>
                <div className="feature">
                    <h2 className="feature-title">🎯 User-Friendly Interface</h2>
                    <p className="feature-description">Navigate your account like a pro with a sleek, intuitive interface.</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; 2025 Online Banking System. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default MainPage;
