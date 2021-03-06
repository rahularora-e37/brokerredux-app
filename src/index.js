/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import {loadBrokers} from './actions/brokerActions';
//import {loadHobbies} from './actions/hobbyActions';
  
const store = configureStore();

store.dispatch(loadBrokers());
//store.dispatch(loadHobbies());

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);