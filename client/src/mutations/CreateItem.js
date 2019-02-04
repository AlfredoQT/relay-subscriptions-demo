import { commitMutation, graphql } from 'react-relay';

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
    mutation: mutation
  });
}

export default createItem;
