import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { createFragmentContainer, graphql } from 'react-relay';
import Button from '@material-ui/core/Button';
import NewRequestDialog from '../NewRequestDialog';

function ItemRequestList({ requests, onAddRequest }) {
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
        <ul />
      )}
    </div>
  );
}

ItemRequestList.propTypes = {
  requests: PropTypes.array.isRequired,
  onAddRequest: PropTypes.func.isRequired
};

export default createFragmentContainer(
  ItemRequestList,
  graphql`
    fragment ItemRequestList_requests on Request @relay(plural: true) {
      ...ItemRequestEntry_request
    }
  `
);
