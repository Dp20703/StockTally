import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { TradeProvider } from './context/TradeContext';
import { AuthProvider } from './context/AuthContext';
import { WatchlistProvider } from './context/WatchlistContext';
import './styles/index.css';
import App from './App';

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
