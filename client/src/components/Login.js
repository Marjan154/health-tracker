import React, { Component } from "react";
import { Redirect, Link, withRouter } from "react-router-dom";
import axios from "axios";
import styles from "../Styling/Login.css";
import { connect } from "react-redux";
import { setUser } from "../store/user";
import Footer from "./Footer";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      hidden: true,
      redirect: false
    };

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePass = this.onChangePass.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }

  onChangeEmail = event => {
    this.setState({ email: event.target.value });
  };

  onChangePass = event => {
    this.setState({ password: event.target.value });
  };

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }

  onSubmit = event => {
    event.preventDefault();
    // const data = this.state;
    console.log(this.state.email);
    let url = "http://localhost:5000/api/users/login";
    axios
      .get(url, {
        params: {
          email: this.state.email
        }
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
        const data = res.data;
        if (
          this.state.email === data.email &&
          this.state.password === data.password
        ) {
          this.props.setUser(res.data);
          this.props.history.push(`/home/${this.state.email}`);
          this.setState({ redirect: true });
        } else {
          alert("User does not exist or is wrong");
          console.log("user not found");
        }
      })
      .catch(error => {
        console.log(error);
      });
    //needs to check with backend
  };

  //need to add the :id part
  render() {
    if (this.state.redirect) {
      return <Redirect to="/home" />;
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
                Log In
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

              <div className="form-group text-center">
                <input
                  className="btn btn-primary btn-lg #1e1e6e"
                  type="submit"
                  value="Log In"
                  style={{ backgroundColor: "#1e1e6e" }}
                />
              </div>
              <Link
                className="nav-link"
                to={`/register`}
                style={{ textAlign: "center" }}
              >
                Register
              </Link>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    setUser: user => {
      const content = { user };
      dispatch(setUser(content));
    }
  };
};

export default withRouter(connect(null, mapDispatch)(Login));

/* 
*** Email validation check, omitted for now
<input className="form-control" type= "email" required id= "email1" pattern="[a-zA-Z0-9.-_]{1,}@[a-zA-Z0-9.-]{2,}[.]{1}[a-zA-Z]{2,}" value= {this.state.email} onChange= {this.onChangeEmail} />

*** Password validation check, omitted for now
<input className="form-control" type= {this.state.hidden ? "password": "text"} required id= "pw" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" value= {this.state.password} onChange= {this.onChangePass} />
*/
