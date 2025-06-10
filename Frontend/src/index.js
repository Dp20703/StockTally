import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TradeProvider } from './context/TradeContext';
import 'remixicon/fonts/remixicon.css';
import { AuthProvider } from './context/AuthContext';
import { WatchlistProvider } from './context/WatchlistContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <TradeProvider>
        <WatchlistProvider>
          <App />
        </WatchlistProvider>
      </TradeProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
