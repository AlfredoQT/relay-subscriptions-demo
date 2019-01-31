import { ObjectID } from 'mongodb';

import buildObjectFromQuery from '../utils/buildObjectFromQuery';

function createItem(parent, args, context, info) {
  const { name, quantity } = args.input;
  return context.db
    .collection('items')
    .insertOne({
      name,
      quantity,
      requests: []
    })
    .then(result => result.ops[0]);
}

function updateItem(parent, args, context, info) {
  const update = buildObjectFromQuery(args.input, ['name', 'quantity']);
  return context.db.collection('items').findOneAndUpdate(
    {
      _id: ObjectID.createFromHexString(args.input.id)
    },
    { $set: update },
    {
      returnOriginal: false
    }
  );
}

function createApplicant(parent, args, context, info) {
  const { registrationNumber } = args.input;
  return context.db
    .collection('applicants')
    .insertOne({
      registrationNumber: registrationNumber.toUpperCase(),
      requests: []
    })
    .then(result => result.ops[0]);
}

function createRequest(parent, args, context, info) {
  const { applicant, item } = args.input;
  return context.db
    .collection('requests')
    .insertOne({
      applicant: ObjectID.createFromHexString(applicant),
      item: ObjectID.createFromHexString(item),
      dateRequested: new Date(Date.now())
    })
    .then(async result => {
      await context.db.collection('items').updateOne(
        {
          _id: ObjectID.createFromHexString(item)
        },
        {
          $push: { requests: result.ops[0]._id }
        }
      );
      await context.db.collection('applicants').updateOne(
        {
          _id: ObjectID.createFromHexString(applicant)
        },
        {
          $push: { requests: result.ops[0]._id }
        }
      );
      return result.ops[0];
    });
}

export default {
  createItem,
  updateItem,
  createApplicant,
  createRequest
};
