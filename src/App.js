import React from 'react';
import Layout from './pages/layout/layout'
import { HashRouter, Switch, Redirect, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route path='/layout' component={Layout} />

          <Redirect exact from="/" to='/layout' />
        
        </Switch>
      
      </HashRouter>
    </div>
  );
}

export default App;
