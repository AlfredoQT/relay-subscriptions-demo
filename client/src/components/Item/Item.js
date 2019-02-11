import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';

import './Item.css';
import UpdateItem from '../../mutations/UpdateItem';
import environment from '../../Environment';

function Item({ item, onDelete }) {
  const [nameInput, setNameInput] = useState(item.name);
  const [nameDisabled, setNameDisabled] = useState(true);
  let textInput = null;

  function setTextInput(element) {
    textInput = element;
  }

  function handleTextChange(event) {
    setNameInput(event.target.value);
  }

  function handleEditName() {
    setNameDisabled(false);
  }

  function handleSaveName() {
    UpdateItem(environment, {
      id: item.id,
      name: nameInput
    });
    setNameDisabled(true);
  }

  useEffect(
    () => {
      textInput.focus();
    },
    [nameDisabled]
  );

  function handleModifyQuantity(quantity) {
    UpdateItem(environment, {
      id: item.id,
      quantity: item.quantity + quantity
    });
  }

  return (
    <>
      <div className="ItemDetailsContainer">
        <div className="ItemUpdateNameContainer">
          <input
            ref={setTextInput}
            value={nameInput}
            onChange={handleTextChange}
            placeholder="Nombre"
            disabled={nameDisabled}
            className="ItemNameInputField"
          />
          {nameDisabled ? (
            <Button variant="contained" onClick={handleEditName}>
              <EditIcon className="ItemActionButtonLeftIcon" />
              Editar
            </Button>
          ) : (
            <Button variant="contained" onClick={handleSaveName}>
              <SaveIcon className="ItemActionButtonLeftIcon" />
              Guardar
            </Button>
          )}
        </div>
        <Button variant="contained" onClick={onDelete}>
          Eliminar
        </Button>
      </div>
      <div className="ItemQuantityOperationsContainer">
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleModifyQuantity(-1)}
        >
          -
        </Button>
        <div className="ItemInformationQuantityContainer">
          <span>{item.quantity}</span>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleModifyQuantity(1)}
        >
          +
        </Button>
      </div>
    </>
  );
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default createFragmentContainer(
  Item,
  graphql`
    fragment Item_item on Item {
      id
      name
      quantity
      # requests {
      #   ...ItemRequestList_listRequests
      # }
    }
  `
);
