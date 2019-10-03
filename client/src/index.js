import React from 'react'
import ReactDOM from 'react-dom'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './Components/App'
import Home from './Components/Home.js'

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/home" component={Home} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))