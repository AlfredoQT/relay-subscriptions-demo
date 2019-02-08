import React from 'react';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';

import ItemEntry from '../ItemEntry';
import './ItemList.css';

function ItemList({ listItems }) {
  if (!listItems.length) {
    return (
      <p
        style={{
          fontSize: '1.5rem',
          fontWeight: 'bold'
        }}
      >
        No hay items.
      </p>
    );
  }
  return (
    <ul className="ItemListContainer">
      {listItems.map(el => (
        <ItemEntry key={el.__id} item={el} />
      ))}
    </ul>
  );
}

ItemList.propTypes = {
  listItems: PropTypes.array.isRequired
};

export default createFragmentContainer(
  ItemList,
  graphql`
    fragment ItemList_listItems on Item @relay(plural: true) {
      ...ItemEntry_item
    }
  `
);
