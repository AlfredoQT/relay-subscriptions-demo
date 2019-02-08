// import React from 'react';
import PropTypes from 'prop-types';

import { createFragmentContainer, graphql } from 'react-relay';

function ItemRequestList(/* {} */) {}

ItemRequestList.propTypes = {
  listRequests: PropTypes.array.isRequired
};

export default createFragmentContainer(
  ItemRequestList,
  graphql`
    fragment ItemRequestList_listRequests on Request @relay(plural: true) {
      
    }
  `
);
