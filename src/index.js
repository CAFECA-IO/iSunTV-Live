import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './container/App/App';
import REPORT_WEB_VITALS from './utils/reportWebVitals';
import './i18n/i18n';
import { I18nextProvider } from 'react-i18next';
import { CookiesProvider } from 'react-cookie';

// create react root
const ROOT = ReactDOM.createRoot(document.getElementById('root'));

// initialize I18nProvider, CookieProvider, App
ROOT.render(
  <I18nextProvider>
    <CookiesProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
    </CookiesProvider>
  </I18nextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
REPORT_WEB_VITALS(console.log);
