import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';

import './Item.css';
import UpdateItem from '../../mutations/UpdateItem';
import environment from '../../Environment';
import ItemRequestList from '../ItemRequestList/ItemRequestList';
import CreateRequest from '../../mutations/CreateRequest';

function Item({ item, onDelete }) {
  let textInput = null;
  const [nameInput, setNameInput] = useState(item.name);
  const [nameDisabled, setNameDisabled] = useState(true);
  useEffect(
    () => {
      textInput.focus();
    },
    [nameDisabled]
  );

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

  function handleModifyQuantity(quantity) {
    UpdateItem(environment, {
      id: item.id,
      quantity: item.quantity + quantity
    });
  }

  function handleAddRequest(input) {
    UpdateItem(environment, {
      id: item.id,
      quantity: item.quantity - input.quantity
    });
    CreateRequest(environment, {
      ...input,
      item: item.id
    });
  }

  return (
    <>
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginBottom: '24px'
        }}
      >
        Información
      </h2>
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
      <ItemRequestList
        requests={item.requests}
        onAddRequest={handleAddRequest}
      />
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
      requests {
        ...ItemRequestList_requests
      }
    }
  `
);
