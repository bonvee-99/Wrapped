import React from 'react'
import {
  BrowserRouter as Router, 
  Switch,
  Route
} from 'react-router-dom'
import Layout from './layout/Layout'
import Landing from './components/pages/Landing'
import Results from './components/pages/Results'
import EnterInfo from './components/pages/EnterInfo'

import './App.css';

function App() {
  return (
    <div className="body-wrap">
      <Router>
        <Layout>
          <Switch>
            <Route path={'/EnterInfo'} component={EnterInfo}></Route>
            <Route path={'/Results'} component={Results}></Route>
            <Route path={'/'} component={Landing}></Route>
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
