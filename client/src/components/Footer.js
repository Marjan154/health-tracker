import React, { Component } from "react";
//import "../Styling/Footer.css";

class Footer extends Component {
  render() {
    return (
      <footer
        // className="py-2 bg-dark text-light"
        style={{
          bottom: 0,
          position: "fixed",
          width: "100%",
          height: "100px",
          backgroundColor: "#1e1e6e",
          color: "white"
        }}
      >
        <div className="container text-center">
          <span>
            Created by: Marjan Ansar, Mathew Estrella, Xiangmin Mo, Yi Tong Ni
          </span>
        </div>
      </footer>
    );
  }
}

export default Footer;
