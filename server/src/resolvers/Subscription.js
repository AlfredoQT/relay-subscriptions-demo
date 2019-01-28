import changeStreamToAsyncIterator from '../utils/changeStreamToAsyncIterator';

const newClient = {
  subscribe: () =>
    changeStreamToAsyncIterator('clients', [
      {
        $match: {
          operationType: 'insert'
        }
      }
    ]),
  resolve: payload => payload
};

export default {
  newClient
};
