import React, { useState, useEffect } from 'react';
import api from '../api/api';

function AccountList() {
    const [account, setAccount] = useState(null); // Update to store a single account object

    useEffect(() => {
        api.get('banking/accounts/ACC1234567890')
            .then(response => setAccount(response.data)) // Set the account object
            .catch(error => console.error('Error fetching accounts:', error));
    }, []);

    if (!account) {
        // Display a loading message until the account data is fetched
        return <div>Loading...</div>;
    }

    return (
        <div> 
            <h2>Account Details</h2>
            <ul>
                <li>Account Number: {account.accountNumber}</li>
                <li>Balance: ${account.balance}</li>
            </ul>
        </div>
    );
}

export default AccountList;
