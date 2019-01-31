import React from 'react';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';

import { Button } from '@material-ui/core';
import './ItemEntry.css';

function ItemEntry({ item }) {
  return (
    <li className="ItemListItemContainer">
      <div className="ItemListItemInformationContainer">
        <div className="ItemListItemQuantityOperationsContainer">
          <Button variant="contained" color="primary">
            -
          </Button>
          <div className="ItemListItemInformationQuantityContainer">
            <span>{item.quantity}</span>
          </div>
          <Button variant="contained" color="primary">
            +
          </Button>
        </div>
        <span className="ItemListItemInformationName">{item.name}</span>
        {/* <Icon
          path={ChevronRight}
          size={1.5}
          className="ItemListItemGoToDetails"
        /> */}
      </div>
    </li>
  );
}

ItemEntry.propTypes = {
  item: PropTypes.object.isRequired
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
