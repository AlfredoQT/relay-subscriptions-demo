import { commitMutation, graphql } from 'react-relay';

const mutation = graphql`
  mutation CreateApplicantMutation($input: CreateApplicantInput!) {
    createApplicant(input: $input) {
      applicant {
        id
      }
    }
  }
`;

function CreateApplicant(environment, input, onCompleted = () => {}) {
  commitMutation(environment, {
    variables: { input },
    mutation: mutation,
    onCompleted
  });
}

export default CreateApplicant;
