import React, { useState, useEffect } from 'react';
import api from '../api/api';

function AdminPage() {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Fetch all users
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

    // Create a new user
    const handleCreateUser = () => {
        if (!username || !password || !phoneNumber) {
            setError('Username, password, and phone number are required');
            return;
        }

        const newUser = { username, password, email, fullName, phoneNumber };

        api.post('/users', newUser)
            .then((response) => {
                setMessage(`User ${response.data.username} created successfully`);
                setUsername('');
                setPassword('');
                setEmail('');
                setFullName('');
                setPhoneNumber('');
                fetchUsers(); // Refresh the user list
            })
            .catch(() => {
                setError('Error creating user');
            });
    };

    // Delete a user
    const handleDeleteUser = (id) => {
        api.delete(`/users/${id}`)
            .then(() => {
                setMessage('User deleted successfully');
                fetchUsers(); // Refresh the user list
            })
            .catch(() => {
                setError('Error deleting user');
            });
    };

    // Fetch users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h2>Admin Page</h2>

            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <h3>Create New User</h3>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleCreateUser();
                }}
            >
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Full Name:
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Phone Number:
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Create User</button>
            </form>

            <h3>Existing Users</h3>
            <table>
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
                                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminPage;
