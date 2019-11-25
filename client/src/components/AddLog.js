import React, { Component } from "react";
import Nav from "./Nav.js";
import "../Styling/EditLog.css";
import "react-datepicker/dist/react-datepicker.css";

export default class EditLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      startDate: new Date()
    };
  }

  getDate() {
    const { startDate } = this.state;
    return <span>{startDate.toLocaleDateString()}</span>;
  }

  inputHandler = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit(e) {
    e.preventDefault();
    window.location = "/home";
  }

  render() {
    return (
      <div className="edit-log">
        <Nav />
        <div
          className="text-center"
          style={{ marginTop: "1%", fontSize: "2em" }}
        >
          <h3>Add to Water Log</h3>
          <h3>Today's Date: {this.getDate()}</h3>
        </div>
        <form
          className="col-md-4 mb-3"
          style={{ marginLeft: "auto", marginRight: "auto", marginTop: "2%" }}
          onSubmit={this.onSubmit}
        >
          <div className="form-group">
            <label style={{ fontWeight: "bold" }}>Amount (oz): </label>
            <input
              type="text"
              className="form-control form-control-lg"
              name={"amount"}
              pattern="[0-9]*"
              onChange={this.inputHandler}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Add to Water Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
