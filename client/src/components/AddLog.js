import React, { Component } from "react";
import Nav from "./Nav.js";
import "../Styling/EditLog.css";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import moment from "moment";

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

  handleChange = date => {
    this.setState({ startDate: date });
  };

  inputHandler = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(this.amount);
    console.log(this.state.startDate);
    console.log(moment(this.state.startDate).format("YYYY-MM-DD"));
    let url = "http://localhost:5000/api/water/add";
    const data = {
      amount: this.state.amount,
      email: this.props.match.params.email,
      date: moment(this.state.startDate).format("YYYY-MM-DD")
    };
    console.log(this.state.amount);

    axios
      .post(url, data)
      .then(res => {
        console.log(res);
        console.log(res.data);
        alert("Succesfully ADDED");
      })
      .catch(error => {
        console.log(error);
      });
    // window.location = "/home"//
  };

  render() {
    return (
      <div className="edit-log">
        <Nav />
        <div
          className="text-center"
          style={{ marginTop: "1%", fontSize: "2em" }}
        >
          <h3>Add to Water Log</h3>
          <span>Choose Date: </span>
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
          />
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
