import React, { useEffect, useState } from 'react';
import api from '../api/api';

function Transactions({ accountId }) {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        // Fetch transaction history for the account
        api.get(`/banking/accounts/${accountId}/transactions`)
            .then((response) => {
                setTransactions(response.data);
            })
            .catch((error) => console.error('Error fetching transactions:', error));
    }, [accountId]);

    return (
        <div>
            <h2>Transaction History</h2>
            {transactions.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                    {transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>{new Date(transaction.timestamp).toLocaleDateString()}</td>
                                <td>{transaction.transactionType}</td>
                                <td>{transaction.amount.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No transactions available.</p>
            )}
        </div>
    );
}

export default Transactions;
