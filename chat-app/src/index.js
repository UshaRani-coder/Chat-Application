import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import  AuthContextProvider  from './Context/AuthContext';
//import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </AuthContextProvider>
);


//reportWebVitals();
