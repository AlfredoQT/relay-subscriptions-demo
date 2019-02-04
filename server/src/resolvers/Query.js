import { ObjectID } from 'mongodb';

import { fromGlobalId } from '../utils/globalId';

function listItems(parent, args, context, info) {
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

function listApplicants(parent, args, context, info) {
  let findFilter = {};
  if (args.filter && args.filter.registrationNumber) {
    const registrationNumber = args.filter.registrationNumber
      .toUpperCase()
      .replace(/[^\w\s]/g, '');
    findFilter = {
      registrationNumber: { $regex: new RegExp(registrationNumber) }
    };
  }
  return context.db
    .collection('applicants')
    .find(findFilter)
    .toArray();
}

export default {
  listItems,
  listApplicants,
  node
};
