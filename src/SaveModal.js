import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";

class SaveModal extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.save = this.save.bind(this);
    this.state = {
      modal: false,
      name: this.props.name,
      warning: "",
    };
  }

  nameChange(event) {
    this.setState({ name: event.target.value });
    this.setState({ warning: "" });
  }
  toggle() {
    this.setState((state) => ({
      name: this.props.name,
      modal: !state.modal,
    }));
  }
  save(name, tilemap) {
    this.setState({ modal: false });
    this.props.save(name, tilemap);
  }

  render() {
    return (
      <div>
        <Button
          disabled
          style={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}
          outline
          color="success"
          onClick={this.toggle}
        >
          Save Map
        </Button>
        <Modal isOpen={this.state.modal} backdrop={false} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Save Your Map</ModalHeader>
          <ModalBody>
            <InputGroup>
              <InputGroupAddon addonType="prepend">Name:</InputGroupAddon>
              <Input value={this.state.name} onChange={this.nameChange} />
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.save(this.state.name, this.props.tilemap)}
            >
              Save
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default SaveModal;
