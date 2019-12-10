import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/Home.js";
import Login from "./components/Login";
import Register from "./components/Register";
import Water from "./components/Water";
import Sleep from "./components/Sleep";
import Calories from "./components/Calories";

import { Provider, connect } from "react-redux";
import store from "./store/index";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/home/:email" component={Home} />
            <Route exact path="/water/:email" component={Water} />
            <Route exact path="/sleep/:email" component={Sleep} />
            <Route exact path="/calories/:email" component={Calories} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
