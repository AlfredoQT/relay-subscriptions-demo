import { ObjectID } from 'mongodb';

import buildObjectFromQuery from '../utils/buildObjectFromQuery';

function createItem(parent, args, context, info) {
  const { name, quantity, clientMutationId } = args.input;
  return context.db
    .collection('items')
    .insertOne({
      name,
      quantity,
      requests: [],
      __type: 'Item'
    })
    .then(result => ({ item: result.ops[0], clientMutationId }));
}

function updateItem(parent, args, context, info) {
  const update = buildObjectFromQuery(args.input, ['name', 'quantity']);
  return context.db
    .collection('items')
    .findOneAndUpdate(
      {
        _id: ObjectID.createFromHexString(args.input.id)
      },
      { $set: update },
      {
        returnOriginal: false
      }
    )
    .then(response => ({
      item: response,
      clientMutationId: args.input.clientMutationId
    }));
}

function createApplicant(parent, args, context, info) {
  const { registrationNumber, clientMutationId } = args.input;
  return context.db
    .collection('applicants')
    .insertOne({
      registrationNumber: registrationNumber.toUpperCase(),
      requests: [],
      __type: 'Applicant'
    })
    .then(result => ({ applicant: result.ops[0], clientMutationId }));
}

function createRequest(parent, args, context, info) {
  const { applicant, item, clientMutationId } = args.input;
  return context.db
    .collection('requests')
    .insertOne({
      applicant: ObjectID.createFromHexString(applicant),
      item: ObjectID.createFromHexString(item),
      dateRequested: new Date(Date.now()),
      __type: 'Request'
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
      return { request: result.ops[0], clientMutationId };
    });
}

export default {
  createItem,
  updateItem,
  createApplicant,
  createRequest
};
