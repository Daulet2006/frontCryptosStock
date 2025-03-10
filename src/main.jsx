import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import './index.css';
import App from './App.jsx';
import CryptoCyrrencies from './CryptoCyrrencies';
import CryptoDashboard from './CryptoDashboard';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cryptocurrencies" element={<CryptoCyrrencies />} />
        <Route path="/*" element={<h1>Not Found</h1>} />
        <Route path="/cryptodashboard" element={< CryptoDashboard/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
