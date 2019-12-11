import React, { Component, useState } from "react";
import DatePicker from "react-datepicker";
import Nav from "./Nav.js";
import Graph from "./graph.js";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import styles from "../Styling/Grid.css";
import ViewData from "./ViewData";

class Sleep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.match.params.email,
      logs: [],
      startDate: new Date(),
      amount: 0,
      hours: 0,
      minutes: 0
    };
  }

  render() {
    return (
      <div>
        <Nav />
        <ViewData
          data={this.state}
          healthlabel={"sleep"}
          title={"Sleep"}
          message={"You have slept: "}
          message2={"hours today"}
          needsTwoInputs={true}
          graphyAxis={"minutes"}
        />
      </div>
    );
  }
}

export default Sleep;
