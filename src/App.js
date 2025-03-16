
import React, { useContext} from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import CustomerProfile from './components/CustomerProfile';
import BankingServices from './components/BankingServices';
import Transactions from './components/Transactions';
import AdminPage from './components/AdminPage';
import MainPage from './components/MainPage';
import Login from './components/Login';
import ProtectedRoute from "./components/ProtectedRoute";

import './styles/App.css';


// test
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
              <span className="welcome-message">Welcome, {user.username}</span>
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

  return (
    <AuthProvider>
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<Login />} />

                {/* Protected Routes */}
                <Route path="/profile" element={<ProtectedRoute element={<CustomerProfile />} />} />
                <Route path="/banking-services" element={<ProtectedRoute element={<BankingServices />} />} />
                <Route path="/transactions" element={<ProtectedRoute element={<Transactions />} />} />
                    
                {/* Admin Protected Route */}
                <Route path="/admin" element={<ProtectedRoute element={<AdminPage />} requiredRole="ADMIN" />} />
            </Routes>
        </Router>
    </AuthProvider>
);
}

export default App;
