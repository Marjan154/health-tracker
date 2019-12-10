import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import styles from "../Styling/Grid.css";
import moment from "moment";

class ViewDay extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.data;
  }

  componentDidMount() {
    this.setState({ date: new Date() }, () => {
      this.filteredByDate(this.props.date);
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
        this.setState({ logs: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteLog = (id, date) => {
    let deletelog = "http://localhost:5000/api/water/delete";
    axios
      .delete(deletelog, {
        params: {
          waterlogid: id
        }
      })
      .then(res => {
        this.filteredByDate(date);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    let records = this.state.logs.map(waterlog => {
      console.log("log", waterlog);
      return (
        <tr key={waterlog.waterlogid}>
          <td>{waterlog.amount}</td>
          <td>{waterlog.date}</td>
          <td>
            <button
              className="btn btn-primary"
              style={{ backgroundColor: "#47a02c" }}
              onClick={() => this.deleteLog(waterlog.waterlogid, waterlog.date)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });

    return (
      <table
        className="datatable"
        style={{
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
    );
  }
}

export default ViewDay;
