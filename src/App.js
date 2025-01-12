import React from 'react';
import AccountList from './components/AccountList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerProfile from './components/CustomerProfile';
import BankingServices from './components/BankingServices';
import Transactions from './components/Transactions';
import AdminPage from './components/AdminPage';

import './styles/App.css';


function App() {

//   const accountId = 1; 
  const accountNumber = "ACC1234567890"; // Replace with dynamic account ID from authentication or state
  return (
      <Router>
          <div>
              <h1>Online Banking System</h1>
              <Routes>
                  <Route path="/profile" element={<CustomerProfile />} />
                  <Route path="/banking-services" element={<BankingServices accountNumber={accountNumber} />} />
                  <Route path="/transactions" element={<Transactions accountNumber={accountNumber} />} />
                  <Route path="/admin" element={<AdminPage />} />
              </Routes>
          </div>
          <div>
          <h1>Online Banking System</h1>
          <AccountList />
    </div>
      </Router>
  );
}

export default App;
