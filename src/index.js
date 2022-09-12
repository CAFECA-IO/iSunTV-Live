import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.scss';
import App from './container/app/app';
import './i18n/i18n';
import {I18nextProvider} from 'react-i18next';
import {CookiesProvider} from 'react-cookie';

// create react root
const root = createRoot(document.getElementById('root'));

// initialize I18nProvider, CookieProvider, App
root.render(
  <I18nextProvider>
    <CookiesProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </CookiesProvider>
  </I18nextProvider>
);
