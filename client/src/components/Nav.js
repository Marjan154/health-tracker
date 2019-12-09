import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import styles from "../Styling/navbar.css";

function Nav() {
  return (
    <div id="nav-container">
      <nav className="nav">
        <ul>
          <li>
            <Link to="/Home">Home</Link>
          </li>
          <li>
            <Link to="/Home">Email</Link>
          </li>

          <li>
            <Link to="/">Logout</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default withRouter(Nav);
