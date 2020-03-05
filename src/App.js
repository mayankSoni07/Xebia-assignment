import React from 'react';
import {
  BrowserRouter as Router, Switch, Route
} from "react-router-dom";
import { Redirect } from 'react-router'

import Login from "./Login";
import Search from "./Search";

class App extends React.Component {
  render(){
    return (
      <Router>
        <Switch>
          <Route path="/login"><Login /></Route>
          <Route path="/search"><Search /></Route>
          <Route exact path="/" render={() => (<Redirect to="/login" />)} /> 
        </Switch>
      </Router>
    );
  }
}

export default App;
