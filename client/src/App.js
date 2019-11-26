import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/home.js";
import Splash from "./components/Splash.js";
import EditLog from "./components/Edit.js";
import AddLog from "./components/AddLog";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Splash} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/home/:email" component={Home} />
          <Route exact path="/edit/:email" component={EditLog} />
          <Route exact path="/add/:email" component={AddLog} />
        </Switch>
      </Router>
    );
  }
}

export default App;
