import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/home.js";
import Home2 from "./components/Home2.js";
import Splash from "./components/Splash.js";
import EditLog from "./components/Edit.js";
import AddLog from "./components/AddLog";
import Login from "./components/Login";
import Register from "./components/Register";
import ViewData from "./components/ViewData";
import Water from "./components/Water";
import WaterDay from "./components/WaterDay";
import Sleep from "./components/Sleep";
import Calories from "./components/Calories";
import Nav from "./components/Nav";

import DeleteLog from "./components/DeleteLog";
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
            <Route exact path="/home2:email" component={Home} />
            <Route exact path="/home/:email" component={Home2} />
            <Route exact path="/edit/:email" component={EditLog} />
            <Route exact path="/add/:email" component={AddLog} />
            <Route exact path="/view/:email" component={ViewData} />
            <Route exact path="/water/:email" component={Water} />
            <Route exact path="/water/:date/:email" component={WaterDay} />
            <Route exact path="/sleep/:email" component={Sleep} />
            <Route exact path="/calories/:email" component={Calories} />
            <Route exact path="/delete/:email" component={DeleteLog} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
