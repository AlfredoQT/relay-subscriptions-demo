import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import MainDrawer from '../MainDrawer';
import MainAppBar from '../MainAppBar';
import { getItems, putItem, updateItem } from '../../api';
import InventoryListItem from '../InventoryListItem';
import Spinner from '../Spinner';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import MutateInventoryDialog from '../MutateInventoryDialog';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    marginTop: 64,
    position: 'relative',
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    bottom: 48,
    right: 48,
  },
  itemsList: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    '&> li': {
      marginBottom: 16,
    },
  },
});

function InventoryScreen({ classes }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [primaryAction, setPrimaryAction] = useState('Añadir');
  const [title, setTitle] = useState('Nuevo item');
  const [itemId, setItemId] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemModel, setItemModel] = useState('');

  useEffect(() => {
    let abortController = new AbortController();
    getItems(null, { signal: abortController.signal }).then(itemsRes => {
      setItems(itemsRes.items);
      setLoading(false);
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  function handleOpenNew() {
    setPrimaryAction('Añadir');
    setTitle('Nuevo item');
    setOpen(true);
  }

  function handleMutation(item) {
    setOpen(false);
    if (primaryAction === 'Añadir') {
      putItem(item).then(itemRes => {
        setItems([...items, itemRes.item]);
      });
    } else if (primaryAction === 'Actualizar') {
      updateItem(item, item.id).then(itemRes => {
        const index = items.findIndex(
          itemIndexed => itemIndexed.id === itemRes.item.id
        );
        if (index !== -1) {
          setItems([
            ...items.slice(0, index),
            itemRes.item,
            ...items.slice(index + 1),
          ]);
        }
      });
    }
  }

  function handleEditRequest(item) {
    setItemId(item.id);
    setItemName(item.name);
    setItemQuantity(item.quantity);
    setItemModel(item.model);
    setPrimaryAction('Actualizar');
    setTitle('Actualizar item');
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setItemId('');
    setItemName('');
    setItemQuantity(1);
    setItemModel('');
  }

  function handleModifyQuantity(item, quantity) {
    updateItem({ quantity: item.quantity + quantity }, item.id).then(
      itemRes => {
        const index = items.findIndex(
          itemIndexed => itemIndexed.id === itemRes.item.id
        );

        if (index !== -1) {
          setItems([
            ...items.slice(0, index),
            itemRes.item,
            ...items.slice(index + 1),
          ]);
        }
      }
    );
  }

  return (
    <>
      <MutateInventoryDialog
        open={open}
        onClose={handleClose}
        onMutate={handleMutation}
        primaryAction={primaryAction}
        title={title}
        id={itemId}
        name={itemName}
        quantity={itemQuantity}
        model={itemModel}
      />
      <div className={classes.root}>
        <CssBaseline />
        <MainAppBar title="Inventario" />
        <MainDrawer />
        <main className={classes.content}>
          {loading && <Spinner />}
          {!loading && !items.length && (
            <Typography variant="h6">No hay items.</Typography>
          )}
          {!loading && items.length > 0 && (
            <ul className={classes.itemsList}>
              {items.map(itemMapped => (
                <InventoryListItem
                  item={itemMapped}
                  onEdit={() => handleEditRequest(itemMapped)}
                  onModifyQuantity={quantity =>
                    handleModifyQuantity(itemMapped, quantity)
                  }
                  key={itemMapped.id}
                />
              ))}
            </ul>
          )}
        </main>
      </div>
      <Fab
        color="secondary"
        aria-label="Add"
        className={classes.fabButton}
        onClick={handleOpenNew}
      >
        <AddIcon />
      </Fab>
    </>
  );
}

InventoryScreen.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InventoryScreen);
