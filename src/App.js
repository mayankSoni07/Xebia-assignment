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
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/search" component={Search} />
        </Switch>
      </Router>
    );
  }
}

export default App;
