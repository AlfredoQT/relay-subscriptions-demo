import React from 'react';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';

function Item(/* { item } */) {
  return <div>Hello</div>;
}

Item.propTypes = {
  item: PropTypes.object.isRequired
};

export default createFragmentContainer(
  Item,
  graphql`
    fragment Item_item on Item {
      id
      name
      quantity
      requests {
        
      }
    }
  `
);
