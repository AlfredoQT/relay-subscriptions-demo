// import React from 'react';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';

function ItemRequestEntry(/* { request } */) {}

ItemRequestEntry.propTypes = {
  request: PropTypes.object.isRequired
};

export default createFragmentContainer(
  ItemRequestEntry,
  graphql`
    fragment ItemRequestEntry_request on Item {
      id
      applicant {
        registrationNumber
      }
      dateRequested
      dateDelivered
      delivered
    }
  `
);
