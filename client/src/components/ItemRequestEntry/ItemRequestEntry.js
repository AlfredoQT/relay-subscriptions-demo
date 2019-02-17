import React from 'react';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';
import Button from '@material-ui/core/Button';

import './ItemRequestEntry.css';

function ItemRequestEntry({ request, onDeliver }) {
  let date = '';

  function handleDeliver() {
    onDeliver({
      id: request.id,
      delivered: true,
      dateDelivered: Date.now(),
      quantity: Number.parseInt(request.quantity, 10)
    });
  }

  const dateOptions = {
    minute: '2-digit',
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit'
  };
  date = `Pedido: ${new Date(request.dateRequested).toLocaleDateString(
    'es-MX',
    dateOptions
  )}`;
  if (request.delivered) {
    date = `Regresado: ${new Date(request.dateDelivered).toLocaleDateString(
      'es-MX',
      dateOptions
    )}`;
  }
  return (
    <li className="ItemRequestEntryContainer">
      <div className="ItemRequestEntryDetails">
        <span className="ItemRequestEntryQuantity">{`Cantidad: ${
          request.quantity
        }`}</span>
        <span className="ItemRequestEntryApplicantNumber">
          {request.applicant.registrationNumber}
        </span>
        <span className="ItemRequestEntryApplicantName">
          {request.applicant.name}
        </span>
        <span>{date}</span>
      </div>
      {!request.delivered && (
        <Button variant="contained" color="secondary" onClick={handleDeliver}>
          Regresar
        </Button>
      )}
    </li>
  );
}

ItemRequestEntry.propTypes = {
  request: PropTypes.object.isRequired,
  onDeliver: PropTypes.func.isRequired
};

export default createFragmentContainer(
  ItemRequestEntry,
  graphql`
    fragment ItemRequestEntry_request on Request {
      id
      applicant {
        registrationNumber
        name
      }
      dateRequested
      dateDelivered
      delivered
      quantity
    }
  `
);
