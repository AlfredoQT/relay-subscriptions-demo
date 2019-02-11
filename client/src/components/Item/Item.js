import React from 'react';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';
import { Button } from '@material-ui/core';

function Item({ item, onDelete }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <div>
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: 'bold'
          }}
        >
          {item.name}
        </h1>
      </div>
      <Button variant="contained" onClick={onDelete}>
        Eliminar
      </Button>
    </div>
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
      # quantity
      # requests {
      #   ...ItemRequestList_listRequests
      # }
    }
  `
);
