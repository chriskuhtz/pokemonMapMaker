import React, { useState } from "react";
import { Button, Container, Row, Col } from "reactstrap";

//class SideBar extends React.Component
const SideBar = (props) => {
  const to = props.toolTip;
  const [highlight, setHighlight] = useState(-1);

  const handleHighlight = (i) => {
    if (highlight === i) {
      setHighlight(-1);
    } else {
      setHighlight(i);
    }
  };
  return (
    <div //Wrapper Div
      style={{
        padding: 4,
        marginTop: 7,
        backgroundColor: "rgb(0,8,22)",
        color: "rgb(248,249,250)",
        height: "100%",
        maxHeight: "90vh",
        overflow: "scroll",
      }}
    >
      <h3> Tile Editor:</h3>
      <h4 style={{ borderBottom: "solid", borderWidth: 1 }}>
        Current:
        <Button outline>
          {to.category === "tools" ? (
            to.name
          ) : (
            <p>
              {to.name}
              <img
                src={`${process.env.PUBLIC_URL}/assets/textures/${
                  to.category
                }/${to.hasOwnProperty("ori") ? to.name + to.ori : to.name}.png`}
                style={{
                  height: 30 * to.height,
                  width: 30 * to.width,
                  margin: "auto",
                }}
                alt="putt"
              />
            </p>
          )}
        </Button>
      </h4>

      {Object.entries(props.textures).map((c, i) => {
        return highlight === i ? (
          <div>
            <h4
              style={{
                borderBottom: "solid",
                borderWidth: 1,
                backgroundColor: "#A4243B",
              }}
              onClick={() => handleHighlight(i)}
            >
              {c[0]}
            </h4>
            <Container fluid>
              <Row style={{ borderBottom: "solid", borderWidth: 1 }}>
                {c[1].map((t) => (
                  <Col xs={t.width > 1 ? "12" : "6"}>
                    <Button outline onClick={() => props.toolTipChange(t)}>
                      {t.category === "tools" ? (
                        t.name
                      ) : (
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/textures/${
                            t.category
                          }/${
                            t.hasOwnProperty("ori") ? t.name + t.ori : t.name
                          }.png`}
                          style={{
                            height: 30 * t.height,
                            width: 30 * t.width,
                            margin: "auto",
                          }}
                          alt="putt"
                        />
                      )}
                    </Button>
                  </Col>
                ))}
              </Row>
            </Container>
          </div>
        ) : (
          <h4
            style={{ borderBottom: "solid", borderWidth: 1 }}
            onClick={() => handleHighlight(i)}
          >
            {c[0]}
          </h4>
        );
      })}
    </div>
  );
};

export default SideBar;
