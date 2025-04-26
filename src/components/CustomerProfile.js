import React, { useState, useEffect, useContext  } from 'react';
import api from '../api/api';
import { AuthContext } from "../context/AuthContext";
import '../styles/ProfilePage.css';

function CustomerProfile() {
    const { user } = useContext(AuthContext);  // Access logged-in user from AuthContext
    const [customer, setCustomer] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});

    const customerId = 1; // Replace with dynamic user authentication data

    useEffect(() => {
        api.get(`/users/${user.id}`)
            .then((response) => {
                console.log('User data fetched:', response.data); // Log the fetched data
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
        <div className="profile-container">
            <h2 className="profile-title">Customer Profile</h2>
            {isEditing ? (
                <div className="profile-form">
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
                    <div className="profile-buttons">
                        <button className="save-button" onClick={handleSave}>
                            Save
                        </button>
                        <button className="cancel-button" onClick={() => setIsEditing(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="profile-details">
                    <p>
                        <strong>Full Name:</strong> {customer.fullName}
                    </p>
                    <p>
                        <strong>Email:</strong> {customer.email}
                    </p>
                    <button className="edit-button" onClick={() => setIsEditing(true)}>
                        Edit Profile
                    </button>
                </div>
            )}
        </div>
    );
}

export default CustomerProfile;
