import './bootstrap';
import '../css/app.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import Chat from './Pages/Chat';

ReactDOM.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
        <Chat />
    </React.StrictMode>
);