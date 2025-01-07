import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import InterventionForm from './components/InterventionForm';
import InterventionList from './components/InterventionList';
import LoginForm from './components/LoginForm';

const App = () => {
    return (
        <Router>
            <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
                {/* Navigation Menu */}
                <nav style={{ marginBottom: '20px' }}>
                    <ul style={{ listStyle: 'none', display: 'flex', gap: '15px', padding: 0 }}>
                        <li>
                            <Link to="/" style={linkStyle}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/intervention-form" style={linkStyle}>
                                Create Intervention
                            </Link>
                        </li>
                        <li>
                            <Link to="/login-form" style={linkStyle}>
                                Login
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* App Routes */}
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div>

                            </div>
                        }
                    />
                    <Route path="/intervention-form" element={<InterventionForm />} />
                    <Route path="/login-form" element={<LoginForm />} />
                </Routes>
                <InterventionList />
            </div>
        </Router>
    );
};

// Basic link styling for the navigation menu
const linkStyle = {
    textDecoration: 'none',
    color: '#007bff',
    fontWeight: 'bold',
};

export default App;
