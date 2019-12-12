import React, { Component } from "react";
import styles from "../Styling/Home2.css";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import axios from "axios";
import Footer from "./Footer";

class Home extends Component {
  state = {
    email: this.props.match.params.email,
    waterTotalToday: 0,
    sleepTotalToday: 0,
    calorieTotalToday: 0
  };

  componentDidMount() {
    this.getTotalForADate(new Date(), "water").then(data => {
      console.log("Data: " + data);
      this.setState({ waterTotalToday: data[0] ? data[0].total : 0 });
    });
    this.getTotalForADate(new Date(), "sleep").then(data => {
      console.log("Data: " + data && data[0]);
      this.setState({ sleepTotalToday: data[0] ? data[0].total : 0 });
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

  minutesToHoursTimeString = mins => {
    let m = parseInt(mins);
    let hours = Math.floor(m / 60);
    let minutes = m % 60;

    return `${hours} hour${hours > 1 && "s"} and ${minutes} minute${minutes >
      1 && "s"} `;
  };

  render() {
    const email = this.props.match.params.email;
    const d = new Date(Date.now());
    return (
      <div>
        <Nav />
        <div className="banner">
          <div
            className="grid-container"
            style={{ paddingTop: "70px", paddingBottom: "50px" }}
          >
            <h1
              id="homeTitle"
              style={{
                paddingBottom: "20px"
              }}
            >
              Welcome {email} !
            </h1>

            <h2
              style={{
                color: "#1e1e6e",
                width: "100vw",
                paddingBottom: "20px"
              }}
            >
              {d.toDateString()}.
              <br />
              You are doing great today! Don't forget to log your daily stats.
            </h2>

            <div className="stats">
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
                    <h3 style={{ color: "#1e1e6e" }}>
                      {this.state.calorieTotalToday} calories
                    </h3>
                  </div>
                </div>
              </Link>

              <Link to={`/water/${email}`} style={{ textDecoration: "none" }}>
                <div className="stat">
                  <div>
                    <img
                      src={require("../Images/drop.png")}
                      style={{ padding: "20px" }}
                      className="p-icon"
                    ></img>
                    <h1>Water</h1>
                    <h3 style={{ color: "#1e1e6e" }}>
                      {this.state.waterTotalToday} oz
                    </h3>
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
                    <h3 style={{ color: "#1e1e6e" }}>
                      {this.minutesToHoursTimeString(
                        this.state.sleepTotalToday
                      )}
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Home;

{
  /* <div className="summary">
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
          </div> */
}
