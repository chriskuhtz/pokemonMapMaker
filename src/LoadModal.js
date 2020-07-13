import React from "react";
import { Button, Modal, ModalHeader, ModalBody, Row, Col } from "reactstrap";
import DeleteModal from "./DeleteModal";
class LoadModal extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.getMaps = this.getMaps.bind(this);
    this.load = this.load.bind(this);
    this.deleteMap = this.deleteMap.bind(this);
    this.state = {
      modal: false,
    };
  }
  nameChange(event) {
    this.setState({ name: event.target.value });
    this.setState({ warning: "" });
  }
  toggle() {
    this.setState((state) => ({
      modal: !state.modal,
    }));
  }
  getMaps() {
    this.setState({ modal: true });
    this.props.getMaps();
  }
  load(map) {
    this.setState({ modal: false });
    console.log(map);
    //let m={name:m.name,height:m.height,width:m.width,tilemap:m.tilemap}
    this.props.loadMap(map);
  }
  deleteMap(name) {
    this.setState({ modal: false });
    this.props.deleteMap(name);
  }

  render() {
    return (
      <div>
        <Button
          disabled
          style={{
            borderRadius: 0,
            borderLeft: 0,
            borderRight: 0,
          }}
          outline
          color="light"
          onClick={this.getMaps}
        >
          Load Map
        </Button>
        <Modal isOpen={this.state.modal} backdrop={false} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Load a Map</ModalHeader>
          <ModalBody>
            {this.props.maps.map((m) => (
              <Row>
                <Col style={{ fontSize: "larger" }}>{m.name}</Col>
                <Col>
                  <Button color="primary" onClick={() => this.load(m)}>
                    Load
                  </Button>
                </Col>
                <Col>
                  <DeleteModal name={m.name} deleteMap={this.deleteMap} />
                </Col>
              </Row>
            ))}
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default LoadModal;
