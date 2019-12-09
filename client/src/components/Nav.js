import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import styles from "../Styling/navbar.css";

class Nav extends Component {
  render() {
    const email = this.props.match.params.email;
    return (
      <div id="nav-container">
        <nav className="nav">
          <ul>
            <li>
              <Link to={`/home/${email}`}>Home</Link>
            </li>
            <li>
              <Link to={`/home/${email}`}>Email</Link>
            </li>

            <li>
              <Link to="/">Logout</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default withRouter(Nav);
