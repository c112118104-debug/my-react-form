// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import './i18n'; // 💡 務必在 App 渲染前引入這行，啟動多國語系設定

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);