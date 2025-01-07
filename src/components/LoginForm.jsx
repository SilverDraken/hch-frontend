import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { loginUser } from '../api/api';

const LoginForm = () => {
    const { login } = useContext(AuthContext); // Get the login function from AuthContext
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await loginUser(credentials); // Call API to authenticate
            login(userData); // Set user in AuthContext
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h3>Login</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div style={{ marginBottom: '10px' }}>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                />
            </div>
            <button
                type="submit"
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Login
            </button>
        </form>
    );
};

export default LoginForm;
