import React from "react";
import {
  Button,
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  InputGroup,
  InputGroupAddon,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import TypeInput from "./TypeInput";

class InteractionModal extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.create = this.create.bind(this);
    this.setType = this.setType.bind(this);
    this.setTrigger = this.setTrigger.bind(this);
    this.setActiveDialogue = this.setActiveDialogue.bind(this);
    this.setNotActiveDialogue = this.setNotActiveDialogue.bind(this);
    this.setActive = this.setActive.bind(this);
    this.transmit = this.transmit.bind(this);
    this.state = {
      //Modal function properties
      modal: false,
      dropdown: false,
      color: "danger",
      types: [
        { name: "Item", value: "item", color: "danger" },
        { name: "Dialogue", value: "dialogue", color: "light" },
        { name: "Trainer", value: "trainer", color: "primary" },
        { name: "Static Pokemon", value: "staticPokemon", color: "warning" },
        { name: "Pokemon Center", value: "pokemonCenter", color: "light" },
        { name: "Market", value: "market", color: "success" },
        { name: "Trade", value: "trade", color: "info" },
        { name: "Portal", value: "portal", color: "dark" },
      ],
      //interaction properties:
      id: "", //Mapname/row/col //FIXED, BUT DISPLAY
      type: "item", //Item,Dialogue,Trainer,Static Pokemon,Pokemon Center, Market,Portal Other //DROPDOWN
      trigger: "clickOn", //stepOn or clickOn //BUTTON GROUP
      dialogueActive: "", //write a function for separating each screen of dialogue //TEXTAREA
      dialogueNotActive: "", //TEXTAREA
      active: true, //For items and trainers, to disable them after finding/fighting //BUTTON GROUP
      //type specific properties:
      //Type Item:
      item: "",
      quantity: 1,
      //Type Dialogue neeeds no State
      //Type Trainer:
      trainerName: "",
      trainerClass: "",
      teamMembers: [
        { id: 0, pokemon: "", lvl: 1 },
        { id: 1, pokemon: "", lvl: 1 },
        { id: 2, pokemon: "", lvl: 1 },
        { id: 3, pokemon: "", lvl: 1 },
        { id: 4, pokemon: "", lvl: 1 },
        { id: 5, pokemon: "", lvl: 1 },
      ],
      trainerInventory: [],
      rewardMoney: 0,
      rewardItem: "",
      //Type Static Pokemon:
      pokemon: "",
      lvl: 1,
      //Type PokeCenter neeeds no State
      //Type Market:
      inventory: [],
      //Type Trade:
      requested: "",
      offered: "",
      //Type Portal:
      exitMap: "",
      exitRow: "",
      exitCol: "",
    };
  }
  setType(t) {
    this.setState({
      color: t.color,
      type: t.value,
    });
  }
  setActiveDialogue(e) {
    this.setState({ dialogueActive: e.target.value });
  }
  setNotActiveDialogue(e) {
    this.setState({ dialogueNotActive: e.target.value });
  }
  setTrigger(val) {
    this.setState({ trigger: val });
  }
  setActive(val) {
    this.setState({ active: val });
  }
  toggle() {
    if (this.state.modal === false) {
      console.log("InteractionModal opened");
      //loads the interaction, if it exists
      if (this.props.tile.object.interaction !== undefined) {
        this.setState({
          id: this.props.tile.object.interaction.id,
          color: this.props.tile.object.interaction.color,
          type: this.props.tile.object.interaction.type,
          trigger: this.props.tile.object.interaction.trigger,
          dialogueActive: this.props.tile.object.interaction.dialogueActive,
          dialogueNotActive: this.props.tile.object.interaction
            .dialogueNotActive,
          active: this.props.tile.object.interaction.active,
        });
        switch (this.props.tile.object.interaction.type.toLowerCase()) {
          case "item":
            this.setState({
              item: this.props.tile.object.interaction.item,
              quantity: this.props.tile.object.interaction.quantity,
            });
            break;
          case "dialogue":
            break;
          case "trainer":
            this.setState({
              trainerName: this.props.tile.object.interaction.trainerName,
              trainerClass: this.props.tile.object.interaction.trainerClass,
              teamMembers: this.props.tile.object.interaction.teamMembers,
              trainerInventory: this.props.tile.object.interaction
                .trainerInventory,
              rewardMoney: this.props.tile.object.interaction.rewardMoney,
              rewardItem: this.props.tile.object.interaction.rewardItem,
            });
            break;
          case "staticpokemon":
            this.setState({
              pokemon: this.props.tile.object.interaction.pokemon,
              lvl: this.props.tile.object.interaction.lvl,
            });
            break;
          case "pokemoncenter":
            break;
          case "market":
            this.setState({
              inventory: this.props.tile.object.interaction.inventory,
            });
            break;
          case "trade":
            this.setState({
              requested: this.props.tile.object.interaction.requested,
              offered: this.props.tile.object.interaction.offered,
            });
            break;
          case "portal":
            this.setState({
              exitMap: this.props.tile.object.interaction.exitMap,
              exitRow: this.props.tile.object.interaction.exitRow,
              exitCol: this.props.tile.object.interaction.exitCol,
            });
            break;
          default:
            console.log("Type not defined");
            break;
        }
      } else {
        let row = this.props.tile.row;
        let col = this.props.tile.col;
        if (this.props.tile.row < 10) {
          row = "00" + row;
        } else if (this.props.tile.row < 100) {
          row = "0" + row;
        }
        if (this.props.tile.col < 10) {
          col = "00" + col;
        } else if (this.props.tile.col < 100) {
          col = "0" + col;
        }

        this.setState({
          id: this.props.name + "/" + row + "/" + col,
          type: "item",
          trigger: "clickOn",
        });
      }
    }
    this.setState((state) => ({
      modal: !state.modal,
    }));
  }
  toggleDropdown() {
    this.setState((state) => ({
      dropdown: !state.dropdown,
    }));
  }
  create() {
    let interaction = {
      //every interaction has these 7 properties
      id: this.state.id,
      color: this.state.color,
      type: this.state.type,
      trigger: this.state.trigger,
      dialogueActive: this.state.dialogueActive,
      dialogueNotActive: this.state.dialogueNotActive,
      active: this.state.active,
    };
    switch (interaction.type.toLowerCase()) {
      case "item":
        interaction.item = this.state.item;
        interaction.quantity = this.state.quantity;
        break;
      case "dialogue":
        break;
      case "trainer":
        interaction.trainerName = this.state.trainerName;
        interaction.trainerClass = this.state.trainerClass;
        interaction.teamMembers = this.state.teamMembers;
        interaction.trainerInventory = this.state.trainerInventory;
        interaction.rewardMoney = this.state.rewardMoney;
        interaction.rewardItem = this.state.rewardItem;
        break;
      case "staticpokemon":
        interaction.pokemon = this.state.pokemon;
        interaction.lvl = this.state.lvl;
        break;
      case "pokemoncenter":
        break;
      case "market":
        interaction.inventory = this.state.inventory;
        break;
      case "trade":
        interaction.requested = this.state.requested;
        interaction.offered = this.state.offered;
        break;
      case "portal":
        interaction.exitMap = this.state.exitMap;
        interaction.exitRow = this.state.exitRow;
        interaction.exitCol = this.state.exitCol;
        break;
      default:
        console.log("Type not defined");
        break;
    }
    console.log(
      "calling place(" + this.props.tile.row,
      this.props.tile.col,
      interaction + ")"
    );
    this.props.place(this.props.tile.row, this.props.tile.col, interaction);
    this.toggle();
  }
  transmit(type, one, two, three, four, five, six) {
    //Receives the typespecific data from TypeInput
    switch (type.toLowerCase()) {
      case "item":
        this.setState({ item: one, quantity: two });
        return;
      case "dialogue":
        return;
      case "trainer":
        this.setState({
          trainerName: one,
          trainerClass: two,
          teamMembers: three,
          trainerInventory: four,
          rewardMoney: five,
          rewardItem: six,
        });
        return;
      case "staticpokemon":
        this.setState({
          pokemon: one,
          lvl: two,
        });
        return;
      case "pokemoncenter":
        return;
      case "market":
        this.setState({
          inventory: one,
        });
        return;
      case "trade":
        this.setState({
          requested: one,
          offered: two,
        });
        return;
      case "portal":
        this.setState({
          exitMap: one,
          exitRow: two,
          exitCol: three,
        });
        return;
      default:
        console.log("Type not defined");
        return;
    }
  }

  componentWillUnmount() {
    console.log("InteractionModal unMounting");
    this.setState({
      modal: false,
      dropdown: false,
      color: "danger",
      types: [
        { name: "Item", value: "item", color: "danger" },
        { name: "Dialogue", value: "dialogue", color: "light" },
        { name: "Trainer", value: "trainer", color: "primary" },
        { name: "Static Pokemon", value: "staticPokemon", color: "warning" },
        { name: "Pokemon Center", value: "pokemonCenter", color: "light" },
        { name: "Market", value: "market", color: "success" },
        { name: "Trade", value: "trade", color: "info" },
        { name: "Portal", value: "portal", color: "dark" },
      ],
      //interaction properties:
      id: "", //Mapname/row/col //FIXED, BUT DISPLAY
      type: "item", //Item,Dialogue,Trainer,Static Pokemon,Pokemon Center, Market,Portal Other //DROPDOWN
      trigger: "clickOn", //stepOn or clickOn //BUTTON GROUP
      dialogueActive: "", //write a function for separating each screen of dialogue //TEXTAREA
      dialogueNotActive: "", //TEXTAREA
      active: true, //For items and trainers, to disable them after finding/fighting //BUTTON GROUP
      //type specific properties:
      //Type Item:
      item: "",
      quantity: 1,
      //Type Dialogue neeeds no State
      //Type Trainer:
      trainerName: "",
      trainerClass: "",
      teamMembers: [
        { id: 0, pokemon: "", lvl: 1 },
        { id: 1, pokemon: "", lvl: 1 },
        { id: 2, pokemon: "", lvl: 1 },
        { id: 3, pokemon: "", lvl: 1 },
        { id: 4, pokemon: "", lvl: 1 },
        { id: 5, pokemon: "", lvl: 1 },
      ],
      trainerInventory: [],
      rewardMoney: 0,
      rewardItem: "",
      //Type Static Pokemon:
      pokemon: "",
      lvl: 1,
      //Type PokeCenter neeeds no State
      //Type Market:
      inventory: [],
      //Type Trade:
      requested: "",
      offered: "",
      //Type Portal:
      exitMap: "",
      exitRow: "",
      exitCol: "",
    });
  }

  render() {
    //console.log(this.props.tile);
    //console.log(this.props.tile.object);
    return (
      <div unmountOnClose={true}>
        <Button
          style={{
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            marginLeft: 1,
            width: "98%",
          }}
          outline
          color="light"
          onClick={this.toggle}
        >
          Edit
        </Button>
        <Modal
          size="xl"
          isOpen={this.state.modal}
          backdrop={false}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>
            <Button color={this.state.color}>
              {this.props.tile.object.name}[{this.props.tile.row}][
              {this.props.tile.col}]
            </Button>
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col>
                <InputGroup style={{ margin: 10, marginLeft: 0 }}>
                  <InputGroupAddon addonType="prepend">ID:</InputGroupAddon>
                  <Input type="text" value={this.state.id} />
                </InputGroup>
                <InputGroup style={{ margin: 10, marginLeft: 0 }}>
                  <InputGroupAddon addonType="prepend">
                    <Dropdown
                      isOpen={this.state.dropdown}
                      toggle={this.toggleDropdown}
                    >
                      <DropdownToggle
                        color={this.state.color}
                        style={{
                          borderTopRightRadius: 0,
                          borderBottomRightRadius: 0,
                        }}
                        caret
                      >
                        Type
                      </DropdownToggle>
                      <DropdownMenu>
                        {this.state.types.map((t) => (
                          <DropdownItem onClick={() => this.setType(t)}>
                            {t.name}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </InputGroupAddon>
                  <Input type="text" value={this.state.type} />
                </InputGroup>
                <InputGroup style={{ margin: 10, marginLeft: 0 }}>
                  <InputGroupAddon addonType="prepend">
                    Dialogue Active:
                  </InputGroupAddon>
                  <Input
                    type="textarea"
                    placeholder="Hello"
                    value={this.state.dialogueActive}
                    onChange={this.setActiveDialogue}
                  />
                </InputGroup>
                <InputGroup style={{ margin: 10, marginLeft: 0 }}>
                  <InputGroupAddon addonType="prepend">
                    Dialogue nonActive:
                  </InputGroupAddon>
                  <Input
                    type="textarea"
                    placeholder="Dont talk to me anymore"
                    id="nonActive"
                    value={this.state.dialogueNotActive}
                    onChange={this.setNotActiveDialogue}
                  />
                </InputGroup>
                <div style={{ margin: 10, marginLeft: 0, marginRight: 0 }}>
                  <ButtonGroup style={{ width: "100%" }}>
                    <Button
                      onClick={() => this.setTrigger("stepOn")}
                      active={this.state.trigger === "stepOn"}
                      color={this.state.color}
                    >
                      On Step
                    </Button>
                    <Button
                      onClick={() => this.setTrigger("clickOn")}
                      active={this.state.trigger === "clickOn"}
                      color={this.state.color}
                    >
                      On Click
                    </Button>
                  </ButtonGroup>
                </div>
                <div style={{ margin: 10, marginLeft: 0, marginRight: 0 }}>
                  <ButtonGroup style={{ width: "100%" }}>
                    <Button
                      onClick={() => this.setActive(true)}
                      active={this.state.active === true}
                      color={this.state.color}
                    >
                      active
                    </Button>
                    <Button
                      onClick={() => this.setActive(false)}
                      active={this.state.active === false}
                      color={this.state.color}
                    >
                      not active
                    </Button>
                  </ButtonGroup>
                </div>
              </Col>
              <Col>
                {this.props ? (
                  <TypeInput
                    pokemon={this.props.pokemon} //List of all Pokemon from App
                    items={this.props.items} //List of all Items from App
                    maps={this.props.maps} //List of all Maps from App
                    data={this.state} //just transfer the whole state, let TypeInput pick what it needs
                    transmit={this.transmit} //callback to get the input values back
                  />
                ) : (
                  <div />
                )}
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
            <Button color={this.state.color} onClick={this.create}>
              Create
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default InteractionModal;
