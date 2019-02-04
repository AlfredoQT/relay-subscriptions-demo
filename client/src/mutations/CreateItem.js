import { commitMutation, graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';

const mutation = graphql`
  mutation CreateItemMutation($input: CreateItemInput!) {
    createItem(input: $input) {
      id
      name
      quantity
    }
  }
`;

function createItem(environment, input) {
  commitMutation(environment, {
    variables: { input },
    mutation: mutation,
    updater: store => {
      const payload = store.getRootField('createItem');
    }
  });
}

export default createItem;
