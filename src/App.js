import React from "react";

import "./App.css";
import MenuBar from "./MenuBar";
import SideBar from "./SideBar";
import InteractionBar from "./InteractionBar";
import Map from "./Map";
import WelcomeModal from "./WelcomeModal";

import axios from "axios";
import { Row, Col, Container } from "reactstrap";

import pokemon from "./JSONlibrary/pokemon.json";
import items from "./JSONlibrary/items.json";
import tools from "./JSONlibrary/tools.json";
import textures from "./JSONlibrary/textures.json";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.create = this.create.bind(this);
    this.place = this.place.bind(this);
    this.getMaps = this.getMaps.bind(this);
    this.saveMap = this.saveMap.bind(this);
    this.loadMap = this.loadMap.bind(this);
    this.scroll = this.scroll.bind(this);
    this.toolTipChange = this.toolTipChange.bind(this);
    this.setHighlight = this.setHighlight.bind(this);
    this.deleteMap = this.deleteMap.bind(this);
    this.state = {
      //ingame properties:
      pokemon: [],
      items: [],
      //map creation tools:
      textures: [],
      tools: [],
      toolTip: {
        type: "tile",
        name: "Grass",
        height: 1,
        width: 1,
        style: "singular",
        category: "pond",
      },
      area: false,
      area1: null,
      area2: null,
      //ViewPort:
      x: 0,
      y: 0,
      highlight: [],
      //current Map
      name: "",
      tilemap: [[]],
      //all loaded Maps
      maps: [{}],
    };
  }
  scroll(dir, val) {
    if (dir === "x") {
      let pos = this.state.x + val;

      if (pos < 0) {
        console.log("cant scroll to negative position");
        return;
      }
      if (
        pos + 25 > this.state.tilemap[0].length ||
        this.state.tilemap[0].length <= 25
      ) {
        console.log("cant scroll out of tilemap");
        return;
      }
      this.setState({ x: pos });
      return;
    } else if (dir === "y") {
      let pos = this.state.y + val;
      if (pos < 0) {
        console.log("cant scroll to negative position");
        return;
      }
      if (
        pos + 19 > this.state.tilemap.length ||
        this.state.tilemap.length <= 19
      ) {
        console.log("cant scroll out of tilemap");
        return;
      }
      this.setState({ y: pos });
      return;
    } else {
      console.log("invalid direction");
    }
  }
  toolTipChange(t) {
    //console.log("toolTipChange was called");
    //console.log("tool received:", t);
    this.setState({ toolTip: t });
  }
  setHighlight(row, col) {
    this.setState({ highlight: [row, col] });
    if (row > this.state.y + 19) {
      this.scroll("y", row - this.state.y);
    }
    if (row < this.state.y) {
      this.scroll("y", -(this.state.y - row));
    }
    if (col > this.state.x + 25) {
      this.scroll("x", col - this.state.x);
    }
    if (col < this.state.x) {
      this.scroll("x", -(this.state.x - col));
    }
    console.log("highlight: ", this.state.highlight);
  }
  place(row, col, t) {
    console.log("place was called");
    console.log("Tooltip:", this.state.toolTip);

    let tempMap = this.state.tilemap;
    //parameter t is only for portal, holds the tile of the other end of the portal
    if (this.state.area === true) {
      console.log("area is true");
      if (this.state.area1 === null) {
        this.setState({ area1: { row: row, col: col } });
        this.setHighlight(row, col);
        console.log(
          this.state.area + "," + this.state.area1 + "," + this.state.area2
        );
      } else if (this.state.area2 === null) {
        this.setState({ area2: { row: row, col: col } });
        console.log(
          this.state.area + "," + this.state.area1 + "," + this.state.area2
        );
      } else if (this.state.area2 !== null && this.state.area1 !== null) {
        let array = [];
        const fillArray = (r, c, a1, a2) => {
          array.push({ row: r, col: c });
          console.log(r + "," + c);
          console.log(a1);
          console.log(a2);
          if (r < a2.row) {
            fillArray(r + 1, c, a1, a2);
          } else if (r === a2.row && c === a2.col) {
          } else if (r === a2.row) {
            fillArray(a1.row, c + 1, a1, a2);
          }
        };
        let row1 = this.state.area1.row;
        let col1 = this.state.area1.col;
        let row2 = this.state.area2.row;
        let col2 = this.state.area2.col;
        if (row2 >= row1 && col2 >= col1) {
          fillArray(
            this.state.area1.row,
            this.state.area1.col,
            this.state.area1,
            this.state.area2
          );
        }
        if (row2 < row1 && col2 < col1) {
          fillArray(
            this.state.area2.row,
            this.state.area2.col,
            this.state.area2,
            this.state.area1
          );
        }
        if (row2 >= row1 && col2 < col1) {
          fillArray(
            this.state.area1.row,
            this.state.area2.col,
            { row: row1, col: col2 },
            { row: row2, col: col1 }
          );
        }
        if (row2 < row1 && col2 >= col1) {
          fillArray(
            this.state.area2.row,
            this.state.area1.col,
            { row: row2, col: col1 },
            { row: row1, col: col2 }
          );
        }
        console.log(array);
        this.setState(
          {
            area: false,
            area1: null,
            area2: null,
            highlight: [],
          },
          () => {
            array.forEach((a) => {
              this.place(a.row, a.col);
            });
          }
        );
      }
    }
    if (t !== undefined) {
      console.log(t);
      console.log("interaction changed");
      tempMap[row][col].object.interaction = t;
      if (t.type === "portal") {
        console.log(
          "this is a portal from: " +
            this.state.name +
            "[" +
            row +
            "/" +
            col +
            "] to " +
            t.exitMap +
            "[" +
            t.exitRow +
            "/" +
            t.exitCol +
            "]"
        );
        console.log(
          this.state.maps.filter((m) => m.name === t.exitMap)[0].tilemap
        );
        let portalMap = [].concat(
          this.state.maps.filter((m) => m.name === t.exitMap)[0].tilemap
        );

        portalMap[t.exitRow][t.exitCol].object = {
          name: "Trigger",
          height: 1,
          width: 1,
          style: "singular",
          interaction: {
            id: 0,
            color: "dark",
            type: "portal",
            trigger: "stepOn",
            dialogueActive: "",
            dialogueNotActive: "",
            active: true,
            exitMap: this.state.name,
            exitRow: row,
            exitCol: col,
          },
        };
        this.setState((prevState) => {
          let maps = prevState.maps;
          maps.filter((m) => m.name === t.exitMap)[0].tilemap = portalMap;
          console.log(maps.filter((m) => m.name === t.exitMap)[0].tilemap);
          this.saveMap(this.state.name, this.state.tilemap);
          this.saveMap(t.exitMap, portalMap);
          return { maps: maps };
        });
      }
    } else if (this.state.toolTip.name === "Remove") {
      //for textures with two orientations
      tempMap[row][col].object = { name: "Empty" };
    } else if (
      this.state.toolTip.name === "Turn" &&
      tempMap[row][col].object.hasOwnProperty("ori")
    ) {
      //for textures with two orientations
      if (
        tempMap[row][col].object.ori === true ||
        tempMap[row][col].object.ori === false
      ) {
        tempMap[row][col].object.ori = !tempMap[row][col].object.ori;
      }
      //for textures with four orientations
      else if (tempMap[row][col].object.ori < 3) {
        tempMap[row][col].object.ori += 1;
      } else {
        tempMap[row][col].object.ori = 0;
      }
    } else if (this.state.toolTip.type === "tile") {
      console.log("tile changed:");
      tempMap[row][col].tile = Object.assign({}, this.state.toolTip);
    } else if (this.state.toolTip.type === "object") {
      console.log("object changed:");

      tempMap[row][col].object = Object.assign({}, this.state.toolTip);
    } else {
      console.log("Error in app.place()");
    }
    console.log(tempMap[row][col]);

    this.setState({ tilemap: tempMap });
  }

  create(h, w, n, tile) {
    let tilemap = [];
    for (let i = 0; i < h; i++) {
      let row = [];
      for (let j = 0; j < w; j++) {
        row.push({
          row: i,
          col: j,
          tile: tile,
          object: { name: "Empty" },
        });
      }
      tilemap.push(row);
    }
    //console.log("tilemap created:" + h + "x" + w);
    //console.log(tilemap);
    this.setState({
      name: n,
      tilemap: tilemap,
    });
  }
  //Server Communication:
  getMaps() {
    //console.log("Lets get the Maps");
    axios.get("http://localhost:3001/maps").then((response) => {
      const notes = response.data;
      //console.log(notes);
      this.setState({ maps: notes });
    });
  }
  loadMap(m) {
    console.log("M:", m.tilemap);
    this.setState({
      x: 0,
      y: 0,
      name: m.name,
      tilemap: m.tilemap,
    });
  }
  saveMap(name, tilemap) {
    if (this.state.maps.map((m) => m.name).includes(name)) {
      let maps = this.state.maps;
      let i = maps.filter((m) => m.name === name)[0].id;
      console.log(
        "Entry:",
        maps.filter((m) => m.name === name)
      );
      console.log("I:", i);
      const thisMap = {
        name: name,
        tilemap: tilemap,
      };
      let url = "http://localhost:3001/maps/" + i;
      axios.put(url, thisMap).then((response) => {
        console.log(response);
      });
    } else {
      const thisMap = {
        name: name,
        tilemap: this.state.tilemap,
      };
      axios.post("http://localhost:3001/maps", thisMap).then((response) => {
        console.log(response);
      });
    }
  }
  deleteMap(name) {
    let maps = this.state.maps;
    let i = maps.filter((m) => m.name === name)[0].id;
    console.log(
      "Entry:",
      maps.filter((m) => m.name === name)
    );
    console.log("I:", i);
    let url = "http://localhost:3001/maps/" + i;
    axios.delete(url).then((response) => {
      console.log(response);
    });
  }
  componentDidMount() {
    let mappedPokes = [];
    Object.entries(pokemon.pokemon).forEach((e) => {
      mappedPokes.push(e[1].name);
    });
    console.log(mappedPokes);
    let mappedItems = [];
    Object.entries(items.items).forEach((e) => {
      mappedItems.push(e[1].name);
    });
    console.log(mappedItems);

    this.setState({
      pokemon: mappedPokes,
      items: mappedItems,
      textures: textures,
      tools: tools.tools,
    });
    this.create(20, 26, "New Map", {
      type: "tile",
      name: "Grass",
      style: "singular",
      category: "pond",
    });
    this.getMaps();
  }
  //Render:
  render() {
    return (
      <div
        style={{
          backgroundColor: "black",
          position: "absolute",
          top: 0,
          left: 0,
          minHeight: "100vh",
          heigth: "100%",
          width: "100vw",
        }}
      >
        <WelcomeModal />
        <MenuBar
          name={this.state.name}
          maps={this.state.maps}
          textures={this.state.textures}
          tilemap={this.state.tilemap}
          area={this.state.area}
          create={this.create}
          toolTip={this.state.toolTip}
          toolTip={this.state.toolTip}
          toolTipChange={this.toolTipChange}
          toggleArea={() => this.setState({ area: !this.state.area })}
          x={0}
          y={0}
          highlight={this.state.highlight}
          saveMap={this.saveMap}
          getMaps={this.getMaps}
          loadMap={this.loadMap}
          deleteMap={this.deleteMap}
        />
        <Container style={{ heigth: "100%", minHeight: "100vh" }} fluid>
          <Row>
            <Col xs="2">
              <SideBar
                name={this.state.name}
                textures={this.state.textures}
                toolTip={this.state.toolTip}
                toolTipChange={this.toolTipChange}
                //fillAll={this.fillAll}
              />
            </Col>
            <Col xs="8">
              <div>
                <Map
                  tilemap={this.state.tilemap}
                  place={this.place}
                  scroll={this.scroll}
                  x={this.state.x}
                  y={this.state.y}
                  xLimit={25}
                  yLimit={19}
                  highlight={this.state.highlight}
                />
              </div>
            </Col>
            <Col xs="2">
              <InteractionBar
                pokemon={this.state.pokemon}
                items={this.state.items}
                name={this.state.name}
                maps={this.state.maps}
                tilemap={this.state.tilemap}
                highlight={this.state.highlight}
                setHighlight={this.setHighlight}
                place={this.place}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
