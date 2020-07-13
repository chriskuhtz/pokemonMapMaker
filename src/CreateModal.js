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
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

class CreateModal extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.togglenested = this.togglenested.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.heightChange = this.heightChange.bind(this);
    this.widthChange = this.widthChange.bind(this);
    this.tileChange = this.tileChange.bind(this);
    this.create = this.create.bind(this);
    this.save = this.save.bind(this);
    this.state = {
      modal: false,
      nestmodal: false,
      tile: { type: "tile", name: "Lawn", style: "singular" },
      height: "",
      width: "",
      name: "",
      warning: "",
      nestedWarning: "",
    };
  }

  nameChange(event) {
    this.setState({ name: event.target.value });
    this.setState({ warning: "" });
  }
  heightChange(event) {
    this.setState({ height: event.target.value });
    console.log("new Height:", this.state.height);
  }
  widthChange(event) {
    this.setState({ width: event.target.value });
    console.log("new Width:", this.state.width);
  }
  tileChange(t) {
    this.setState({ tile: t });
    console.log("new tile:", this.state.tile);
  }
  create() {
    if (this.state.height < 1) {
      this.setState({ warning: "Map needs a Height" });
      return;
    }
    if (this.state.width < 1) {
      this.setState({ warning: "Map needs a Width" });
      return;
    }
    if (this.state.width > 200 || this.state.width > 200) {
      this.setState({ warning: "Maximum Map Size right now is 200x200" });
      return;
    }
    if (this.state.name === "") {
      this.setState({ warning: "Map needs a Name" });
      return;
    }
    this.props.create(
      this.state.height,
      this.state.width,
      this.state.name,
      this.state.tile
    );
    this.setState({ nestmodal: false, modal: false });
  }
  save() {
    this.setState({
      nestedWarning: this.props.name + " was saved successfully",
    });
    this.props.save(this.props.name, this.props.tilemap);
  }
  toggle() {
    this.setState((state) => ({
      modal: !state.modal,
      nestedWarning: "",
    }));
  }
  togglenested() {
    if (this.props.name !== "") {
      this.setState((state) => ({
        nestmodal: !state.nestmodal,
      }));
    } else {
      this.create();
    }
  }

  render() {
    return (
      <div>
        <Button
          style={{
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
          outline
          color="light"
          onClick={this.toggle}
        >
          New Map
        </Button>
        <Modal isOpen={this.state.modal} backdrop={false} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Create New Map</ModalHeader>
          <ModalBody>
            <InputGroup>
              <InputGroupAddon addonType="prepend">Name:</InputGroupAddon>
              <Input
                placeholder="Name"
                value={this.state.name}
                onChange={this.nameChange}
              />
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">Height:</InputGroupAddon>
              <Input
                placeholder="Width"
                value={this.state.height}
                onChange={this.heightChange}
              />
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">Width:</InputGroupAddon>
              <Input
                placeholder="Width"
                value={this.state.width}
                onChange={this.widthChange}
              />
            </InputGroup>
            <UncontrolledDropdown>
              <DropdownToggle color="light" caret>
                {this.state.tile.name}
                <img
                  src={`${process.env.PUBLIC_URL}/assets/textures/${this.state.tile.name}.png`}
                  alt="put"
                  style={{
                    marginLeft: 10,
                    height: 30,
                    width: 30,
                  }}
                />
              </DropdownToggle>
              <DropdownMenu>
                {Object.entries(this.props.textures).map((c) => {
                  return (
                    <div>
                      {c[1]
                        .filter((t) => t.type === "tile")
                        .map((t) => (
                          <DropdownItem onClick={() => this.tileChange(t)}>
                            {t.name}
                            <img
                              src={`${process.env.PUBLIC_URL}/assets/textures/${
                                t.category
                              }/${
                                t.hasOwnProperty("ori")
                                  ? t.name + t.ori
                                  : t.name
                              }.png`}
                              style={{
                                height: 30 * t.height,
                                width: 30 * t.width,
                                margin: "auto",
                              }}
                              alt="putt"
                            />
                          </DropdownItem>
                        ))}
                    </div>
                  );
                })}
              </DropdownMenu>
            </UncontrolledDropdown>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
            <Button color="success" onClick={this.togglenested}>
              Create
            </Button>
            <Modal
              isOpen={this.state.nestmodal}
              backdrop={false}
              toggle={this.togglenested}
            >
              <ModalBody>
                <p>
                  If you create a new Map, all unsaved changes to the current
                  Map will be lost!
                </p>
                <p>Do you want to save the current Map?</p>
                <p color="red">
                  Saving and Loading Maps is not possible in the online version,
                  this is just a demonstration of the React App
                </p>
                <Button disabled onClick={this.save} color="primary">
                  Save Changes First
                </Button>
                <p>{this.state.nestedWarning}</p>
              </ModalBody>
              <ModalFooter>
                <Row>
                  <Col>
                    <Button color="secondary" onClick={this.togglenested}>
                      Cancel
                    </Button>
                  </Col>
                  <Col>
                    <Button color="success" onClick={this.create}>
                      Create
                    </Button>
                  </Col>
                </Row>
              </ModalFooter>
            </Modal>
            <p style={{ color: "red" }}>{this.state.warning}</p>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default CreateModal;
