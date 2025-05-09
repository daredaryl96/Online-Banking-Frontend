import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";  // Your API instance for making requests
import { AuthContext } from "../context/AuthContext";
import '../styles/Login.css';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await api.post("/auth/login", { username, password });
            login(response.data);  // Save user in AuthContext
            navigate("/");  // Redirect to home
        } catch (err) {
            setError("Invalid credentials");
        }
    };

    return (
        <div className="login-container">
            <div className="login-hero-section">
                <h2 className="login-hero-title">Welcome Back!</h2>
                <p className="login-hero-description">Please login to access your account.</p>
            </div>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
