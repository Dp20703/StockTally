import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./context/AuthContext";
import { ModalProvider } from "./context/ModalContext";
import { TradeProvider } from "./context/TradeContext";
import { WatchlistProvider } from "./context/WatchlistContext";
import "./styles/index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ModalProvider>
        <TradeProvider>
          <WatchlistProvider>
            <App />
          </WatchlistProvider>
        </TradeProvider>
      </ModalProvider>
    </AuthProvider>
  </React.StrictMode>,
);

reportWebVitals();
