import React from 'react';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';
import { Button } from '@material-ui/core';

import UpdateItem from '../../mutations/UpdateItem';
import './ItemEntry.css';
import environment from '../../Environment';

import Icon from '../Icon';
import ChevronRight from '../icons/ChevronRight';

function ItemEntry({ item, onDelete }) {
  function handleModifyQuantity(quantity) {
    UpdateItem(environment, {
      id: item.id,
      quantity: item.quantity + quantity
    });
  }

  return (
    <li className="ItemListItemContainer">
      <div className="ItemListItemInformationContainer">
        <div className="ItemListItemQuantityOperationsContainer">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleModifyQuantity(-1)}
          >
            -
          </Button>
          <div className="ItemListItemInformationQuantityContainer">
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
        <span className="ItemListItemInformationName">{item.name}</span>
        <Icon
          path={ChevronRight}
          size={1.5}
          className="ItemListItemGoToDetails"
        />
      </div>
      <div>
        <Button
          variant="contained"
          style={{
            marginRight: 12
          }}
        >
          Pedir
        </Button>
        <Button
          variant="contained"
          style={{
            marginRight: 12
          }}
        >
          Regresar
        </Button>
        <Button variant="contained" onClick={() => onDelete(item)}>
          Eliminar
        </Button>
      </div>
    </li>
  );
}

ItemEntry.propTypes = {
  item: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default createFragmentContainer(
  ItemEntry,
  graphql`
    fragment ItemEntry_item on Item {
      id
      name
      quantity
    }
  `
);
