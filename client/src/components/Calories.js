import React, { Component, useState } from "react";
import DatePicker from "react-datepicker";
import Nav from "./Nav.js";
import Graph from "./graph.js";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import styles from "../Styling/Grid.css";
import ViewData from "./ViewData";

class Calories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.match.params.email,
      logs: [],
      startDate: new Date(),
      totalDrankToday: 0
    };
  }
  render() {
    return (
      <div>
        <Nav />
        <ViewData
          data={this.state}
          healthlabel={"calories"}
          title={"Calorie"}
          message={"You have consumed: "}
          message2={"calories today"}
        />
      </div>
    );
  }
}

export default Calories;