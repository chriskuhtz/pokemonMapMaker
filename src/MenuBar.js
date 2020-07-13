import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  Button,
  NavbarText,
  Nav,
  ButtonGroup,
} from "reactstrap";
import SaveModal from "./SaveModal";
import LoadModal from "./LoadModal";
import CreateModal from "./CreateModal";

class MenuBar extends React.Component {
  constructor(props) {
    super(props);
    this.loadMap = this.loadMap.bind(this);
    this.state = { showMap: false };
  }

  loadMap(m) {
    this.props.loadMap(m);
  }
  showMap() {
    if (this.state.showMap === true) {
      let height = window.innerHeight / this.props.tilemap.length;
      if (this.props.tilemap[0].length > this.props.tilemap.length) {
        height = window.innerWidth / this.props.tilemap[0].length;
        if (
          this.props.tilemap[0].length <
          (this.props.tilemap.length / 9) * 16
        ) {
          height = window.innerHeight / this.props.tilemap[0].length;
        }
      }

      const width = height;
      return (
        <div
          style={{
            backgroundColor: "black",
            zIndex: 100,
            position: "absolute",
            top: 0,
            left: 0,
            minHeight: "100vh",
            heigth: "100%",
            width: "100vw",
          }}
        >
          <Button
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: 50,
              width: 50,
              zIndex: 200,
            }}
            color="danger"
            onClick={() => this.setState({ showMap: false })}
          >
            X
          </Button>
          {this.props.tilemap !== [] && this.props.tilemap !== undefined
            ? this.props.tilemap.map((r) => (
                <div>
                  {r.map((c) => {
                    let tileUrl = `${process.env.PUBLIC_URL}/assets/textures/${c.tile.category}/${c.tile.name}.png`;

                    if (c.object.name !== "Empty") {
                      //TILE WITH OBJECT
                      let objUrl = `${process.env.PUBLIC_URL}/assets/textures/${c.object.category}/${c.object.name}.png`;
                      if (c.object.hasOwnProperty("ori")) {
                        objUrl = `${process.env.PUBLIC_URL}/assets/textures/${
                          c.object.category
                        }/${c.object.name + c.object.ori}.png`;
                      }

                      if (
                        c.row === this.props.highlight[0] &&
                        c.col === this.props.highlight[1]
                      ) {
                      }
                      return (
                        <div>
                          <img //Object Layer
                            src={objUrl}
                            alt="put"
                            style={{
                              position: "absolute",
                              top:
                                (c.row + 1 - c.object.height - this.props.y) *
                                height, //+1 damit das object genau auf dem feld steht
                              left: (c.col - this.props.x) * width,
                              zIndex: 2,
                              height: height * c.object.height,
                              width: width * c.object.width,
                              outlineStyle:
                                c.row === this.props.highlight[0] &&
                                c.col === this.props.highlight[1]
                                  ? "solid"
                                  : "none",
                              outlineColor: "red",
                            }}
                          />
                          <img //Tile Layer
                            src={tileUrl}
                            alt="put"
                            style={{
                              position: "absolute",
                              top: (c.row - this.props.y) * height,
                              left: (c.col - this.props.x) * width,
                              zIndex: 1,
                              height: height,
                              width: width,
                            }}
                          />
                        </div>
                      );
                    } else {
                      //TILE WITHOUT OBJECT:
                      return (
                        <div>
                          <img //tile Layer
                            src={tileUrl}
                            alt="put"
                            style={{
                              position: "absolute",
                              top: (c.row - this.props.y) * height,
                              left: (c.col - this.props.x) * width,
                              zIndex: 1,
                              height: height,
                              width: width,
                            }}
                          />
                        </div>
                      );
                    }
                  })}
                </div>
              ))
            : "Waiting"}
        </div>
      );
    }
  }

  render() {
    return (
      <div
        style={{
          color: "rgb(248,249,250)",
          borderBottom: "solid",
          borderWidth: 1,
        }}
      >
        {this.showMap()}
        <Navbar
          expand="md"
          style={{
            backgroundColor: "rgb(0,8,22)",

            color: "rgb(248,249,250)",
          }}
        >
          <NavbarBrand style={{ color: "rgb(248,249,250)" }}>
            Pokemon MapMaker
          </NavbarBrand>
          <Nav className="mr-auto" navbar>
            <ButtonGroup>
              {this.props.name === "" ? (
                <Button outline color="warning">
                  Working on new Map
                </Button>
              ) : (
                <Button outline color="success">
                  Working On: {this.props.name}
                </Button>
              )}
            </ButtonGroup>
            <ButtonGroup style={{ marginLeft: 10 }}>
              <Button
                outline={this.props.toolTip.name !== "Turn"}
                color="warning"
                onClick={() =>
                  this.props.toolTipChange({
                    type: "tool",
                    name: "Turn",
                    height: 1,
                    width: 1,
                    category: "tools",
                  })
                }
              >
                Turn
              </Button>
              <Button
                outline={this.props.toolTip.name !== "Remove"}
                color="danger"
                onClick={() =>
                  this.props.toolTipChange({
                    type: "tool",
                    name: "Remove",
                    height: 1,
                    width: 1,
                    category: "tools",
                  })
                }
              >
                Remove
              </Button>
              <Button
                outline={this.props.toolTip.name !== "Trigger"}
                color="primary"
                onClick={() =>
                  this.props.toolTipChange({
                    type: "object",
                    name: "Trigger",
                    height: 1,
                    width: 1,
                    category: "tools",
                  })
                }
              >
                Trigger
              </Button>
              <Button
                outline={!this.props.area}
                color="success"
                onClick={() => this.props.toggleArea()}
              >
                AreaFill
              </Button>
              <Button
                color="info"
                onClick={() => this.setState({ showMap: true })}
              >
                Whole Map
              </Button>
            </ButtonGroup>
          </Nav>
          <NavbarText>
            <CreateModal
              textures={this.props.textures}
              name={this.props.name}
              tilemap={this.props.tilemap}
              create={this.props.create}
              save={this.props.saveMap}
            />
          </NavbarText>
          <NavbarText>
            <LoadModal
              name={this.props.name}
              tilemap={this.props.tilemap}
              save={this.props.saveMap}
              get={this.props.getMaps}
              loadMap={this.loadMap}
              getMaps={this.props.getMaps}
              maps={this.props.maps}
              deleteMap={this.props.deleteMap}
            />
          </NavbarText>
          <NavbarText>
            <SaveModal
              name={this.props.name}
              tilemap={this.props.tilemap}
              getMaps={this.props.getMaps}
              save={this.props.saveMap}
              maps={this.props.maps}
            />
          </NavbarText>
        </Navbar>
      </div>
    );
  }
}

export default MenuBar;
