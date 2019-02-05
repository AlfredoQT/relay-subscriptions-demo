import React, { useState } from 'react';
import { QueryRenderer, graphql } from 'react-relay';

import environment from '../Environment';

import ItemList from './ItemList';
import Button from '@material-ui/core/Button';
import NewItemDialog from './NewItemDialog';
import Spinner from './Spinner';
import CreateItem from '../mutations/CreateItem';
import DeleteItem from '../mutations/DeleteItem';
import DeleteItemDialog from './DeleteItemDialog';

const ItemListPageQuery = graphql`
  query ItemListPageQuery {
    listItems {
      ...ItemList_listItems
    }
  }
`;

function ItemListPage() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  function handleOpen(operation) {
    if (operation === 'add') {
      setOpenAdd(true);
    } else if (operation === 'delete') {
      setOpenDelete(true);
    }
  }

  function handleClose(operation) {
    if (operation === 'add') {
      setOpenAdd(false);
    } else if (operation === 'delete') {
      setOpenDelete(false);
    }
  }

  function handleOperation(operation, input) {
    if (operation === 'add') {
      CreateItem(environment, input);
      setOpenAdd(false);
    } else if (operation === 'delete') {
      DeleteItem(environment, input);
      setOpenDelete(false);
    }
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
                onClick={() => handleOpen('add')}
              >
                Añadir
              </Button>
              <ItemList
                /* eslint-disable-next-line react/prop-types */
                listItems={props.listItems}
                onDelete={item => {
                  setSelectedItem(item);
                  handleOpen('delete');
                }}
              />
              <NewItemDialog
                open={openAdd}
                onClose={() => handleClose('add')}
                onAdd={input => handleOperation('add', input)}
              />
              <DeleteItemDialog
                item={selectedItem}
                open={openDelete && selectedItem !== null}
                onClose={() => handleClose('delete')}
                onDelete={input => handleOperation('delete', input)}
              />
            </section>
          );
        }
        return <Spinner size="large" />;
      }}
    />
  );
}

export default ItemListPage;
