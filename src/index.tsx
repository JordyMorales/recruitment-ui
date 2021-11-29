import 'react-toastify/dist/ReactToastify.min.css';
import 'react-quill/dist/quill.snow.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/FirebaseAuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import reportWebVitals from './reportWebVitals';
import store from './store';
import App from './App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <SettingsProvider>
        <BrowserRouter>
          <AuthProvider>
            <Provider store={store}>
              <App />
            </Provider>
          </AuthProvider>
        </BrowserRouter>
      </SettingsProvider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
