import React from 'react';
import { QueryRenderer, graphql } from 'react-relay';

import environment from '../Environment';
import Spinner from './Spinner';

const ItemPageQuery = graphql`
  query ItemPageQuery($itemID: ID!) {
    getItem(id: $itemID) {
      ...Item_item
    }
  }
`;

function ItemPage() {
  return (
    <QueryRenderer
      environment={environment}
      query={ItemPageQuery}
      render={({ error, props }) => {
        if (error) {
          return <div>{error.message}</div>;
        } else if (props) {
          return <section />;
        }
        return <Spinner size="large" />;
      }}
    />
  );
}

export default ItemPage;
