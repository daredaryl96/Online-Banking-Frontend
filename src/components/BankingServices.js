import React, { useState } from 'react';
import api from '../api/api';

function BankingServices() {
    const [accountNumber, setAccountNumber] = useState('');
    const [accountDetails, setAccountDetails] = useState(null);
    const [transactionHistory, setTransactionHistory] = useState([]);
    const [error, setError] = useState('');

    const fetchAccountDetails = () => {
        api.get(`/banking/accounts/${accountNumber}`)
            .then((response) => {
                setAccountDetails(response.data);
                setError('');
            })
            .catch((err) => {
                setError('Error fetching account details. Please check the account number.');
                setAccountDetails(null);
            });
    };

    const fetchTransactionHistory = () => {
        api.get(`/banking/accounts/${accountNumber}/transactions`)
            .then((response) => {
                setTransactionHistory(response.data);
                setError('');
            })
            .catch((err) => {
                setError('Error fetching transaction history.');
                setTransactionHistory([]);
            });
    };

    return (
        <div>
            <h2>Banking Services</h2>
            <div>
                <label>
                    Account Number:
                    <input
                        type="text"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                    />
                </label>
                <button onClick={fetchAccountDetails}>Get Account Details</button>
                <button onClick={fetchTransactionHistory}>Get Transaction History</button>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {accountDetails && (
                <div>
                    <h3>Account Details</h3>
                    <p>Account Number: {accountDetails.accountNumber}</p>
                    <p>Balance: {accountDetails.balance}</p>
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
        </div>
    );
}

export default BankingServices;
