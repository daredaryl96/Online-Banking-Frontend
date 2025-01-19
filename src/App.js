import React from 'react';
import AccountList from './components/AccountList';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CustomerProfile from './components/CustomerProfile';
import BankingServices from './components/BankingServices';
import Transactions from './components/Transactions';
import AdminPage from './components/AdminPage';
import MainPage from './components/MainPage';

import './styles/App.css';

function Header() {
  return (
    <header className="header">
      <div className="navbar">
          <div className="navbar-logo">Online Banking</div>
          <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/profile">Profile</Link>
              <Link to="/banking-services">Banking Services</Link>
              <Link to="/transactions">Transactions</Link>
              <Link to="/admin">Admin</Link>
          </div>
          <div className="navbar-actions">
              <button className="login-button">Login</button>
              <button className="signup-button">Sign Up</button>
          </div>
      </div>
    </header>
  );
}


function App() {

//   const accountId = 1; 
  const accountNumber = "ACC1234567890"; // Replace with dynamic account ID from authentication or state
  return (
      <Router>
          <div>
          <Header />
              <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/profile" element={<CustomerProfile />} />
                  <Route path="/banking-services" element={<BankingServices accountNumber={accountNumber} />} />
                  <Route path="/transactions" element={<Transactions accountNumber={accountNumber} />} />
                  <Route path="/admin" element={<AdminPage />} />
              </Routes>
          </div>
          <div>
          <AccountList />
    </div>
      </Router>
  );
}

export default App;
