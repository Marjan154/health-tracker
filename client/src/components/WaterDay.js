import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import styles from "../Styling/Grid.css";
import moment from "moment";

class WaterDay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email,
      waterLogs: [],
      water: 0,
      startDate: new Date()
    };
  }

  componentDidMount() {
    this.setState({ date: new Date() }, () => {
      let url = "http://localhost:5000/api/water/groupbyday";
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
        this.setState({ waterLogs: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    let records = this.state.waterLogs.map(waterlog => {
      return (
        <tr key={waterlog.date}>
          <td>{waterlog.amount}</td>
          <td>{waterlog.date}</td>
          <td>{"Delete"}</td>
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

export default WaterDay;
