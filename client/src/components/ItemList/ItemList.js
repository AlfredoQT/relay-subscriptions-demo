import React from 'react';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';

import ItemEntry from '../ItemEntry';
import './ItemList.css';

function ItemList({ items, onItemClick }) {
  if (!items.length) {
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
      {items.map(el => (
        <ItemEntry
          key={el.__id}
          item={el}
          onClick={() => onItemClick(el.__id)}
        />
      ))}
    </ul>
  );
}

ItemList.propTypes = {
  items: PropTypes.array.isRequired,
  onItemClick: PropTypes.func.isRequired
};

export default createFragmentContainer(
  ItemList,
  graphql`
    fragment ItemList_items on Item @relay(plural: true) {
      ...ItemEntry_item
    }
  `
);
