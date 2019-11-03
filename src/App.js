import React from 'react';
import Layout from './pages/layout/layout'
import Map from './pages/map/map'
import { HashRouter, Switch, Redirect, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route path='/layout' component={Layout} />
          <Route path='/map' component={Map} />

          
          <Redirect exact from="/" to='/layout' />

        </Switch>

      </HashRouter>
    </div>
  );
}

export default App;
