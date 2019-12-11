import React, { Component } from "react";
import styles from "../Styling/Home2.css";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import axios from "axios";

class Home extends Component {
  state = { 
    email: this.props.match.params.email,
    waterTotalToday: 0,
    sleepHoursTotalToday: 0,
    sleepMinutesTotalToday: 0,
    sleepTotalToday: 0,
    calorieTotalToday: 0
  };

  componentDidMount(){
    this.getTotalForADate(new Date(), "water").then(data => {
      console.log("Data: " + data);
      this.setState({ waterTotalToday: data[0] ? data[0].total : 0 });
    });
    this.getTotalForADate(new Date(), "sleep").then(data => {
      console.log("Data: " + data);
      this.setState({ sleepTotalToday: data[0] ? data[0].total : 0 }, ()=>{
        console.log(this.state.sleepTotalToday)
        this.setState( {sleepHoursTotalToday: Math.floor(this.state.sleepTotalToday/60) }, ()=>{
          console.log(this.statesleepHoursTotalToday)
        })
        this.setState( {sleepMinutesTotalToday: this.state.sleepTotalToday%60}, ()=>{
        console.log(this.state.sleepMinutesTotalToday)
        })
      });
    });
    this.getTotalForADate(new Date(), "calories").then(data => {
      console.log("Data: " + data);
      this.setState({ calorieTotalToday: data[0] ? data[0].total : 0 });
    });

    
  }

  getTotalForADate = (date, type) => {
    const param = date
      ? { email: this.state.email, date: date }
      : { email: this.state.email };
    let url = `http://localhost:5000/api/${type}/groupbyday`;
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

  
  render() {
    const email = this.props.match.params.email;
    return (
      <div>
        <Nav />
        <div className="banner">
          <div className="grid-container" style={{ paddingTop: "70px" }}>
            <h1 id="homeTitle">Welcome {email} !</h1>
            {/* <div className="summary">
            <h1 style={{ width: "inherit" }}>Summary</h1>
            <div id="icons">
              <div>
                <img
                  src={require("../Images/drop.png")}
                  style={{ padding: "20px" }}
                  className="p-icon"
                ></img>
                <p>water</p>
              </div>

              <div>
                <img
                  src={require("../Images/taco.png")}
                  style={{ padding: "20px" }}
                  className="p-icon"
                ></img>
                <p>calories</p>
              </div>
              <div>
                <img
                  src={require("../Images/sleeping.png")}
                  style={{ padding: "20px" }}
                  className="p-icon"
                ></img>
                <p>sleep</p>
              </div>
            </div>
          </div> */}
          

            <div className="stats">
              <Link to={`/water/${email}`} style={{ textDecoration: "none" }}>
                <div className="stat">
                  <div>
                    <img
                      src={require("../Images/drop.png")}
                      style={{ padding: "20px" }}
                      className="p-icon"
                    ></img>
                    <h1>Water</h1>
                    <h1 style={{ color: "#47a02c" }}>
                        {this.state.waterTotalToday} oz
                    </h1>
                  </div>
                </div>
              </Link>

              <Link
                to={`/calories/${email}`}
                style={{ textDecoration: "none" }}
              >
                <div className="stat">
                  <div>
                    <img
                      src={require("../Images/taco.png")}
                      style={{ padding: "20px" }}
                      className="p-icon"
                    ></img>
                    <h1>Calories</h1>
                    <h1 style={{ color: "#47a02c" }}>
                        {this.state.calorieTotalToday} calories
                    </h1>
                  </div>
                </div>
              </Link>

              <Link to={`/sleep/${email}`} style={{ textDecoration: "none" }}>
                <div className="stat">
                  <div>
                    <img
                      src={require("../Images/sleeping.png")}
                      style={{ padding: "20px" }}
                      className="p-icon"
                    ></img>
                    <h1>Sleep</h1>
                    <h1 style={{ color: "#47a02c" }}>
                      {this.state.sleepHoursTotalToday} hours and {this.state.sleepMinutesTotalToday} minutes
                    </h1>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
