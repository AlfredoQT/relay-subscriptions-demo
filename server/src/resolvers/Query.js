import { ObjectID } from 'mongodb';

import { fromGlobalId } from '../utils/globalId';

function items(parent, args, context, info) {
  return context.db
    .collection('items')
    .find({})
    .toArray();
}

function applicant(parent, args, context, info) {
  const registrationNumber = args.input.registrationNumber;
  const { id } = fromGlobalId(args.input.id);

  const orExpression = [];

  // TODO: Refactor this if needed
  if (registrationNumber !== null) {
    orExpression.push({ registrationNumber: registrationNumber.toUpperCase() });
  }
  if (id !== undefined) {
    orExpression.push({ id: ObjectID.createFromHexString(id) });
  }

  if (!orExpression.length) {
    return null;
  }

  if (orExpression.length === 1) {
    return context.db.collection('applicants').findOne(orExpression[0]);
  }

  return context.db.collection('applicants').findOne({
    $or: orExpression
  });
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
  item,
  applicant
};
