import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthProvider from './context/AuthContext';
import './styles/global.css';

// Create the root container
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app with AuthProvider wrapped
root.render(
    <AuthProvider>
        <App />
    </AuthProvider>
);
