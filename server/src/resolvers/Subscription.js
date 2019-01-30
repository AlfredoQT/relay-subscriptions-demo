import changeStreamToAsyncIterator from '../utils/changeStreamToAsyncIterator';

const onCreateItem = {
  subscribe: (parent, args, context, info) =>
    changeStreamToAsyncIterator(context.db.collection('items'), [
      {
        $match: { operationType: 'insert' }
      }
    ]),
  resolve: payload => payload
};

export default {
  onCreateItem
};
