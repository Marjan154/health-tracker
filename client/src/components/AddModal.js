import React, { Component, useState } from "react";
import DatePicker from "react-datepicker";
import Nav from "./Nav.js";
import Graph from "./graph.js";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import styles from "../Styling/Grid.css";
import moment from "moment";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

class AddModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   email: this.props.match.params.email,
      water: 0,
      startDate: new Date()
    };
  }
  example = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          {this.props.label}
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body> {this.props.form}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  render() {
    return <this.example />;
  }
}

export default AddModal;
