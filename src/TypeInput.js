import React from "react";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";

class TypeInput extends React.Component {
  constructor(props) {
    super(props);
    //Input Form Functions:
    this.toggleItemDropdown = this.toggleItemDropdown.bind(this);
    this.toggleTrainerItemDropdown = this.toggleTrainerItemDropdown.bind(this);
    this.togglePokemonDropdown = this.togglePokemonDropdown.bind(this);
    this.setSearchTerm = this.setSearchTerm.bind(this);
    //Value Functions:
    //Item:
    this.setQuantity = this.setQuantity.bind(this);
    //Trainer:
    this.setTrainerName = this.setTrainerName.bind(this);
    this.setTrainerClass = this.setTrainerClass.bind(this);
    this.setPokemonLvl = this.setPokemonLvl.bind(this);
    this.setRewardMoney = this.setRewardMoney.bind(this);
    this.setRewardItem = this.setRewardItem.bind(this);
    //Static Pokemon:
    this.setStaticPokemonLvl = this.setStaticPokemonLvl.bind(this);
    //Portal:
    this.setExitCol = this.setExitCol.bind(this);
    this.setExitRow = this.setExitRow.bind(this);
    this.state = {
      //Input Form parameters:
      itemDropdown: false,
      trainerItemDropdown: false,
      pokemonDropdown: [
        { id: 0, bool: false },
        { id: 1, bool: false },
        { id: 2, bool: false },
        { id: 3, bool: false },
        { id: 4, bool: false },
        { id: 5, bool: false },
      ],
      searchTerm: "",
      warning: "",
      //Type Item:
      item: "",
      quantity: 1,
      //Type Dialogue neeeds no State
      //Type Trainer:
      trainerName: "",
      trainerClass: "",
      i: 1,
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
      exitRow: 0,
      exitCol: 0,
    };
  }
  //Type Item:
  setItem(val) {
    this.setState({ searchTerm: "", item: val });
    this.transmit();
  }
  setQuantity(val) {
    this.setState({ quantity: val.target.value, warning: "" });
    this.transmit();
  }
  //Type Trainer:
  setTrainerName(val) {
    this.setState({ trainerName: val.target.value });
    this.transmit();
  }
  setTrainerClass(val) {
    this.setState({ trainerClass: val.target.value });
    this.transmit();
  }
  setPokemon(val, id) {
    this.setState((prevState) => ({
      teamMembers: prevState.teamMembers.map((el) =>
        el.id === id ? { ...el, pokemon: val } : el
      ),
    }));
    this.transmit();
  }
  setPokemonLvl(e, id) {
    if (e.target.value <= 100 && e.target.value >= 0) {
      const val = e.target.value;
      this.setState((prevState) => ({
        teamMembers: prevState.teamMembers.map((el) =>
          el.id === id ? { ...el, lvl: val } : el
        ),
        warning: "",
      }));
    } else {
      this.setState({ warning: "Level must be between 1 and 100" });
    }
  }
  pushTrainerInventory(val) {
    this.setState((prevState) => ({
      trainerInventory: prevState.trainerInventory.concat(val),
    }));
    this.transmit();
  }
  deleteTrainerInventory(val) {
    this.setState((state) => {
      const trainerInventory = state.trainerInventory.filter(
        (item) => item !== val
      );
      return {
        trainerInventory,
      };
    });
    this.transmit();
  }
  setRewardMoney(val) {
    this.setState({ rewardMoney: val.target.value });
    this.transmit();
  }
  setRewardItem(val) {
    this.setState({ searchTerm: "", rewardItem: val });
    this.transmit();
  }
  //Type Static Pokemon:
  setStaticPokemon(val) {
    this.setState({ pokemon: val });
    this.transmit();
  }
  setStaticPokemonLvl(val) {
    this.setState({ lvl: val.target.value });
    this.transmit();
  }
  //Type Market:
  pushInventory(val) {
    this.setState((prevState) => ({
      inventory: prevState.inventory.concat(val),
    }));
    this.transmit();
  }
  deleteInventory(val) {
    this.setState((state) => {
      const inventory = state.inventory.filter((item) => item !== val);
      return {
        inventory,
      };
    });
    this.transmit();
  }
  //Type Trade:
  setOffered(val) {
    this.setState({ offered: val });
    this.transmit();
  }
  setRequested(val) {
    this.setState({ requested: val });
    this.transmit();
  }
  //Type Portal:
  setExitMap(val) {
    this.setState({ exitMap: val });
    this.transmit();
  }
  setExitCol(e) {
    if (
      e.target.value <=
      this.props.maps.filter((m) => m.name === this.state.exitMap)[0].tilemap
        .length
    ) {
      this.setState({ exitCol: e.target.value, warning: "" });
      this.transmit();
    } else {
      this.setState({ warning: "Portal has to be located inside the map" });
    }
    this.transmit();
  }
  setExitRow(e) {
    if (
      e.target.value <=
      this.props.maps.filter((m) => m.name === this.state.exitMap)[0].tilemap[0]
        .length
    ) {
      this.setState({ exitRow: e.target.value, warning: "" });
      this.transmit();
    } else {
      this.setState({ warning: "Portal has to be located inside the map" });
    }
    this.transmit();
  }
  //send data back:
  transmit() {
    new Promise(() => {
      setTimeout(() => {
        //this.props.transmit(this.state);
        switch (this.props.data.type.toLowerCase()) {
          case "item":
            this.props.transmit("item", this.state.item, this.state.quantity);
            return;
          case "dialogue":
            return;
          case "trainer":
            console.log("Inventory:", this.state.trainerInventory);
            this.props.transmit(
              "trainer",
              this.state.trainerName,
              this.state.trainerClass,
              this.state.teamMembers,
              this.state.trainerInventory,
              this.state.rewardMoney,
              this.state.rewardItem
            );
            return;
          case "staticpokemon":
            this.props.transmit(
              "staticpokemon",
              this.state.pokemon,
              this.state.lvl
            );
            return;
          case "pokemoncenter":
            return;
          case "market":
            this.props.transmit("market", this.state.inventory);
            return;
          case "trade":
            this.props.transmit(
              "trade",
              this.state.requested,
              this.state.offered
            );
            return;
          case "portal":
            this.props.transmit(
              "portal",
              this.state.exitMap,
              this.state.exitRow,
              this.state.exitCol
            );
            return;
          default:
            return <p>TYPE NOT DEFINED</p>;
        }
      }, 500);
    });
  }
  //Component Handling Functions
  toggleItemDropdown() {
    this.setState((state) => ({
      itemDropdown: !state.itemDropdown,
    }));
  }
  toggleTrainerItemDropdown() {
    this.setState((state) => ({
      trainerItemDropdown: !state.trainerItemDropdown,
    }));
  }
  togglePokemonDropdown(id) {
    this.setState((state) => ({
      pokemonDropdown: state.pokemonDropdown.map((el) =>
        el.id === id ? { ...el, bool: !el.bool } : el
      ),
    }));
  }
  setSearchTerm(val) {
    this.setState({ searchTerm: val.target.value });
  }
  componentDidMount() {
    this.setState({
      item: this.props.data.item,
      quantity: this.props.data.quantity,
      //Type Dialogue neeeds no State
      //Type Trainer:
      trainerName: this.props.data.trainerName,
      trainerClass: this.props.data.trainerClass,
      i: 1,
      teamMembers: this.props.data.teamMembers,
      trainerInventory: this.props.data.trainerInventory,
      rewardMoney: this.props.data.rewardMoney,
      rewardItem: this.props.data.rewardItem,
      //Type Static Pokemon:
      pokemon: this.props.data.pokemon,
      lvl: this.props.data.lvl,
      //Type PokeCenter neeeds no State
      //Type Market:
      inventory: this.props.data.inventory,
      //Type Trade:
      requested: this.props.data.requested,
      offered: this.props.data.offered,
      //Type Portal:
      exitMap: this.props.data.exitMap,
      exitRow: this.props.data.exitRow,
      exitCol: this.props.data.exitCol,
    });
  }

