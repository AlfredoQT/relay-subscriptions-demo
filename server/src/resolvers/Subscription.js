import changeStremToAsyncIterator from '../utils/changeStreamToAsyncIterator';

const newClient = {
  subscribe: () =>
    changeStremToAsyncIterator('clients', [
      {
        $match: {
          operationType: 'insert'
        }
      }
    ])
};

export default {
  newClient
};
