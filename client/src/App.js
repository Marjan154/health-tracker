import React, {Component} from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import Home from './Components/home.js'
import Splash from './Components/Splash.js';
import './App.css';

class App extends Component {
  render(){
    return(
      <Router>
        <Switch>
          <Route exact path= "/" component= {Splash} />
          <Route exact path= "/home" component= {Home} />
        </Switch>
      </Router>
    );
  }
}

export default App;
