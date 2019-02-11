import React from 'react';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';
import { Button } from '@material-ui/core';

import UpdateItem from '../../mutations/UpdateItem';
import './ItemEntry.css';
import environment from '../../Environment';

import Icon from '../Icon';
import ChevronRight from '../icons/ChevronRight';

function ItemEntry({ item, onClick }) {
  function handleModifyQuantity(quantity) {
    UpdateItem(environment, {
      id: item.id,
      quantity: item.quantity + quantity
    });
  }

  function handleClick(el) {
    if (
      !el.target.attributes.getNamedItem('data-modifier') &&
      !el.target.parentElement.attributes.getNamedItem('data-modifier')
    ) {
      onClick();
    }
  }

  return (
    <li>
      <div
        className="ItemListItemContainer"
        onClick={handleClick}
        onKeyUp={handleClick}
        role="link"
        tabIndex={0}
      >
        <div className="ItemListItemInformationContainer">
          <div className="ItemListItemQuantityOperationsContainer">
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleModifyQuantity(-1)}
              data-modifier={true}
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
              data-modifier={true}
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
      </div>
    </li>
  );
}

ItemEntry.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
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
