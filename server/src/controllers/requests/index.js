const { ObjectID } = require('mongodb');
const DatabaseConnector = require('../../utils/DatabaseConnector');
const buildObjectFromQuery = require('../../utils/buildObjectFromQuery');

async function post(req, res) {
  const { items, applicant, desiredDeliveryDate, pickupDate } = req.body;
  const requestsCount = await DatabaseConnector.getInstance()
    .getDatabase()
    .collection('requests')
    .count();

  const request = (await DatabaseConnector.getInstance()
    .getDatabase()
    .collection('requests')
    .insertOne({
      applicant: {
        id: ObjectID.createFromHexString(applicant.id),
        applicantNumber: applicant.registrationNumber
      },
      items: items.map(el => ({
        id: ObjectID.createFromHexString(el.id),
        quantityRequested: el.quantityRequested,
        quantityDelivered: el.quantityDelivered
      })),
      folio: requestsCount + 1,
      requestedDate: new Date(Date.now()),
      deliveredDate: null,
      pickupDate: new Date(pickupDate),
      desiredDeliveryDate: new Date(desiredDeliveryDate),
      status: 'toDeliver'
    })).ops[0];

  res.status(201).send({
    status: 'CREATED',
    request: { ...request, id: request._id }
  });
}

async function getSingle(req, res) {
  const { id } = req.params;
  if (id.length !== 24) {
    return res.status(200).send({
      status: 'OK',
      request: null
    });
  }
  const request = await DatabaseConnector.getInstance()
    .getDatabase()
    .collection('requests')
    .findOne({
      _id: ObjectID.createFromHexString(id)
    });

  res.status(200).send({
    status: 'OK',
    request: { ...request, id: request._id }
  });
}

async function put(req, res) {
  const { id } = req.params;
  const update = buildObjectFromQuery(req.body, ['status', 'deliveredDate']);

  if (update.deliveredDate) {
    update.deliveredDate = new Date(update.deliveredDate);
  }

  const request = (await DatabaseConnector.getInstance()
    .getDatabase()
    .collection('requests')
    .findOneAndUpdate(
      {
        _id: ObjectID.createFromHexString(id)
      },
      { $set: update },
      {
        returnOriginal: false
      }
    )).value;

  res.status(200).send({
    status: 'UPDATED',
    request: { ...request, id: request._id }
  });
}

async function getApplicant(req, res) {
  const { id } = req.params;

  const request = await DatabaseConnector.getInstance()
    .getDatabase()
    .collection('requests')
    .findOne({
      _id: ObjectID.createFromHexString(id)
    });

  const applicant = await DatabaseConnector.getInstance()
    .getDatabase()
    .collection('applicants')
    .findOne({
      _id: request.applicant.id
    });

  res.status(200).send({
    status: 'OK',
    applicant
  });
}

async function getItems(req, res) {
  const { id } = req.params;

  const request = await DatabaseConnector.getInstance()
    .getDatabase()
    .collection('requests')
    .findOne({
      _id: ObjectID.createFromHexString(id)
    });

  const items = await DatabaseConnector.getInstance()
    .getDatabase()
    .collection('items')
    .find({
      _id: { $in: request.items.map(el => el.id) }
    })
    .toArray();

  res.status(200).send({
    status: 'OK',
    items: items.map((el, index) => ({
      ...el,
      id: el._id,
      quantityRequested: request.items[index].quantityRequested,
      quantityDelivered: request.items[index].quantityDelivered
    }))
  });
}

async function get(req, res) {
  // Simply look for applicant's number
  let requests = (await DatabaseConnector.getInstance()
    .getDatabase()
    .collection('requests')
    .find({})
    .sort({ folio: -1 })
    .toArray()).map(el => ({ ...el, id: el._id }));

  return res.status(200).send({
    status: 'OK',
    requests
  });
}

// HACK: Super nasty hack
async function putItem(req, res) {
  const { id, itemID } = req.params;
  const update = buildObjectFromQuery(req.body, [
    'quantityDelivered',
    'quantityToIncrease'
  ]);
  await DatabaseConnector.getInstance()
    .getDatabase()
    .collection('requests')
    .updateOne(
      {
        _id: ObjectID.createFromHexString(id),
        'items.id': ObjectID.createFromHexString(itemID)
      },
      { $inc: { 'items.$.quantityDelivered': update.quantityToIncrease } }
    );

  return res.status(200).send({
    status: 'OK',
    item: {
      ...req.body,
      quantityDelivered: update.quantityDelivered,
      quantity: req.body.quantity + update.quantityToIncrease
    }
  });
}

module.exports = {
  post,
  getSingle,
  put,
  getApplicant,
  getItems,
  get,
  putItem
};
