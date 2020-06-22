import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux'
import {BrowserRouter, HashRouter} from 'react-router-dom'
import {Route} from 'react-router'
import Main from "./components/main";
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <HashRouter> {/*headerRoute 사용*/}
      <Route path='/' component={Main} />
    </HashRouter>
  </Provider>
  ,
  document.getElementById('root')
);

