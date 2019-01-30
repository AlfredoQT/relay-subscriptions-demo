import buildObjectFromQuery from '../utils/buildObjectFromQuery';

function createItem(parent, args, context, info) {
  const { name, quantity } = args.input;
  return context.db
    .collection('items')
    .insertOne({
      name,
      quantity
    })
    .then(result => {
      const { _id, ...noId } = result.ops[0];
      return { id: _id, ...noId };
    });
}

function updateItem(parent, args, context, info) {
  const update = buildObjectFromQuery(args.input, ['name', 'quantity']);

  return context.db
    .collection('items')
    .findOneAndUpdate(
      {
        _id: args.input.id
      },
      update,
      {
        returnNewDocument: true
      }
    )
    .then(result => {
      const { _id, ...noId } = result;
      return { id: _id, ...noId };
    });
}

export default {
  createItem,
  updateItem
};
