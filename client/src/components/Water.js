import React, { Component, useState } from "react";
import DatePicker from "react-datepicker";
import Nav from "./Nav.js";
import Graph from "./graph.js";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import styles from "../Styling/Grid.css";
import moment from "moment";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddModal from "./AddModal.js";
import WaterDay from "./WaterDay";

class Water extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.match.params.email,
      waterLogs: [],
      water: 0,
      startDate: new Date(),
      totalDrankToday: 0
    };
  }

  componentDidMount() {
    this.setState({ startDate: new Date() });
    // this.getTotalForADate().then(data => {
    //   this.setState({ waterLogs: data });
    // });

    this.getTotalForADate(new Date()).then(data => {
      console.log(data);
    });
  }

  getTotalForADate = date => {
    const param = date
      ? { email: this.state.email, date: date }
      : { email: this.state.email };
    let url = "http://localhost:5000/api/water/groupbyday";
    let data = axios
      .get(url, {
        params: param
      })
      .then(res => {
        console.log(res.data);
        return res.data;
      })
      .catch(error => {
        console.log(error);
      });
    console.log(data);
    return data;
  };

  handleDateChange = date => {
    // this.setState({ startDate: date, waterLogs: this.getTotalForADate(date) });
  };

  handleFormChange = date => {
    this.setState({ startDate: date });
  };

  inputHandler = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  addLog = e => {
    e.preventDefault();
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
      })
      .catch(error => {
        console.log(error);
      });
  };

  refresh = () => {
    console.log("refreshing");
    this.getTotalForADate();
  };

  render() {
    let records =
      this.state.waterLogs &&
      this.state.waterLogs.map(waterlog => {
        return (
          <tr key={waterlog.date}>
            <td>{waterlog.total}</td>
            <td>{waterlog.date}</td>
            <td>
              <AddModal
                form={
                  <div>
                    {<WaterDay date={waterlog.date} email={this.state.email} />}
                  </div>
                }
                label={"View"}
                title={`Water log for ${waterlog.date}`}
                refresh={this.refresh}
              />
            </td>
          </tr>
        );
      });

    let addForm = (
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
              style={{ backgroundColor: "#47a02c" }}
            />
          </div>
        </form>
      </div>
    );

    return (
      <div>
        <Nav />
        <div>
          <div className="grid-container" style={{ paddingTop: "150px" }}>
            <div
              style={{
                width: "35em",
                height: "500px",
                boxShadow: "4px 4px 5px grey"
              }}
            >
              {/* <Graph email={this.props.match.params.email} /> */}
            </div>
            <div
              style={{
                width: "35em",
                height: "500px",
                boxShadow: "4px 4px 5px grey",
                padding: "50px"
              }}
            >
              <h1 style={{ color: "#47a02c" }}>
                You have drank: {this.state.totalDrankToday} oz today
              </h1>
              <AddModal
                form={addForm}
                label={"Add log"}
                title={"Add Water Log"}
                refresh={this.refresh}
              />
            </div>

            <div style={{ padding: "50px" }}>
              Choose Date:
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleDateChange}
              />
              <h3
                className="text-dark"
                style={{
                  fontSize: "3em",
                  marginTop: "1%",
                  textAlign: "center"
                }}
              >
                {this.state.startDate.toDateString()}
              </h3>
              <button
                className="btn btn-primary"
                style={{ backgroundColor: "#47a02c" }}
                onClick={() => this.getTotalForADate()}
              >
                View All
              </button>
            </div>

            <div>
              <table
                className="datatable"
                style={{
                  width: "85vw",
                  boxShadow: "4px 4px 5px grey"
                }}
              >
                <thead className="thead-light">
                  <tr>
                    <th>Water</th>
                    <th>Date</th>
                    <th>View</th>
                  </tr>
                </thead>
                <tbody>{records}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Water;
