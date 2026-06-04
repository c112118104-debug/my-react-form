import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/App';
import store from './src/store'; // 引入 store
import { Provider } from 'react-redux'; // 引入 Provider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* 用 Provider 包覆 App，並把 store 傳進去 */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);