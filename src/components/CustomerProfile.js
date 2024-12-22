import React, { useState, useEffect } from 'react';
import api from '../api/api';

function CustomerProfile() {
    const [customer, setCustomer] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});

    const customerId = 1; // Replace with actual logged-in customer's ID - to be developed with authentication

    useEffect(() => {
        // Fetch customer details
        api.get(`/users/${customerId}`)
            .then((response) => {
                setCustomer(response.data);
                setFormData(response.data);
            })
            .catch((error) => console.error('Error fetching customer data:', error));
    }, [customerId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        api.put(`/users/${customerId}`, formData)
            .then((response) => {
                setCustomer(response.data);
                setIsEditing(false);
            })
            .catch((error) => console.error('Error updating customer data:', error));
    };

    return (
        <div>
            <h2>Customer Profile</h2>
            {isEditing ? (
                <div>
                    <label>
                        Full Name:
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email || ''}
                            onChange={handleInputChange}
                        />
                    </label>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div>
                    <p>
                        <strong>Full Name:</strong> {customer.fullName}
                    </p>
                    <p>
                        <strong>Email:</strong> {customer.email}
                    </p>
                    <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                </div>
            )}
        </div>
    );
}

export default CustomerProfile;
