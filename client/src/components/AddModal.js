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


class AddModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
        //   email: this.props.match.params.email,
          water: 0,
          startDate: new Date(),
        };
      }

    example() {
        const [show, setShow] = useState(false);
      
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
      
        return (
          <>
            <Button variant="primary" onClick={handleShow}>
              Add Log
            </Button>
      
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Water Log</Modal.Title>
              </Modal.Header>
              <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        );
      }
      
    render(){
        return(
            <this.example/>
        )
    }
}

export default AddModal;