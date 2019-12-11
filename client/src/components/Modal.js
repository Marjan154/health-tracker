import React, { Component, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Modal } from "react-bootstrap";

class MyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      water: 0,
      startDate: new Date()
    };
  }
  genericModal = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => {
      setShow(false);
      this.props.refresh();
    };
    const handleShow = () => setShow(true);

    return (
      <>
        <Button
          variant="primary"
          onClick={handleShow}
          style={{ backgroundColor: "#1e1e6e" }}
        >
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
    return <this.genericModal />;
  }
}

export default MyModal;
