import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';

import { history } from './configs/browserHistory';
import Login from './components/Authentication/Login';

const App = () => (
  <Router history={history}>
    <Switch>
      <Route exact path='/' component={Login} />
      {/* <Route exact path='/register' component={Register} />
      <Route exact path='/chat' component={Chat} />
      <Route exact path='/chat/:id' component={Chat} /> */}
    </Switch>
  </Router>
);

export default App;
