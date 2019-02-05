import { commitMutation, graphql } from 'react-relay';

const mutation = graphql`
  mutation DeleteItemMutation($input: DeleteItemInput!) {
    deleteItem(input: $input) {
      item {
        id
      }
    }
  }
`;

function DeleteItem(environment, input) {
  commitMutation(environment, {
    variables: { input },
    mutation: mutation,
    updater: store => {
      const deleteItem = store.getRootField('deleteItem');
      const deletedItem = deleteItem.getLinkedRecord('item');
      const id = deletedItem.getValue('id');
      store.delete(id);
    }
  });
}

export default DeleteItem;
