import React, { Component, useState } from "react";
import DatePicker from "react-datepicker";
import Nav from "./Nav.js";
import Graph from "./graph.js";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import styles from "../Styling/Grid.css";
import moment from "moment";
import { Button, Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";
import AddModal from "./AddModal.js"

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
    this.setState({ startDate: new Date() }, () => {
      console.log("Today is "+ this.state.startDate)
      this.getTotalForADate();
    })
  }

  // getTotalForAllDates(){
  //   let url = "http://localhost:5000/api/water/groupbyday";
  //   axios
  //     .get(url, {
  //       params: {
  //         email: this.state.email
  //       }
  //     })
  //     .then(res => {
  //       this.setState({ waterLogs: res.data }, ()=>{
  //         console.log(this.state.waterLogs)
  //       });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  //     // this.getCurrentDayTotal();
  //   // this.getAllDate()
  // }

  getTotalForADate=date=>{
    console.log("You selected " + date)
    // const{email, date}=req.query
    const param=date?{email: this.state.email, date: date}:{email: this.state.email}
    let url = "http://localhost:5000/api/water/groupbyday";
    axios
      .get(url, {
        params: param
        // {
        //   email: this.state.email,
        //   date: date
        // }
      })
      .then(res => {
        this.setState({ waterLogs: res.data }, ()=>{
          console.log(this.state.waterLogs)
        });
      })
      .catch(error => {
        console.log(error);
      });
      // this.getCurrentDayTotal();
    // this.getAllDate()
  }

  // getCurrentDayTotal(){
  //   console.log("Date" + new Date())
  //   console.log(this.state.startDate)
  //   let url = "http://localhost:5000/api/water/sumofaday";
  //     axios
  //       .get(url, {
  //         params: {
  //           email: this.state.email,
  //           date: new Date()
  //         }
  //       })
  //       .then(res => {
  //         console.log(res.data);
  //         console.log(res.data);
  //         let records = res.data.map(element => {
  //           this.setState({ totalDrankToday: element.total }, () => {
  //             console.log("you drank "+ this.state.totalDrankToday + " oz today")
  //           });
  //         })
          
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //     // this.getAllDate()
  // }

  // getAllDate() {
  //   let url = "http://localhost:5000/api/water/all";
  //   axios
  //     .get(url, {
  //       params: {
  //         email: this.state.email
  //       }
  //     })
  //     .then(res => {
  //       this.setState({ waterLogs: res.data });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  // filteredByDate(date) {
  //   let url = "http://localhost:5000/api/water/bydate";
  //   axios
  //     .get(url, {
  //       params: {
  //         email: this.state.email,
  //         date: moment(date).format("YYYY-MM-DD")
  //       }
  //     })
  //     .then(res => {
  //       this.setState({ waterLogs: res.data });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  handleChange = date => {
    this.setState({ startDate: date }, ()=> { 
      this.getTotalForADate(date);
    })

    // this.filteredByDate(date);
  }

  // addLog() {
  //   console.log(this.amount);
  //   console.log(this.state.startDate);
  //   console.log(moment(this.state.startDate).format("YYYY-MM-DD"));
  //   let url = "http://localhost:5000/api/water/add";
  //   const data = {
  //     amount: this.state.amount,
  //     email: this.props.match.params.email,
  //     date: moment(this.state.startDate).format("YYYY-MM-DD")
  //   };
  //   console.log(this.state.amount);

  //   axios
  //     .post(url, data)
  //     .then(res => {
  //       console.log(res);
  //       console.log(res.data);
  //       alert("Succesfully ADDED");
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }
  //need to add the :id to home url
  render() {
    //console.log(this.state.startDate);
    let records = this.state.waterLogs.map(waterlog => {
      return (
        <tr key={waterlog.date}>
          <td>{waterlog.total}</td>
          <td>{waterlog.date}</td>
          <td>
            <Link to={`/water/${waterlog.date}/${this.state.email}`}>View</Link>
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
              <h1 style={{ color: "#47a02c" }}> You have drank: {this.state.totalDrankToday} oz today</h1>
              <AddModal/>
              {/* <button className="addbutton" onClick={() => this.addLog}>
                Add Log
              </button> */}
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
            <button onClick={()=>this.getTotalForADate()}>View All</button>
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
