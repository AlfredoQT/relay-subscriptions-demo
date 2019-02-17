import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { createFragmentContainer, graphql } from 'react-relay';
import Button from '@material-ui/core/Button';
import NewRequestDialog from '../NewRequestDialog';
import ItemRequestEntry from '../ItemRequestEntry/ItemRequestEntry';
import './ItemRequestList.css';

function ItemRequestList({ requests, onAddRequest, onDeliverRequest }) {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleAdd(input) {
    handleClose();
    onAddRequest(input);
  }

  return (
    <div>
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          marginBottom: '24px'
        }}
      >
        Pedidos
      </h2>
      <Button
        variant="contained"
        style={{
          marginBottom: '24px'
        }}
        onClick={handleOpen}
      >
        Nuevo Pedido
      </Button>
      <NewRequestDialog onAdd={handleAdd} open={open} onClose={handleClose} />
      {requests.length === 0 ? (
        <p
          style={{
            fontSize: '1rem',
            fontWeight: 'bold'
          }}
        >
          No hay pedidos
        </p>
      ) : (
        <ul className="ItemRequestListContainer">
          {requests.map(el => (
            <ItemRequestEntry
              request={el}
              key={el.__id}
              onDeliver={onDeliverRequest}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

ItemRequestList.propTypes = {
  requests: PropTypes.array.isRequired,
  onAddRequest: PropTypes.func.isRequired,
  onDeliverRequest: PropTypes.func.isRequired
};

export default createFragmentContainer(
  ItemRequestList,
  graphql`
    fragment ItemRequestList_requests on Request @relay(plural: true) {
      ...ItemRequestEntry_request
    }
  `
);
