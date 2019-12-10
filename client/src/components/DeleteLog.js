import React, { Component } from "react";
import Nav from "./Nav.js";
import axios from "axios";
import { isThisMonth } from "date-fns";

export default class DeleteLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      waterLogs: [],
      water: 0,
      startDate: new Date()
    };
    //   this.deleteLog = this.deleteLog.bind(this);
  }

  fetchData() {
    console.log("Fetching Data");
    console.log(this.props.match.params.email);
    let url = "http://localhost:5000/api/water/all";
    axios
      .get(url, {
        params: {
          // email: this.props.user.email
          email: this.props.match.params.email
        }
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
        const data = res.data;
        this.setState({ waterLogs: res.data });
        // alert("Succesfully retrieved");
        // this.setState({ redirect: true });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.setState({ date: new Date() });
    this.fetchData();
  }
  removeRow = (event, id) => {
    event.preventDefault();
    console.log("hello");
    console.log(id);
    let deletelog = "http://localhost:5000/api/water/delete";
    axios
      .delete(deletelog, {
        params: {
          // email: this.props.user.email
          waterlogid: id
        }
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.fetchData();
      })
      .catch(error => {
        console.log(error);
      });
  };

  getDate() {
    const { startDate } = this.state;
    return <span>{startDate.toLocaleDateString()}</span>;
  }

  inputHandler = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    console.log(this.state.waterLogs);
    let records = this.state.waterLogs.map(waterlog => {
      return (
        <tr key={waterlog.waterlogid}>
          <td>{waterlog.amount}</td>
          <td>{waterlog.date}</td>
          <td>
            <button
              onClick={event => this.removeRow(event, waterlog.waterlogid)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });

    return (
      <div className="edit-log">
        <Nav />
        <div
          className="text-center"
          style={{ marginTop: "1%", fontSize: "2em" }}
        >
          <h3>Delete From Water Log</h3>
          <h3>Today's Date: {this.getDate()}</h3>
        </div>

        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Water</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>{records}</tbody>
        </table>
      </div>
    );
  }
}
