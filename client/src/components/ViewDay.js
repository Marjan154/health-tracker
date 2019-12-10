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
    let updatelogURL = "http://localhost:5000/api/water/update";
    axios
      .put(updatelogURL, {
        waterlogid: id,
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
      console.log("clickked");
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
                style={{ backgroundColor: "#47A02C" }}
              />
            </div>
          </form>
        </div>
      );
    };

    let records = this.state.logs.map(waterlog => {
      return (
        <tr key={waterlog.id}>
          <td>{waterlog.amount}</td>
          <td>{waterlog.date}</td>
          <td>
            <button
              className="btn btn-primary"
              style={{ backgroundColor: "#47a02c" }}
              onClick={() => this.deleteLog(waterlog.id, waterlog.date)}
            >
              Delete
            </button>
          </td>
          <td>
            <Modal
              form={updateForm(waterlog.id)}
              label={"Update"}
              title={`Update Amount`}
              refresh={this.refresh}
            />
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
