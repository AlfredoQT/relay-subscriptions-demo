import { commitMutation, graphql } from 'react-relay';

const mutation = graphql`
  mutation CreateRequestMutation($input: CreateRequestInput!) {
    createRequest(input: $input) {
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

function CreateRequest(environment, input) {
  commitMutation(environment, {
    variables: { input },
    mutation: mutation
  });
}

export default CreateRequest;
