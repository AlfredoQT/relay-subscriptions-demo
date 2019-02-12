import { ObjectID } from 'mongodb';

import { fromGlobalId } from '../utils/globalId';

function items(parent, args, context, info) {
  return context.db
    .collection('items')
    .find({})
    .toArray();
}

function node(parent, args, context, info) {
  // Extract the type and id
  const { type, id } = fromGlobalId(args.id);
  return context.db
    .collection(`${type[0].toLowerCase()}${type.substring(1)}s`)
    .findOne({
      _id: ObjectID.createFromHexString(id)
    });
}

function item(parent, args, context, info) {
  // Extract the type and id
  const { type, id } = fromGlobalId(args.id);
  return context.db.collection('items').findOne({
    _id: ObjectID.createFromHexString(id)
  });
}

export default {
  items,
  node,
  item
};
