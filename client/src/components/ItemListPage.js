import React, { useState } from 'react';
import { QueryRenderer, graphql } from 'react-relay';

import environment from '../Environment';

import ItemList from './ItemList';
import Button from '@material-ui/core/Button';
import NewItemDialog from './NewItemDialog';
import Spinner from './Spinner';

const ItemListPageQuery = graphql`
  query ItemListPageQuery {
    listItems {
      ...ItemList_listItems
    }
  }
`;

function ItemListPage() {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <QueryRenderer
      environment={environment}
      query={ItemListPageQuery}
      render={({ error, props }) => {
        if (error) {
          return <div>{error.message}</div>;
        } else if (props) {
          return (
            <section>
              <h1
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '24px'
                }}
              >
                Inventario
              </h1>
              <Button
                variant="contained"
                style={{
                  marginBottom: '24px'
                }}
                onClick={handleOpen}
              >
                Añadir
              </Button>
              {/* eslint-disable-next-line react/prop-types */}
              <ItemList listItems={props.listItems} />
              <NewItemDialog open={open} onClose={handleClose} />
            </section>
          );
        }
        return <Spinner size="large" />;
      }}
    />
  );
}

export default ItemListPage;
