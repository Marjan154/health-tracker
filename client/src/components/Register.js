import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import styles from "../Styling/Login.css";
import Footer from "./Footer";

class Reg extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      password2: "",
      hidden: true,
      redirect: false
    };

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePass = this.onChangePass.bind(this);
    this.onChangePass2 = this.onChangePass2.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeEmail = event => {
    this.setState({ email: event.target.value });
  };

  onChangePass = event => {
    this.setState({ password: event.target.value });
  };

  onChangePass2 = event => {
    this.setState({ password2: event.target.value });
  };

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }

  createUser(userAlreadyExist){
    if(userAlreadyExist==false){
      const data = {
        email: this.state.email,
        password: this.state.password
      };
      let url = "http://localhost:5000/api/users/create";
      axios
        .post(url, data)
        .then(res => {
          console.log(res.data)
          console.log("yes");
          this.setState({ redirect: true });
        })
        .catch(error => {
          console.log(error);
          alert("User already exists.");
        });
    }
  }

  onSubmit = async event => {
    event.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password
    };
    let userAlreadyExist;
    console.log(data);
    let url = "http://localhost:5000/api/users/find";
    axios
      .get(url, {
        params: {
          email: this.state.email,
        }
      })
      .then(res => {
        console.log(res.data)
        if(res.data.count!=0){
          userAlreadyExist=true;
          alert("User already exists.");
        }
        else{
          userAlreadyExist=false;
          this.createUser(userAlreadyExist)
        }
        console.log(userAlreadyExist)
        // console.log("yes");
        // this.setState({ redirect: true });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <div className = "titleName" style={{paddingTop:"70px"}}>
          <img id="mainlogo" src={require("../Images/logo.png")}></img>
          <span>Health Tracker</span>
          
        </div>
        <div id="loginform">
          <div
            className="container login-container"
            style={{ marginTop: "2%", marginBottom: "5%" }}
          >
            <form onSubmit={this.onSubmit}>
              <h3
                style={{
                  textAlign: "center",
                  marginBottom: "5%",
                  fontSize: "50px"
                }}
              >
                Register
              </h3>
              <div className="form-group">
                <label style={{ fontWeight: "bold" }} for="email1">
                  Email:
                </label>
                <input
                  className="form-control"
                  type="text"
                  required
                  id="email1"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                />
              </div>
              <div className="form-group">
                <label style={{ fontWeight: "bold" }} for="pw">
                  Password:
                </label>
                <input
                  className="form-control"
                  type={this.state.hidden ? "password" : "text"}
                  required
                  id="pw"
                  value={this.state.password}
                  onChange={this.onChangePass}
                />
              </div>
              <div className="form-group">
                <label style={{ fontWeight: "bold" }} for="pw2">
                  Re-enter Password:
                </label>
                <input
                  className="form-control"
                  type={this.state.hidden ? "password" : "text"}
                  required
                  id="pw2"
                  value={this.state.password2}
                  onChange={this.onChangePass2}
                />
              </div>
              <div className="form-group text-center">
                <input
                  className="btn btn-primary btn-lg #1e1e6e"
                  type="submit"
                  value="Register"
                  style={{ backgroundColor: "#1e1e6e" }}
                />
              </div>
              <Link
                className="nav-link"
                to={`/`}
                style={{ textAlign: "center" }}
              >
                Login
              </Link>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Reg;

/* 
*** Email validation check, omitted for now
<input className="form-control" type= "email" required id= "email1" pattern="[a-zA-Z0-9.-_]{1,}@[a-zA-Z0-9.-]{2,}[.]{1}[a-zA-Z]{2,}" value= {this.state.email} onChange= {this.onChangeEmail} />

*** Password validation check, omitted for now
<input className="form-control" type= {this.state.hidden ? "password": "text"} required id= "pw" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" value= {this.state.password} onChange= {this.onChangePass} />
<small className="form-text text-white">Password has to contain a <b>lowercase</b> letter, <b>uppercase</b> letter, a <b>number</b>, and it must be a <b>minimum of 8 characters</b></small>
*/
