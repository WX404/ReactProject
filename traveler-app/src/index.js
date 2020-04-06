import React from 'react';
import ReactDOM from 'react-dom';
import App from './router/App.js';
import * as serviceWorker from './serviceWorker';
import "../src/assets/css/index.css";
import 'antd/dist/antd.css';

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);

serviceWorker.unregister();