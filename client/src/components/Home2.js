import React, { Component } from "react";
import styles from "../Styling/Home2.css";

class Home2 extends Component {
  state = {};
  render() {
    return (
      <div class="grid-container">
        <div className="summary">
          {" "}
          Summary
          <div style={{ width: "90vw" }}>
            <img
              src={require("../Images/drop.png")}
              style={{ padding: "20px" }}
              className="p-icon"
            ></img>
          </div>
          {/* <p>18.7 births per 1000 people</p> */}
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
          <div className="stat">
            <div>
              <img
                src={require("../Images/taco.png")}
                style={{ padding: "20px" }}
                className="p-icon"
              ></img>
              <p>calories</p>
            </div>{" "}
          </div>
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
        </div>
      </div>
    );
  }
}

export default Home2;
