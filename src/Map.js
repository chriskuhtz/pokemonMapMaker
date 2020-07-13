import React from "react";
import "./Map.css";
import { Button } from "reactstrap";

const Map = (props) => {
  //<td style={{height:"30px", width:"30px", backgroundColor:"green"}}></td>
  let viewport = props.tilemap
    .slice(props.y, props.y + props.yLimit)
    .map((r) => r.slice(props.x, props.x + props.xLimit));
  return (
    <div
      style={{
        position: "absolute",
        top: 7,
        left: 7,
        height: 650,
        width: 850,

        backgroundColor: "rgb(0,8,22)",
        color: "rgb(248,249,250)",
      }}
    >
      <div //Dimensions of Map:
        style={{
          position: "absolute",
          borderTop: "solid",
          borderLeft: "solid",
          borderBottom: "solid",
          borderWidth: 1,
          borderTopLeftRadius: 5,
          top: 0,
          left: 0,
          height: 40,
          width: 100,
          textAlign: "center",
          color: "rgb(248,249,250)",
        }}
      >
        {props.tilemap[0].length}/{props.tilemap.length}
      </div>
      <div //Current Coordinates:
        style={{
          position: "absolute",
          borderTop: "solid",
          borderRight: "solid",
          borderBottom: "solid",
          borderWidth: 1,
          borderTopRightRadius: 5,
          top: 0,
          left: 750,
          height: 40,
          width: 100,
          textAlign: "center",
          color: "rgb(248,249,250)",
        }}
      >
        {props.x}/{props.y}
      </div>
      <Button //UP:
        outline
        color="light"
        style={{
          borderRadius: 0,
          position: "absolute",
          top: 0,
          left: 100,
          width: 650,
          height: 40,
        }}
        onClick={() => props.scroll("y", -1)}
      >
        ^
      </Button>
      <Button //RIGHT:
        outline
        color="light"
        style={{
          borderTop: "none",
          borderBottom: "none",
          borderRadius: 0,
          position: "absolute",
          top: 40,
          left: 800,
          width: 50,
          height: 570,
        }}
        onClick={() => props.scroll("x", 1)}
      >
        {">"}
      </Button>
      <Button //DOWN:
        outline
        color="light"
        style={{
          borderRadius: 0,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          position: "absolute",
          top: 610,
          left: 0,
          width: 850,
          height: 40,
        }}
        onClick={() => props.scroll("y", 1)}
      >
        v
      </Button>
      <Button //LEFT:
        outline
        color="light"
        style={{
          borderTop: "none",
          borderBottom: "none",
          borderRadius: 0,
          position: "absolute",
          top: 40,
          left: 0,
          width: 50,
          height: 570,
        }}
        onClick={() => props.scroll("x", -1)}
      >
        {"<"}
      </Button>

      {props.tilemap !== [] && props.tilemap !== undefined
        ? viewport.map((r) => (
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
                    c.row === props.highlight[0] &&
                    c.col === props.highlight[1]
                  ) {
                  }
                  return (
                    <div>
                      <div
                        style={{
                          //ToolTip Interaction Layer
                          position: "absolute",
                          top: (c.row - props.y) * 30 + 40,
                          left: (c.col - props.x) * 30 + 50,
                          zIndex: 3,
                          height: "30px",
                          width: "30px",
                        }}
                        onClick={() => props.place(c.row, c.col)}
                      />
                      <img //Object Layer
                        src={objUrl}
                        alt="put"
                        style={{
                          position: "absolute",
                          top:
                            (c.row + 1 - c.object.height - props.y) * 30 + 40, //+1 damit das object genau auf dem feld steht
                          left: (c.col - props.x) * 30 + 50,
                          zIndex: 2,
                          height: 30 * c.object.height,
                          width: 30 * c.object.width,
                          outlineStyle:
                            c.row === props.highlight[0] &&
                            c.col === props.highlight[1]
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
                          top: (c.row - props.y) * 30 + 40,
                          left: (c.col - props.x) * 30 + 50,
                          zIndex: 1,
                          height: "30px",
                          width: "30px",
                        }}
                      />
                    </div>
                  );
                } else {
                  //TILE WITHOUT OBJECT:
                  return (
                    <div>
                      <div // ToolTip interaction Layer
                        style={{
                          position: "absolute",
                          top: (c.row - props.y) * 30 + 40,
                          left: (c.col - props.x) * 30 + 50,
                          zIndex: 3,
                          height: "30px",
                          width: "30px",
                        }}
                        onClick={() => props.place(c.row, c.col)}
                      />
                      <img //tile Layer
                        src={tileUrl}
                        alt="put"
                        style={{
                          position: "absolute",
                          top: (c.row - props.y) * 30 + 40,
                          left: (c.col - props.x) * 30 + 50,
                          zIndex: 1,
                          height: "30px",
                          width: "30px",
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
};

export default Map;
