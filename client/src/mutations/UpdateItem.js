import { commitMutation, graphql } from 'react-relay';

const mutation = graphql`
  mutation UpdateItemMutation($input: UpdateItemInput!) {
    updateItem(input: $input) {
      item {
        id
        quantity
      }
    }
  }
`;

function UpdateItem(environment, input) {
  commitMutation(environment, {
    variables: { input },
    mutation: mutation,
    updater: store => {
      const updateItem = store.getRootField('updateItem');
      const updatedItem = updateItem.getLinkedRecord('item');
      const id = updatedItem.getValue('id');
      const quantity = updatedItem.getValue('quantity');
      store.get(id).setValue(quantity, 'quantity');
    }
  });
}

export default UpdateItem;
