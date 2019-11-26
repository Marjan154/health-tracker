import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class Nav extends Component {
  render() {
    const email = this.props.match.params.email;

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <span className="navbar-brand">Health Tracker</span>
        <div className="collapse navbar-collapse d-flex flex-row-reverse">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to={`/add/${email}`}>
                Add
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/edit">
                Edit
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(Nav);
