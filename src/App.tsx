 /* 描述: 路由组件
 *  作者: Jack Lee
 *  日期: 2022-08-31
 */

import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './router/index';

class App extends React.Component {
  render () {
    return (
      <Router>
        <Routes></Routes>
      </Router>
    )
  }
}

export default App;
