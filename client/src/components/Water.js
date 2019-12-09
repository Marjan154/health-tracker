import React, { Component } from "react";
import DatePicker from "react-datepicker";
import Nav from "./Nav.js";
import Graph from "./graph.js";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import styles from "../Styling/Grid.css";
import moment from "moment";

class Water extends Component {
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
      this.getAllDate()
    });
    
  }

  getAllDate(){
    let url = "http://localhost:5000/api/water/all";
    axios
      .get(url, {
        params: {
          email: this.state.email,
        }
        
      })
      .then(res => {
        this.setState({ waterLogs: res.data });
      })
      .catch(error => {
        console.log(error);
      });

  }

  filteredByDate(date) {
    let url = "http://localhost:5000/api/water/bydate";
    axios
      .get(url, {
        params: {
          email: this.state.email,
          date: moment(date).format('YYYY-MM-DD')
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

  getDate() {
    var tempDate = this.state.startDate;
    var date;
    if (tempDate.getDate() < 10) {
      date =
        tempDate.getFullYear() +
        "-" +
        (tempDate.getMonth() + 1) +
        "-0" +
        tempDate.getDate();
    } else {
      date =
        tempDate.getFullYear() +
        "-" +
        (tempDate.getMonth() + 1) +
        "-" +
        tempDate.getDate();
    }
    return <span>{date}</span>;
  }

  //need to add the :id to home url
  render() {
    console.log(this.state.startDate);
    let records = this.state.waterLogs.map(waterlog => {
      return (
        <tr>
          <td>{waterlog.amount}</td>
          <td>{waterlog.date}</td>
          <td>Edit</td>
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
              <button className="addbutton">Add Log</button>
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
                {this.getDate()}
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

export default Water;
