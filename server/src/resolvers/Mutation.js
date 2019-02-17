import { ObjectID } from 'mongodb';

import buildObjectFromQuery from '../utils/buildObjectFromQuery';
import { fromGlobalId } from '../utils/globalId';

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
  const { id } = fromGlobalId(args.input.id);
  return context.db
    .collection('items')
    .findOneAndUpdate(
      {
        _id: ObjectID.createFromHexString(id)
      },
      { $set: update },
      {
        returnOriginal: false
      }
    )
    .then(response => ({
      item: response.value,
      clientMutationId: args.input.clientMutationId
    }));
}

function updateRequest(parent, args, context, info) {
  const update = buildObjectFromQuery(args.input, [
    'dateRequested',
    'delivered',
    'dateDelivered',
    'quantity'
  ]);
  const { id } = fromGlobalId(args.input.id);
  return context.db
    .collection('requests')
    .findOneAndUpdate(
      {
        _id: ObjectID.createFromHexString(id)
      },
      { $set: update },
      {
        returnOriginal: false
      }
    )
    .then(response => ({
      request: response.value,
      clientMutationId: args.input.clientMutationId
    }));
}

function deleteItem(parent, args, context, info) {
  const { id } = fromGlobalId(args.input.id);
  return context.db
    .collection('items')
    .findOneAndDelete({
      _id: ObjectID.createFromHexString(id)
    })
    .then(async response => {
      await context.db.collection('requests').deleteMany({
        item: response.value._id
      });
      return response;
    })
    .then(response => ({
      item: response.value,
      clientMutationId: args.input.clientMutationId
    }));
}

function createApplicant(parent, args, context, info) {
  const { registrationNumber, clientMutationId, name, semester } = args.input;
  return context.db
    .collection('applicants')
    .insertOne({
      registrationNumber: registrationNumber.toUpperCase(),
      requests: [],
      name,
      semester,
      __type: 'Applicant'
    })
    .then(result => ({ applicant: result.ops[0], clientMutationId }));
}

function createRequest(parent, args, context, info) {
  const { applicant, item, clientMutationId, quantity } = args.input;
  const { id: parsedItemId } = fromGlobalId(item);
  const { id: parsedApplicantId } = fromGlobalId(applicant);

  return context.db
    .collection('requests')
    .insertOne({
      applicant: ObjectID.createFromHexString(parsedApplicantId),
      item: ObjectID.createFromHexString(parsedItemId),
      dateRequested: new Date(Date.now()),
      delivered: false,
      quantity,
      __type: 'Request'
    })
    .then(result => result.ops[0])
    .then(async request => {
      await context.db.collection('items').updateOne(
        {
          _id: ObjectID.createFromHexString(parsedItemId)
        },
        {
          $push: { requests: request._id }
        }
      );
      await context.db.collection('applicants').updateOne(
        {
          _id: ObjectID.createFromHexString(parsedApplicantId)
        },
        {
          $push: { requests: request._id }
        }
      );
      console.log(request);
      return {
        request,
        clientMutationId
      };
    });
}

export default {
  createItem,
  updateItem,
  createApplicant,
  createRequest,
  deleteItem,
  updateRequest
};
