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
  const { applicant, item, clientMutationId, quantity } = args.input;
  const { id: parsedItemId } = fromGlobalId(item);

  return context.db
    .collection('applicants')
    .findOne({
      registrationNumber: applicant
    })
    .then(async result => {
      let applicantResult = result;
      if (!applicantResult) {
        const applicantWriteResult = await context.db
          .collection('applicants')
          .insertOne({
            registrationNumber: applicant,
            __type: 'Applicant'
          });
        applicantResult = applicantWriteResult.ops[0];
      }
      return applicantResult;
    })
    .then(async applicantResult => {
      const requestWriteResult = await context.db
        .collection('requests')
        .insertOne({
          applicant: applicantResult._id,
          item: ObjectID.createFromHexString(parsedItemId),
          dateRequested: new Date(Date.now()),
          delivered: false,
          quantity,
          __type: 'Request'
        });
      return { requestResult: requestWriteResult.ops[0], applicantResult };
    })
    .then(async ({ requestResult, applicantResult }) => {
      await context.db.collection('items').updateOne(
        {
          _id: ObjectID.createFromHexString(parsedItemId)
        },
        {
          $push: { requests: requestResult._id }
        }
      );
      await context.db.collection('applicants').updateOne(
        {
          _id: applicantResult._id
        },
        {
          $push: { requests: requestResult._id }
        }
      );
      return { request: requestResult, clientMutationId };
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
