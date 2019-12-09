import React, { Component } from "react";
import styles from "../Styling/Home2.css";
import { Link } from "react-router-dom";

class Home2 extends Component {
  state = { email: this.props.match.params.email };
  render() {
    const email = this.props.match.params.email;
    return (
      <div class="grid-container">
        <div className="summary">
          Summary
          <div style={{ width: "90vw" }}>
            <img
              src={require("../Images/drop.png")}
              style={{ padding: "20px" }}
              className="p-icon"
            ></img>
          </div>
          <div id="icons">
            <div>
              <img
                src={require("../Images/drop.png")}
                style={{ padding: "20px" }}
                className="p-icon"
              ></img>
              <p>water</p>
            </div>

            <div>
              <img
                src={require("../Images/taco.png")}
                style={{ padding: "20px" }}
                className="p-icon"
              ></img>
              <p>calories</p>
            </div>
            <div>
              <img
                src={require("../Images/sleeping.png")}
                style={{ padding: "20px" }}
                className="p-icon"
              ></img>
              <p>sleep</p>
            </div>
          </div>
        </div>

        <div className="stats">
          <Link to={`/water/${email}`}>
            <div className="stat">
              <div>
                <img
                  src={require("../Images/drop.png")}
                  style={{ padding: "20px" }}
                  className="p-icon"
                ></img>
                <p>water</p>
              </div>
            </div>
          </Link>

          <Link to={`/calories/${email}`}>
            <div className="stat">
              <div>
                <img
                  src={require("../Images/taco.png")}
                  style={{ padding: "20px" }}
                  className="p-icon"
                ></img>
                <p>calories</p>
              </div>
            </div>
          </Link>

          <Link to={`/sleep/${email}`}>
            <div className="stat">
              <div>
                <img
                  src={require("../Images/sleeping.png")}
                  style={{ padding: "20px" }}
                  className="p-icon"
                ></img>
                <p>sleep</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default Home2;