import React, { useState, useEffect } from 'react';
import api from '../api/api';
import '../styles/AdminPage.css';

function AdminPage() {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchUsers = () => {
        api.get('/users')
            .then((response) => {
                setUsers(response.data);
                setError('');
            })
            .catch(() => {
                setError('Error fetching users');
            });
    };

    const handleCreateUser = () => {
        if (!username || !password || !phoneNumber) {
            setError('Username, password, and phone number are required');
            return;
        }

        setIsLoading(true);
        const newUser = { username, password, email, fullName, phoneNumber };

        api.post('/users', newUser)
            .then((response) => {
                setMessage(`User ${response.data.username} created successfully`);
                setUsername('');
                setPassword('');
                setEmail('');
                setFullName('');
                setPhoneNumber('');
                fetchUsers();
            })
            .catch(() => {
                setError('Error creating user');
            })
            .finally(() => setIsLoading(false));
    };

    const handleDeleteUser = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            api.delete(`/users/${id}`)
                .then(() => {
                    setMessage('User deleted successfully');
                    fetchUsers();
                })
                .catch(() => {
                    setError('Error deleting user');
                });
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (message || error) {
            const timeout = setTimeout(() => {
                setMessage('');
                setError('');
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [message, error]);

    return (
        <div className="admin-container">
            <h2 className="admin-title">Admin Page</h2>

            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}

            <div className="form-container">
                <h3>Create New User</h3>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleCreateUser();
                    }}
                >
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="fullName">Full Name:</label>
                        <input
                            type="text"
                            id="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Enter full name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Enter phone number"
                        />
                    </div>

                    <button type="submit" className="btn-submit" disabled={isLoading}>
                        {isLoading ? 'Creating...' : 'Create User'}
                    </button>
                </form>
            </div>

            <div className="users-section">
                <h3>Existing Users</h3>
                {users.length === 0 ? (
                    <p>No users found.</p>
                ) : (
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Full Name</th>
                                <th>Phone Number</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.fullName}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>
                                        <button
                                            className="delete-button"
                                            onClick={() => handleDeleteUser(user.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default AdminPage;