  render() {
    switch (this.props.data.type.toLowerCase()) {
      case "item":
        return (
          <div unmountOnClose={true}>
            <InputGroup style={{ margin: 10, marginLeft: 0 }}>
              <InputGroupAddon addonType="prepend">
                <Dropdown
                  isOpen={this.state.itemDropdown}
                  toggle={this.toggleItemDropdown}
                >
                  <DropdownToggle
                    color={this.props.data.color}
                    style={{
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                    caret
                  >
                    Item
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem toggle={false}>
                      <Input
                        value={this.state.searchTerm}
                        onChange={this.setSearchTerm}
                      />
                    </DropdownItem>
                    {this.props.items
                      .filter((item) => item.includes(this.state.searchTerm))
                      .slice(0, 5)
                      .map((item) => (
                        <DropdownItem onClick={() => this.setItem(item)}>
                          {item}
                        </DropdownItem>
                      ))}
                  </DropdownMenu>
                </Dropdown>
              </InputGroupAddon>
              <Input type="text" value={this.state.item} />
            </InputGroup>
            <InputGroup style={{ margin: 10, marginLeft: 0 }}>
              <InputGroupAddon addonType="prepend">Quantity:</InputGroupAddon>
              <Input
                type="number"
                value={this.state.quantity}
                onChange={this.setQuantity}
                placeholder="Quantity"
              />
            </InputGroup>
            <p style={{ color: "red" }}>{this.state.warning}</p>
          </div>
        );
      case "dialogue":
        return (
          <Button block color="light">
            a Dialogue Interaction has no additional Properties
          </Button>
        );
      case "trainer":
        return (
          <div>
            <InputGroup style={{ margin: 10, marginLeft: 0 }}>
              <InputGroupAddon addonType="prepend">Name:</InputGroupAddon>
              <Input
                type="text"
                value={this.state.trainerName}
                placeholder="Name"
                onChange={this.setTrainerName}
              />
            </InputGroup>
            <InputGroup style={{ margin: 10, marginLeft: 0 }}>
              <InputGroupAddon addonType="prepend">Class:</InputGroupAddon>
              <Input
                type="text"
                value={this.state.trainerClass}
                placeholder="Class"
                onChange={this.setTrainerClass}
              />
            </InputGroup>
            <h5>Team:</h5>

            {this.state.teamMembers.slice(0, this.state.i).map((t) => (
              <div>
                <InputGroup style={{ margin: 10, marginLeft: 0 }}>
                  <InputGroupAddon addonType="prepend">
                    <Dropdown
                      isOpen={this.state.pokemonDropdown[t.id].bool}
                      toggle={() => this.togglePokemonDropdown(t.id)}
                    >
                      <DropdownToggle
                        color={this.props.data.color}
                        style={{
                          borderTopRightRadius: 0,
                          borderBottomRightRadius: 0,
                        }}
                        caret
                      >
                        Pokemon
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem toggle={false}>
                          <Input
                            value={this.state.searchTerm}
                            onChange={this.setSearchTerm}
                          />
                        </DropdownItem>
                        {this.props.pokemon
                          .filter((p) => p.includes(this.state.searchTerm))
                          .slice(0, 5)
                          .map((p) => (
                            <DropdownItem
                              onClick={() => this.setPokemon(p, t.id)}
                            >
                              {p}
                            </DropdownItem>
                          ))}
                      </DropdownMenu>
                    </Dropdown>
                  </InputGroupAddon>
                  <Input type="text" value={t.pokemon} />
                  <InputGroupAddon addonType="prepend">lvl:</InputGroupAddon>
                  <Input
                    type="number"
                    name={t.id}
                    value={
                      this.state.teamMembers.filter((m) => m.id === t.id)[0].lvl
                    }
                    placeholder="lvl"
                    onChange={(e) => {
                      this.setPokemonLvl(e, t.id);
                    }}
                  />
                </InputGroup>
              </div>
            ))}
            <ButtonGroup>
              <Button
                disabled={this.state.i >= 6}
                color={this.props.data.color}
                onClick={() => this.setState({ i: this.state.i + 1 })}
              >
                +
              </Button>
              <Button
                disabled={this.state.i <= 1}
                color={this.props.data.color}
                onClick={() => this.setState({ i: this.state.i - 1 })}
              >
                -
              </Button>
            </ButtonGroup>
            <h5>Items:</h5>
            <Dropdown
              isOpen={this.state.trainerItemDropdown}
              toggle={this.toggleTrainerItemDropdown}
            >
              <DropdownToggle
                color={this.props.data.color}
                style={{
                  margin: 10,
                  marginLeft: 0,
                }}
                caret
                block
              >
                Add Item
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem toggle={false}>
                  <Input
                    value={this.state.searchTerm}
                    onChange={this.setSearchTerm}
                  />
                </DropdownItem>
                {this.props.items
                  .filter(
                    (item) =>
                      this.state.trainerInventory.includes(item) === false
                  )
                  .filter((item) => item.includes(this.state.searchTerm))
                  .slice(0, 5)
                  .map((item) => (
                    <DropdownItem
                      onClick={() => this.pushTrainerInventory(item)}
                    >
                      {item}
                    </DropdownItem>
                  ))}
              </DropdownMenu>
            </Dropdown>
            {this.state.trainerInventory.map((t) => (
              <h5 style={{ margin: 10, marginLeft: 0 }}>
                {t}
                <Button
                  style={{ marginLeft: 10 }}
                  color="danger"
                  onClick={() => this.deleteTrainerInventory(t)}
                >
                  X
                </Button>
              </h5>
            ))}
            <h5>Rewards:</h5>
            <InputGroup style={{ margin: 10, marginLeft: 0 }}>
              <InputGroupAddon addonType="prepend">Money:</InputGroupAddon>
              <Input
                type="number"
                value={this.state.rewardMoney}
                placeholder="Money"
                onChange={this.setRewardMoney}
              />
            </InputGroup>
            <p style={{ color: "red" }}>{this.state.warning}</p>
            <InputGroup style={{ margin: 10, marginLeft: 0 }}>
              <InputGroupAddon addonType="prepend">
                <Dropdown
                  isOpen={this.state.itemDropdown}
                  toggle={this.toggleItemDropdown}
                >
                  <DropdownToggle
                    color={this.props.data.color}
                    style={{
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                    caret
                  >
                    Item
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem toggle={false}>
                      <Input
                        value={this.state.searchTerm}
                        onChange={this.setSearchTerm}
                      />
                    </DropdownItem>
                    {this.props.items
                      .filter((item) => item.includes(this.state.searchTerm))
                      .slice(0, 5)
                      .map((item) => (
                        <DropdownItem onClick={() => this.setRewardItem(item)}>
                          {item}
                        </DropdownItem>
                      ))}
                  </DropdownMenu>
                </Dropdown>
              </InputGroupAddon>
              <Input type="text" value={this.state.rewardItem} />
            </InputGroup>
          </div>
        );
      case "staticpokemon":
        return (
          <InputGroup style={{ margin: 10, marginLeft: 0 }}>
            <InputGroupAddon addonType="prepend">
              <Dropdown
                isOpen={this.state.pokemonDropdown[0].bool}
                toggle={() => this.togglePokemonDropdown(0)}
              >
                <DropdownToggle
                  color={this.props.data.color}
                  style={{
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  }}
                  caret
                >
                  Pokemon
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem toggle={false}>
                    <Input
                      value={this.state.searchTerm}
                      onChange={this.setSearchTerm}
                    />
                  </DropdownItem>
                  {this.props.pokemon
                    .filter((p) => p.includes(this.state.searchTerm))
                    .slice(0, 5)
                    .map((p) => (
                      <DropdownItem onClick={() => this.setStaticPokemon(p)}>
                        {p}
                      </DropdownItem>
                    ))}
                </DropdownMenu>
              </Dropdown>
            </InputGroupAddon>
            <Input type="text" value={this.state.pokemon} />
            <InputGroupAddon addonType="prepend">lvl:</InputGroupAddon>
            <Input
              type="number"
              value={this.state.lvl}
              placeholder={this.state.lvl}
              onChange={this.setStaticPokemonLvl}
            />
          </InputGroup>
        );
      case "pokemoncenter":
        return (
          <Button block color="light">
            a Pokemon Center Interaction has no additional Properties
          </Button>
        );
      case "market":
        return (
          <div>
            <h5>Inventory:</h5>
            <Dropdown
              isOpen={this.state.itemDropdown}
              toggle={this.toggleItemDropdown}
            >
              <DropdownToggle
                color={this.props.data.color}
                style={{
                  margin: 10,
                  marginLeft: 0,
                }}
                caret
                block
              >
                Add Item
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem toggle={false}>
                  <Input
                    value={this.state.searchTerm}
                    onChange={this.setSearchTerm}
                  />
                </DropdownItem>
                {this.props.items
                  .filter(
                    (item) => this.state.inventory.includes(item) === false
                  )
                  .filter((item) => item.includes(this.state.searchTerm))
                  .slice(0, 5)
                  .map((item) => (
                    <DropdownItem onClick={() => this.pushInventory(item)}>
                      {item}
                    </DropdownItem>
                  ))}
              </DropdownMenu>
            </Dropdown>
            {this.state.inventory.map((t) => (
              <h5 style={{ margin: 10, marginLeft: 0 }}>
                {t}
                <Button
                  style={{ marginLeft: 10 }}
                  color="danger"
                  onClick={() => this.deleteInventory(t)}
                >
                  X
                </Button>
              </h5>
            ))}
          </div>
        );
      case "trade":
        return (
          <div>
            <h5 style={{ margin: 10, marginLeft: 0 }}>Request:</h5>
            <InputGroup style={{ margin: 10, marginLeft: 0 }}>
              <InputGroupAddon addonType="prepend">
                <Dropdown
                  isOpen={this.state.pokemonDropdown[0].bool}
                  toggle={() => this.togglePokemonDropdown(0)}
                >
                  <DropdownToggle
                    color={this.props.data.color}
                    style={{
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                    caret
                  >
                    Pokemon
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem toggle={false}>
                      <Input
                        value={this.state.searchTerm}
                        onChange={this.setSearchTerm}
                      />
                    </DropdownItem>
                    {this.props.pokemon
                      .filter((p) => p.includes(this.state.searchTerm))
                      .slice(0, 5)
                      .map((p) => (
                        <DropdownItem onClick={() => this.setRequested(p)}>
                          {p}
                        </DropdownItem>
                      ))}
                  </DropdownMenu>
                </Dropdown>
              </InputGroupAddon>
              <Input type="text" value={this.state.requested} />
            </InputGroup>
            <h5 style={{ margin: 10, marginLeft: 0 }}>Offer:</h5>
            <InputGroup style={{ margin: 10, marginLeft: 0 }}>
              <InputGroupAddon addonType="prepend">
                <Dropdown
                  isOpen={this.state.pokemonDropdown[1].bool}
                  toggle={() => this.togglePokemonDropdown(1)}
                >
                  <DropdownToggle
                    color={this.props.data.color}
                    style={{
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                    caret
                  >
                    Pokemon
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem toggle={false}>
                      <Input
                        value={this.state.searchTerm}
                        onChange={this.setSearchTerm}
                      />
                    </DropdownItem>
                    {this.props.pokemon
                      .filter((p) => p.includes(this.state.searchTerm))
                      .slice(0, 5)
                      .map((p) => (
                        <DropdownItem onClick={() => this.setOffered(p)}>
                          {p}
                        </DropdownItem>
                      ))}
                  </DropdownMenu>
                </Dropdown>
              </InputGroupAddon>
              <Input type="text" value={this.state.offered} />
            </InputGroup>
          </div>
        );

      case "portal":
        return (
          <div>
            <InputGroup style={{ margin: 10, marginLeft: 0 }}>
              <InputGroupAddon addonType="prepend">
                <Dropdown
                  isOpen={this.state.itemDropdown}
                  toggle={this.toggleItemDropdown}
                >
                  <DropdownToggle
                    color={this.props.data.color}
                    style={{
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                    caret
                  >
                    Map
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem toggle={false}>
                      <Input
                        value={this.state.searchTerm}
                        onChange={this.setSearchTerm}
                      />
                    </DropdownItem>
                    {this.props.maps

                      .filter((m) => m.name.includes(this.state.searchTerm))
                      .slice(0, 5)
                      .map((m) => (
                        <DropdownItem onClick={() => this.setExitMap(m.name)}>
                          {m.name}
                        </DropdownItem>
                      ))}
                  </DropdownMenu>
                </Dropdown>
              </InputGroupAddon>
              <Input
                type="text"
                value={
                  this.state.exitMap === ""
                    ? ""
                    : this.state.exitMap +
                      ":[" +
                      this.props.maps.filter(
                        (m) => m.name === this.state.exitMap
                      )[0].tilemap.length +
                      "/" +
                      this.props.maps.filter(
                        (m) => m.name === this.state.exitMap
                      )[0].tilemap[0].length +
                      "]"
                }
              />
            </InputGroup>
            <InputGroup style={{ margin: 10, marginLeft: 0 }}>
              <InputGroupAddon addonType="prepend">Col:</InputGroupAddon>
              <Input
                disabled={this.state.exitMap === ""}
                type="number"
                value={this.state.exitCol}
                placeholder="Col"
                onChange={this.setExitCol}
              />
              <InputGroupAddon addonType="prepend">Row:</InputGroupAddon>
              <Input
                disabled={this.state.exitMap === ""}
                type="number"
                value={this.state.exitRow}
                placeholder="Row"
                onChange={this.setExitRow}
              />
            </InputGroup>
            <p style={{ color: "red" }}>{this.state.warning}</p>
          </div>
        );

      default:
        return <p>TYPE NOT DEFINED</p>;
    }
  }
}
export default TypeInput;
