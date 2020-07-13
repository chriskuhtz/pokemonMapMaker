import React from "react";
import "./InteractionBar.css";
import { Button } from "reactstrap";
import InteractionModal from "./InteractionModal";

class InteractionBar extends React.Component {
  render() {
    return (
      <div
        style={{
          padding: 4,
          //marginTop: 7,
          backgroundColor: "rgb(0,8,22)",
          color: "rgb(248,249,250",
          height: "100%",
          minHeight: "100vh",
          overflow: "scroll",
        }}
      >
        <h3>Interactions:</h3>
        <div className="subList">
          <h5>Assigned:</h5>
          {this.props.tilemap.map((
            r //maps each Row of the map
          ) =>
            r
              .filter((c) => c.object.hasOwnProperty("interaction") === true)
              .filter(
                (c) =>
                  c.object.name === "Item" ||
                  c.object.name === "Trigger" ||
                  c.object.style === "person"
              )
              .map((c) =>
                c.row === this.props.highlight[0] && //maps all tiles in the row, content is decided based on Highlight(yes/no)
                c.col === this.props.highlight[1] ? (
                  <div>
                    {/*console.log(c)*/}
                    <Button
                      style={{
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                        marginLeft: 1,
                        width: "98%",
                      }}
                      color={
                        c.object.interaction !== undefined
                          ? c.object.interaction.color
                          : "danger"
                      }
                      onClick={() => this.props.setHighlight(c.row, c.col)}
                    >
                      [{c.row}][{c.col}]{c.object.name}
                    </Button>
                    <InteractionModal
                      pokemon={this.props.pokemon}
                      items={this.props.items}
                      name={this.props.name}
                      tilemap={this.props.tilemap}
                      tile={c}
                      maps={this.props.maps}
                      place={this.props.place}
                    />
                  </div>
                ) : (
                  <Button
                    color={
                      c.object.interaction !== undefined
                        ? c.object.interaction.color
                        : "danger"
                    }
                    style={{ marginLeft: 1, width: "98%" }}
                    onClick={() => this.props.setHighlight(c.row, c.col)}
                  >
                    [{c.row}][{c.col}]{c.object.name}
                  </Button>
                )
              )
          )}
        </div>
        <div className="subList">
          <h5>Not Assigned:</h5>
          {this.props.tilemap.map((
            r //maps each Row of the map
          ) =>
            r
              .filter((c) => c.object.hasOwnProperty("interaction") === false)
              .filter(
                (c) =>
                  c.object.name === "Item" ||
                  c.object.name === "Trigger" ||
                  c.object.style === "person"
              )
              .map((c) =>
                c.row === this.props.highlight[0] && //maps all tiles in the row, content is decided based on Highlight(yes/no)
                c.col === this.props.highlight[1] ? (
                  <div>
                    {/*console.log(c)*/}
                    <Button
                      style={{
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                        marginLeft: 1,
                        width: "98%",
                      }}
                      color="light"
                      onClick={() => this.props.setHighlight(c.row, c.col)}
                    >
                      [{c.row}][{c.col}]{c.object.name}
                    </Button>
                    <InteractionModal
                      pokemon={this.props.pokemon}
                      items={this.props.items}
                      name={this.props.name}
                      tilemap={this.props.tilemap}
                      tile={c}
                      maps={this.props.maps}
                      place={this.props.place}
                    />
                  </div>
                ) : (
                  <Button
                    color="light"
                    style={{ marginLeft: 1, width: "98%" }}
                    onClick={() => this.props.setHighlight(c.row, c.col)}
                  >
                    [{c.row}][{c.col}]{c.object.name}
                  </Button>
                )
              )
          )}
        </div>
      </div>
    );
  }
}
export default InteractionBar;
