import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { QueryRenderer, graphql } from 'react-relay';

import environment from '../Environment';
import Spinner from './Spinner';
import Item from './Item/Item';
import Icon from './Icon';
import ChevronRight from './icons/ChevronRight';
import DeleteItemDialog from './DeleteItemDialog';
import DeleteItem from '../mutations/DeleteItem';

const ItemPageQuery = graphql`
  query ItemPageQuery($itemID: ID!) {
    item(id: $itemID) {
      ...Item_item
    }
  }
`;

function ItemPage({ onBack, id }) {
  const [deleteRequested, setDeleteRequested] = useState(false);

  function handleDeleteRequest() {
    setDeleteRequested(true);
  }

  function handleDeleteCancel() {
    setDeleteRequested(false);
  }

  function handleDelete(input) {
    onBack();
    DeleteItem(environment, input);
  }

  return (
    <QueryRenderer
      environment={environment}
      variables={{ itemID: id }}
      query={ItemPageQuery}
      render={({ error, props }) => {
        if (error) {
          return <div>{error.message}</div>;
        } else if (props) {
          return (
            <main>
              <div
                style={{
                  marginBottom: '16px'
                }}
              >
                <Icon
                  onClick={onBack}
                  path={ChevronRight}
                  size={2}
                  style={{
                    transform: 'rotate(180deg)'
                  }}
                />
              </div>
              {/* eslint-disable-next-line react/prop-types */}
              <Item item={props.item} onDelete={handleDeleteRequest} />
              <DeleteItemDialog
                open={deleteRequested}
                itemID={id}
                onClose={handleDeleteCancel}
                onDelete={handleDelete}
              />
            </main>
          );
        }
        return <Spinner size="large" />;
      }}
    />
  );
}

ItemPage.propTypes = {
  onBack: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default ItemPage;
