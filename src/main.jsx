import { StrictMode } from 'react'; 
// Importing the StrictMode component from the React library to highlight potential problems in an application

import { createRoot } from 'react-dom/client'; 
// Importing the createRoot method from the react-dom/client to render the root of the React application

import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
// Importing BrowserRouter, Routes, and Route components from the react-router-dom library for handling routing in the React application

import './index.css'; 
// Importing the CSS styles for the application from the local index.css file

import App from './App.jsx'; 
// Importing the main App component from the local App.jsx file
import CryptoCyrrencies from './CryptoCyrrencies'; 
// Importing the CryptoCyrrencies component from the local CryptoCyrrencies file
import CryptoDashboard from './CryptoDashboard'; 
// Importing the CryptoDashboard component from the local CryptoDashboard file
import NotFoundPage from './NotFound.jsx'; 
// Importing the NotFoundPage component from the local NotFound.jsx file
import Chatbot from './ChatbotPage.jsx';
createRoot(document.getElementById('root')).render( 
  // Creating the root of the application and rendering it to the 'root' element
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} /> 
        {/* Defining a route for the main App component */}
        <Route path="/cryptocurrencies" element={<CryptoCyrrencies />} /> 
        {/* Defining a route for the CryptoCyrrencies component */}
        <Route path="/*" element={<NotFoundPage />} /> 
        {/* Defining a route for non-existent paths to render the NotFoundPage component */}
        <Route path="/cryptodashboard" element={<CryptoDashboard />} /> 
        {/* Defining a route for the CryptoDashboard component */}
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
