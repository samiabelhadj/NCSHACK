import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        {/* StrictMode helps with identifying potential problems in an application */}
        <App />
    </React.StrictMode>
); 