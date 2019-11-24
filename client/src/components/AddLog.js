import React, { Component } from "react";

class AddLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "",
      amount: 0,
      water: 0,
      steps: 0,
      sleep: 0,
      startDate: new Date()
    };
  }

  inputHandler = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value }, () => {
      console.log(this.state);
    });
  };
  addHealthLog = () => {
    // Here we would make call addHealthLog(this.state);
  };

  render() {
    return (
      <div>
        <h1>Add Log</h1>
        <form onSubmit={this.addHealthLog}>
          <table>
            <tbody>
              <tr>
                <td> Water Intake </td>
                <td>
                  {" "}
                  <input
                    onChange={this.inputHandler}
                    type="text"
                    name="water"
                    required
                  />{" "}
                </td>
              </tr>
              <tr>
                <td> Steps </td>
                <td>
                  {" "}
                  <input
                    onChange={this.inputHandler}
                    type="text"
                    pattern="[0-9]*"
                    name="steps"
                    required
                  />{" "}
                </td>
              </tr>
              <tr>
                <td> Sleep </td>
                <td>
                  <input
                    onChange={this.inputHandler}
                    type="text"
                    pattern="[0-9]*"
                    name="sleep"
                    required
                  />{" "}
                </td>
              </tr>
              {/* <tr>
                <td> Calories </td>
                <td>
                  {" "}
                  <input
                    onChange={this.inputHandler}
                    type="text"
                    name="transaction_sub"
                    required
                  />{" "}
                </td>
              </tr>
              <tr>
                <td> Weight: </td>
                <td>
                  {" "}
                  <input
                    onChange={this.inputHandler}
                    type="text"
                    pattern="[0-9]*"
                    name="Delta"
                    required
                  />{" "}
                </td>
              </tr> */}
            </tbody>
          </table>
          <button type="submit">Add New Log</button>
        </form>
      </div>
    );
  }
}

export default AddLog;
