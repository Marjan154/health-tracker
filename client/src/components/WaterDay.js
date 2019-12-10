import React, { Component } from "react";
import DatePicker from "react-datepicker";
import Nav from "./Nav.js";
import Graph from "./graph.js";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import styles from "../Styling/Grid.css";
import moment from "moment";
import { Link } from "react-router-dom";

class WaterDay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.match.params.email,
      waterLogs: [],
      water: 0,
      startDate: new Date()
    };
  }

  componentDidMount() {
    this.setState({ date: new Date() }, () => {
      let url = "http://localhost:5000/api/water/groupbyday";
      this.filteredByDate(this.props.match.params.date);
    });
  }

  filteredByDate(date) {
    let url = "http://localhost:5000/api/water/bydate";
    axios
      .get(url, {
        params: {
          email: this.state.email,
          date: moment(date).format("YYYY-MM-DD")
        }
      })
      .then(res => {
        this.setState({ waterLogs: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange = date => {
    this.setState({ startDate: date });
    this.filteredByDate(date);
  };

  addLog() {
    console.log(this.amount);
    console.log(this.state.startDate);
    console.log(moment(this.state.startDate).format("YYYY-MM-DD"));
    console.log();
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
  }
  //need to add the :id to home url
  render() {
    console.log(this.state.startDate);
    let records = this.state.waterLogs.map(waterlog => {
      return (
        <tr key={waterlog.date}>
          <td>{waterlog.amount}</td>
          <td>{waterlog.date}</td>
          <td>
            <Link to={`water/${waterlog.date}/${this.state.email}`}></Link>
          </td>
        </tr>
      );
    });

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
              <Graph email={this.props.match.params.email} />
            </div>
            <div
              style={{
                width: "35em",
                height: "500px",
                boxShadow: "4px 4px 5px grey",
                padding: "50px"
              }}
            >
              <h1 style={{ color: "#47a02c" }}> You have drank: 34 oz today</h1>
              <button className="addbutton" onClick={() => this.addLog}>
                Add Log
              </button>
            </div>

            <div style={{ padding: "50px" }}>
              Choose Date:
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
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
                    <th>Edit</th>
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

export default WaterDay;