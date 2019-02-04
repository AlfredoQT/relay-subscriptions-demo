import { commitMutation, graphql } from 'react-relay';

const mutation = graphql`
  mutation CreateItemMutation($input: CreateItemInput!) {
    createItem(input: $input) {
      item {
        id
        name
        quantity
      }
    }
  }
`;

function CreateItem(environment, input) {
  commitMutation(environment, {
    variables: { input },
    mutation: mutation,
    updater: store => {
      const createItem = store.getRootField('createItem');
      const newItem = createItem.getLinkedRecord('item');
      const prevItems = store.getRoot().getLinkedRecords('listItems');
      store.getRoot().setLinkedRecords([...prevItems, newItem], 'listItems');
    }
  });
}

export default CreateItem;
