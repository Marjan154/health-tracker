import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Nav extends Component {
  render(){
    return(
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <span className="navbar-brand">Health Tracker</span>
        <div className="collapse navbar-collapse d-flex flex-row-reverse">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/home">Home</Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/add">Add</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Nav;