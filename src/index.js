import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App';
import './index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);