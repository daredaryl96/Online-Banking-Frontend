
import React, { useContext} from "react";
import AccountList from './components/AccountList';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import CustomerProfile from './components/CustomerProfile';
import BankingServices from './components/BankingServices';
import Transactions from './components/Transactions';
import AdminPage from './components/AdminPage';
import MainPage from './components/MainPage';
import Login from './components/Login';

import './styles/App.css';

function Header() {

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();


  return (
    <header className="header">
      <div className="navbar">
          <div className="navbar-logo">Online Banking</div>
          <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/profile">Profile</Link>
              <Link to="/banking-services">Banking Services</Link>
              <Link to="/transactions">Transactions</Link>
              {user?.role === "ADMIN" && <Link to="/admin">Admin</Link>}
          </div>
          <div className="navbar-actions">
                    {user ? (
                        <>
                            <span>Welcome, {user.username}</span>
                            <button onClick={() => { logout(); navigate("/login"); }}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <button className="login-button" onClick={() => navigate("/login")}>Login</button>
                    )}
                </div>
      </div>
    </header>
  );
}


function App() {

//   const accountId = 1; 
  const accountNumber = "ACC1234567890"; // Replace with dynamic account ID from authentication or state
  return (
    <AuthProvider>
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/profile" element={<CustomerProfile />} />
                <Route path="/banking-services" element={<BankingServices />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>

    <div>
          <AccountList />
    </div>

    </AuthProvider>
);
}

export default App;
