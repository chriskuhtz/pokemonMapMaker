import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
} from "reactstrap";

class DeleteModal extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.action = this.action.bind(this);
    this.state = {
      modal: false,
    };
  }

  toggle() {
    this.setState((state) => ({
      modal: !state.modal,
    }));
  }
  action() {
    this.setState({ modal: false });
    this.props.deleteMap(this.props.name);
  }

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>
          Delete
        </Button>
        <Modal isOpen={this.state.modal} backdrop={false} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Load a Map</ModalHeader>
          <ModalBody>
            Are you certain you want to delete the map:
            <p>{this.props.name}</p>
          </ModalBody>
          <ModalFooter>
            <Row>
              <Col>
                <Button color="secondary" onClick={this.toggle}>
                  No
                </Button>
              </Col>
              <Col>
                <Button color="primary" onClick={this.action}>
                  Yes
                </Button>
              </Col>
            </Row>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default DeleteModal;
