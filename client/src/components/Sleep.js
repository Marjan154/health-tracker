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
      totalDrankToday: 0
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
          addSleepLogForm={
            <div>
              <DatePicker
              selected={this.state.startDate}
              onChange={this.handleFormChange}
            />
              <form
              className="col-md-4 mb-3"
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "2%"
              }}
              onSubmit={this.addLog}
              >
          <div className="form-group">
            <label style={{ fontWeight: "bold" }}>Hours: </label>
            <input
              type="text"
              className="form-control form-control-lg"
              name={"hours"}
              pattern="[0-9]*"
              onChange={this.inputHandler}
            />
          </div>

          <div className="form-group">
            <label style={{ fontWeight: "bold" }}>Minutes: </label>
            <input
              type="text"
              className="form-control form-control-lg"
              name={"minute"}
              pattern="[0-9]*"
              onChange={this.inputHandler}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Add to Water Log"
              className="btn btn-primary"
              style={{ backgroundColor: "#47a02c" }}
            />
          </div>
        </form>
      </div>
          }
        />
      </div>
    );
  }
}

export default Sleep;