import { commitMutation, graphql } from 'react-relay';

const mutation = graphql`
  mutation UpdateItemMutation($input: UpdateItemInput!) {
    updateItem(input: $input) {
      item {
        id
        name
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
      const name = updatedItem.getValue('name');
      const quantity = updatedItem.getValue('quantity');
      store.get(id).setValue(quantity, 'quantity');
      store.get(id).setValue(name, 'name');
    }
  });
}

export default UpdateItem;
