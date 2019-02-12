import { commitMutation, graphql } from 'react-relay';

const mutation = graphql`
  mutation UpdateRequestMutation($input: UpdateRequestInput!) {
    updateRequest(input: $input) {
      request {
        id
        dateDelivered
        dateRequested
        delivered
        quantity
      }
    }
  }
`;

function UpdateRequest(environment, input) {
  commitMutation(environment, {
    variables: { input },
    mutation: mutation
  });
}

export default UpdateRequest;
