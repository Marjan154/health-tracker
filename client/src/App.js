import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home2 from "./components/Home2.js";
import Splash from "./components/Splash.js";
import EditLog from "./components/Edit.js";
import AddLog from "./components/AddLog";
import Login from "./components/Login";
import Register from "./components/Register";
import ViewData from "./components/ViewData";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/home" component={Home2} />
          <Route exact path="/home/:email" component={Home2} />
          <Route exact path="/edit/:email" component={EditLog} />
          <Route exact path="/add/:email" component={AddLog} />
          <Route exact path="/view" component={ViewData} />
        </Switch>
      </Router>
    );
  }
}

export default App;
