import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import BrokersPage from './components/brokers/BrokersPage';
import BrokerPage from './components/brokers/BrokerPage';
import NewBrokerPage from './components/brokers/NewBrokerPage';
import LogInPage from './components/LogInPage';
import auth from './auth/authenticator';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={BrokersPage} />
    <Route path="/login" component={LogInPage} />
    <Route path="/brokers" component={BrokersPage}>
      <Route path="/brokers/new" component={NewBrokerPage} />
      <Route path="/brokers/:id" component={BrokerPage} />
    </Route>
  </Route>
);

function requireAuth(nextState, replace) {
  console.log(auth.loggedIn());
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}
