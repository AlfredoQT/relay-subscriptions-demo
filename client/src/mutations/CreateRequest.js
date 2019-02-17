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
        applicant {
          name
          registrationNumber
        }
      }
    }
  }
`;

function CreateRequest(environment, input) {
  commitMutation(environment, {
    variables: { input },
    mutation: mutation,
    updater: store => {
      const item = store.get(input.item);
      const createRequest = store.getRootField('createRequest');
      const request = createRequest.getLinkedRecord('request');
      item.setLinkedRecords(
        [request, ...item.getLinkedRecords('requests')],
        'requests'
      );
    }
  });
}

export default CreateRequest;
