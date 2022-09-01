
import * as React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.less';
import '@/styles/base.less';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={ store }>
     <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
