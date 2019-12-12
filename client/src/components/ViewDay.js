import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import styles from "../Styling/Grid.css";
import moment from "moment";
import Modal from "./Modal";

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
    const { healthlabel } = this.props;
    let url = `http://localhost:5000/api/${healthlabel}/bydate`;
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
    const { healthlabel } = this.props;
    let deletelog = `http://localhost:5000/api/${healthlabel}/delete`;
    axios
      .delete(deletelog, {
        params: { id }
      })
      .then(res => {
        this.filteredByDate(date);
      })
      .catch(error => {
        console.log(error);
      });
  };

  updatelog = (id, amount) => {
    const { healthlabel } = this.props;
    let updatelogURL = `http://localhost:5000/api/${healthlabel}/update`;
    axios
      .put(updatelogURL, {
        id,
        amount
      })
      .then(res => {})
      .catch(error => {
        console.log(error);
      });
  };

  refresh = () => {
    this.filteredByDate(this.props.date);
  };

  inputHandler = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    let updateForm = id => {
      return (
        <div>
          <form
            className="col-md-4 mb-3"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "2%"
            }}
            onSubmit={e => {
              e.preventDefault();
              this.updatelog(id, this.state.amount);
            }}
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
                value="Update Water Log"
                className="btn btn-primary"
                style={{ backgroundColor: "#91b0ff" }}
              />
            </div>
          </form>
        </div>
      );
    };

    let records = this.state.logs.map(log => {
      return (
        <tr key={log.id}>
          <td>{log.amount}</td>
          <td>{log.date}</td>
          <td>
            <Modal
              form={updateForm(log.id)}
              label={"Update"}
              title={`Update Amount`}
              refresh={this.refresh}
            />
          </td>
          <td>
            <button
              className="btn btn-primary"
              style={{ backgroundColor: "#91b0ff" }}
              onClick={() => this.deleteLog(log.id, log.date)}
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
            <th>{this.props.title}</th>
            <th>Date</th>
            <th colspan="2">Edit</th>
          </tr>
        </thead>
        <tbody>{records}</tbody>
      </table>
    );
  }
}

export default ViewDay;
