import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const WelcomeModal = (props) => {
  const { className } = props;

  const [modal, setModal] = useState(true);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Modal size="lg" isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Welcome to PokemonMapMaker</ModalHeader>
        <ModalBody>
          <p>
            PokemonMapMaker is a React application that lets the user create 2D
            tilemaps similar to the ones used in older generation pokemon games.
          </p>
          <p>Quick Guide:</p>
          <ul>
            <li style={{ paddingBottom: 5 }}>
              Choose a tile or object from the left-side menu
            </li>
            <li style={{ paddingBottom: 5 }}>
              Click on a tile on the map to change it to the selected
              tile/object
            </li>
            <li style={{ paddingBottom: 5 }}>
              Turn: all persons and many objects can be rotated with the turn
              tool
            </li>
            <li style={{ paddingBottom: 5 }}>
              Areafill: pick a tile from the left side. Click on a field, then
              click on the diagonally opposite corner of the rectangle you want
              to fill, then click in the middle of the rectangle
            </li>
            <li style={{ paddingBottom: 5 }}>
              Trigger: place a trigger for custom code on any tile
            </li>
            <li style={{ paddingBottom: 5 }}>
              Use the Buttons around the map to move your viewport over larger
              maps, click "whole map" to see the entire map
            </li>
            <li style={{ paddingBottom: 5 }}>
              if you placed an object the player can interact with (person,item
              ...), assign an interaction with the right-side menu
            </li>
            <li style={{ paddingBottom: 5 }}>
              There are several types of interactions with different properties
            </li>
          </ul>
          <p>
            This application is only meant as proof of concept. You are free to
            try all the features, but there is no way to save or export your
            creations.
          </p>
          <ModalFooter>
            <p>
              Pokémon and Pokémon character names are trademarks of Nintendo.
            </p>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
};
export default WelcomeModal;
