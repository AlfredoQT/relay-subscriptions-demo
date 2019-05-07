import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import { getRequestItems, updateRequestItem, updateItem } from '../../api';
import Spinner from '../Spinner';
import RequestInventoryListItem from '../RequestInventoryListItem';

const styles = {
  itemsList: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    '&> li': {
      marginBottom: 16,
    },
  },
  gutterBottom: {
    marginBottom: 16,
  },
};

function RequestInventoryList({
  id,
  delivered,
  classes,
  onDeliverComplete,
  onDeliverPartial,
}) {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    let abortController = new AbortController();
    getRequestItems(id, { signal: abortController.signal }).then(itemsRes => {
      setItems(itemsRes.items);
      setLoading(false);
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  function shouldDeliverComplete(data) {
    if (data.quantityRequested !== data.quantityDelivered) {
      return false;
    }
    const itemsToCheck = items.filter(el => el.id !== data.id);
    let deliverComplete = true;
    itemsToCheck.forEach(el => {
      if (el.quantityRequested !== el.quantityDelivered) {
        deliverComplete = false;
      }
    });
    return deliverComplete;
  }

  function handleDeliver(data) {
    if (shouldDeliverComplete(data)) {
      updateRequestItem(id, data.id, data);
      updateItem(
        { ...data, quantity: data.quantity + data.quantityToIncrease },
        data.id
      );
      onDeliverComplete();
      return;
    }
    updateRequestItem(id, data.id, data).then(itemRes => {
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
    updateItem(
      { ...data, quantity: data.quantity + data.quantityToIncrease },
      data.id
    );
    onDeliverPartial();
  }

  function handleDeliverComplete() {
    const requestItemsToUpdate = items.filter(
      el => el.quantityDelivered !== el.quantityRequested
    );
    const requestItemsUpdates = requestItemsToUpdate.map(el => {
      const quantityToIncrease = el.quantityRequested - el.quantityDelivered;
      const quantityDelivered =
        el.quantityDelivered + (el.quantityRequested - el.quantityDelivered);
      return updateRequestItem(id, el.id, {
        ...el,
        quantityToIncrease,
        quantityDelivered,
      });
    });
    Promise.all(requestItemsUpdates);
    const itemsUpdates = requestItemsToUpdate.map(el => {
      const quantityToIncrease = el.quantityRequested - el.quantityDelivered;
      return updateItem(
        { ...el, quantity: el.quantity + quantityToIncrease },
        el.id
      );
    });
    Promise.all(itemsUpdates);
    onDeliverComplete();
  }

  return (
    <>
      {loading && <Spinner variant="centered" />}
      {!loading && (
        <>
          {!delivered && (
            <Button
              color="secondary"
              variant="contained"
              className={classes.gutterBottom}
              onClick={handleDeliverComplete}
            >
              Entregar Completo
            </Button>
          )}
          <ul className={classes.itemsList}>
            {items.map(el => (
              <RequestInventoryListItem
                key={el.id}
                item={el}
                delivered={delivered}
                onDeliver={handleDeliver}
              />
            ))}
          </ul>
        </>
      )}
    </>
  );
}

RequestInventoryList.propTypes = {
  delivered: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  onDeliverComplete: PropTypes.func,
  onDeliverPartial: PropTypes.func,
};

RequestInventoryList.propTypes = {
  onDeliverComplete: () => {},
  onDeliverPartial: () => {},
};

export default withStyles(styles)(RequestInventoryList);
