import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import styles from "../Styling/navbar.css";

class Nav extends Component {
  render() {
    const email = this.props.match.params.email;
    console.log(email);
    return (
      <div id="nav-container">
        <nav className="nav">
        <span className = "titleHome">Health Tracker</span>
          <ul>
            <li>
              <Link to={`/home/${email}`} style={{ textDecoration: "none" }}>
                {email}
              </Link>
            </li>
            <li>
              <Link to={`/home/${email}`} style={{ textDecoration: "none" }}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/" style={{ textDecoration: "none" }}>
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default withRouter(Nav);
