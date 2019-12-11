import React, { Component } from "react";
import DatePicker from "react-datepicker";
import Nav from "./Nav.js";
import Graph from "./graph.js";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import styles from "../Styling/Grid.css";
import moment from "moment";
import Modal from "./Modal";
import ViewDay from "./ViewDay";

class ViewData extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.data;
  }

  componentDidMount() {
    this.setState({ startDate: new Date() });
    this.getAllDate();

    this.getTotalForADate(new Date()).then(data => {
      console.log("Data: " + data);
      this.setState({ totalToday: data[0] ? data[0].total : 0 });
    });
  }

  getAllDate = () => {
    this.getTotalForADate().then(data => {
      this.setState({ logs: data }, () => {
        console.log("Data: " + this.state.logs);
      });
    });
  };

  getTotalForADate = date => {
    const param = date
      ? { email: this.state.email, date: date }
      : { email: this.state.email };

    const { healthlabel } = this.props;
    let url = `http://localhost:5000/api/${healthlabel}/groupbyday`;
    let data = axios
      .get(url, {
        params: param
      })
      .then(res => {
        return res.data;
      })
      .catch(error => {
        console.log(error);
      });
    return data;
  };

  handleDateChange = date => {
    this.getTotalForADate(date).then(data => {
      this.setState({ startDate: date, logs: data });
    });
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
    const { healthlabel, needsTwoInputs } = this.props;
    let amount;
    if (needsTwoInputs) {
      const { hours, minutes } = this.state;
      amount = parseInt(hours) * 60 + parseInt(minutes);
    }
    let url = `http://localhost:5000/api/${healthlabel}/add`;
    const data = {
      amount: needsTwoInputs ? amount : this.state.amount,
      email: this.state.email,
      date: moment(this.state.startDate).format("YYYY-MM-DD")
    };
    console.log(this.state.amount);

    axios
      .post(url, data)
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  refresh = () => {
    this.getAllDate();
    this.getTotalForADate(new Date()).then(data => {
      this.setState({ totalToday: data[0] ? data[0].total : 0 });
    });
  };

  minutesToHoursTimeString = mins => {
    let hours = Math.floor(mins / 60);
    let minutes = mins % 60;

    return `${hours} hour${hours > 1 && "s"} and ${minutes} minute${minutes >
      1 && "s"} `;
  };

  render() {
    const { healthlabel, needsTwoInputs } = this.props;
    let records =
      this.state.logs &&
      this.state.logs.map(log => {
        return (
          <tr key={log.date}>
            <td>
              {needsTwoInputs
                ? this.minutesToHoursTimeString(log.total)
                : log.total}
            </td>
            <td>{log.date}</td>
            <td>
              <Modal
                form={
                  <div>
                    {
                      <ViewDay
                        date={log.date}
                        data={this.state}
                        healthlabel={healthlabel}
                      />
                    }
                  </div>
                }
                label={"View"}
                title={`Water log for ${log.date}`}
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
            <label style={{ fontWeight: "bold" }}>
              {this.props.needsTwoInputs ? "" : "Amount (oz):"}{" "}
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              name={this.props.needsTwoInputs ? "hours" : "amount"}
              pattern="[0-9]*"
              onChange={this.inputHandler}
            />
          </div>
          {this.props.needsTwoInputs && (
            <div className="form-group">
              <label style={{ fontWeight: "bold" }}>Minutes </label>
              <input
                type="text"
                className="form-control form-control-lg"
                name={"minutes"}
                pattern="[0-9]*"
                onChange={this.inputHandler}
              />
            </div>
          )}

          <div className="form-group">
            <input
              type="submit"
              value="Add to Water Log"
              className="btn btn-primary"
              style={{ backgroundColor: "#91b0ff" }}
            />
          </div>
        </form>
      </div>
    );

    const form = this.props.addSleepLogForm
      ? this.props.addSleepLogForm
      : addForm;
    return (
      <div>
        <Nav />
        <div className="banner">
          <div className="grid-container" style={{ paddingTop: "150px" }}>
            <h1
              style={{
                width: "100vw",
                paddingBottom: "50px",
                color: "#1e1e6e",
                fontSize: "60px"
              }}
            >
              {this.props.title}
            </h1>
            <div
              style={{
                width: "50em",
                height: "500px",
                boxShadow: "4px 4px 5px grey"
              }}
            >
              <Graph email={this.state.email} healthlabel={healthlabel} />
            </div>
            <div
              style={{
                width: "20em",
                height: "500px",
                // boxShadow: "4px 4px 5px grey",
                padding: "50px"
              }}
            >
              <h1 style={{ color: "#1e1e6e", paddingTop: "60px" }}>
                {this.props.message}
                {this.props.needsTwoInputs
                  ? this.minutesToHoursTimeString(this.state.totalToday)
                  : this.state.totalToday}
                {this.props.message2}
              </h1>
              <Modal
                form={form}
                label={"Add log"}
                title={`Add Water Log`}
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
                style={{ backgroundColor: "#245db3" }}
                onClick={() => this.getAllDate()}
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
                    <th>{healthlabel}</th>
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

export default ViewData;
