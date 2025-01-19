import React, { useState } from 'react';
import api from '../api/api';
import '../styles/BankingServices.css'; // Importing the CSS file

function BankingServices() {
    const [accountNumber, setAccountNumber] = useState('');
    const [accountDetails, setAccountDetails] = useState(null);
    const [transactionHistory, setTransactionHistory] = useState([]);
    const [transactionType, setTransactionType] = useState('DEPOSIT');
    const [transactionAmount, setTransactionAmount] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Fetch account details
    const fetchAccountDetails = () => {
        if (!accountNumber) {
            setError('Please enter an account number.');
            return;
        }
        api.get(`/banking/accounts/${accountNumber}`)
            .then((response) => {
                setAccountDetails(response.data);
                setError('');
            })
            .catch(() => {
                setError('Error fetching account details. Please check the account number.');
                setAccountDetails(null);
            });
    };

    // Fetch transaction history
    const fetchTransactionHistory = () => {
        if (!accountNumber) {
            setError('Please enter an account number.');
            return;
        }
        api.get(`/banking/accounts/${accountNumber}/transactions`)
            .then((response) => {
                setTransactionHistory(response.data);
                setError('');
            })
            .catch(() => {
                setError('Error fetching transaction history.');
                setTransactionHistory([]);
            });
    };

    // Perform a transaction (deposit or withdrawal)
    const handleTransaction = () => {
        if (!accountNumber) {
            setError('Please enter an account number to perform a transaction.');
            return;
        }
        if (!transactionAmount || parseFloat(transactionAmount) <= 0) {
            setError('Please enter a valid transaction amount.');
            return;
        }

        const payload = {
            accountNumber,
            transactionType,
            amount: parseFloat(transactionAmount),
        };

        api.post(`/banking/accounts/${accountNumber}/transactions`, payload)
            .then((response) => {
                setMessage(`Transaction successful: ${response.data.transactionType} of ${response.data.amount}`);
                setTransactionAmount('');
                setError('');
                fetchTransactionHistory(); // Optionally refresh transaction history
            })
            .catch(() => {
                setError('Transaction failed. Please try again.');
                setMessage('');
            });
    };

    return (
        <div className="banking-container">
            <h2 className="banking-title">Banking Services</h2>

            <div className="banking-form">
                <h3>Account Operations</h3>
                <label>
                    Account Number:
                    <input
                        type="text"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                    />
                </label>
                <button className="fetch-button" onClick={fetchAccountDetails}>Get Account Details</button>
                <button className="fetch-button" onClick={fetchTransactionHistory}>Get Transaction History</button>
            </div>

            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}

            {accountDetails && (
                <div className="account-details">
                    <h3>Account Details</h3>
                    <p>Account Number: {accountDetails.accountNumber}</p>
                    <p>Balance: {accountDetails.balance.toFixed(2)}</p>
                </div>
            )}

            {transactionHistory.length > 0 && (
                <div>
                    <h3>Transaction History</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Type</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactionHistory.map((transaction) => (
                                <tr key={transaction.id}>
                                    <td>{new Date(transaction.timestamp).toLocaleDateString()}</td>
                                    <td>{transaction.transactionType}</td>
                                    <td>{transaction.amount.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="transaction-form">
                <h3>Perform a Transaction</h3>
                <label>
                    Account Number:
                    <input
                        type="text"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                    />
                </label>
                <label>
                    Transaction Type:
                    <select
                        value={transactionType}
                        onChange={(e) => setTransactionType(e.target.value)}
                    >
                        <option value="DEPOSIT">Deposit</option>
                        <option value="WITHDRAWAL">Withdrawal</option>
                    </select>
                </label>
                <label>
                    Amount:
                    <input
                        type="number"
                        value={transactionAmount}
                        onChange={(e) => setTransactionAmount(e.target.value)}
                    />
                </label>
                <button className="transaction-button" onClick={handleTransaction}>Submit Transaction</button>
            </div>
        </div>
    );
}

export default BankingServices;
