import React, { useEffect, useState, useContext } from 'react';
import api from '../api/api';
import '../styles/Transactions.css';
import { AuthContext } from "../context/AuthContext";

function Transactions() {
    const { user } = useContext(AuthContext);
    const [transactions, setTransactions] = useState([]);
    const accountNumber = user?.accounts?.[0]?.accountNumber;

    useEffect(() => {
        if (!accountNumber) {
            console.error('Account number is undefined. Cannot fetch transactions.');
            return;
        }

        // Fetch transaction history for the account
        api.get(`/banking/accounts/${accountNumber}/transactions`)
            .then((response) => {
                setTransactions(response.data);
            })
            .catch((error) => console.error('Error fetching transactions:', error));
    }, [accountNumber]);

    return (
        <div className="transactions-container">
            <h2>Transaction History</h2>
            {transactions.length > 0 ? (
                <div className="table-wrapper">
                    <table className="transactions-table">
                        <thead>
                            <tr>
                                <th>Timestamp</th>
                                <th>Transaction Type</th>
                                <th>Amount (USD)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction) => (
                                <tr key={transaction.id}>
                                    <td>{new Date(transaction.timestamp).toLocaleString()}</td>
                                    <td>{transaction.transactionType}</td>
                                    <td>${transaction.amount.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="no-transactions">No transactions available.</p>
            )}
        </div>
    );
}

export default Transactions;
