const { ObjectID } = require('mongodb');
const DatabaseConnector = require('../../utils/DatabaseConnector');
const buildObjectFromQuery = require('../../utils/buildObjectFromQuery');

async function post(req, res) {
  const { items, applicant } = req.body;

  const requestsCount = await DatabaseConnector.getInstance()
    .getDatabase()
    .collection('requests')
    .count();

  const request = (await DatabaseConnector.getInstance()
    .getDatabase()
    .collection('requests')
    .insertOne({
      applicantNumber: applicant.registrationNumber,
      applicant: ObjectID.createFromHexString(applicant.id),
      items: items.map(el => ({
        item: ObjectID.createFromHexString(el.id),
        quantityRequested: el.quantityRequested
      })),
      folio: requestsCount + 1,
      dateRequested: new Date(Date.now()),
      delivered: false,
      dateDelivered: new Date(Date.now())
    })).ops[0];

  res.status(201).send({
    status: 'CREATED',
    request
  });
}

async function getSingle(req, res) {
  const { id } = req.params;

  const request = await DatabaseConnector.getInstance()
    .getDatabase()
    .collection('requests')
    .findOne({
      _id: ObjectID.createFromHexString(id)
    });

  res.status(200).send({
    status: 'OK',
    request
  });
}

async function put(req, res) {
  const { id } = req.params;
  const update = buildObjectFromQuery(req.body, ['delivered', 'dateDelivered']);

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
    request
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
      _id: { $in: request.items }
    })
    .toArray();

  res.status(200).send({
    status: 'OK',
    items
  });
}

async function get(req, res) {
  // Simply look for applicant's number
  let requests = (await DatabaseConnector.getInstance()
    .getDatabase()
    .collection('requests')
    .find({})
    .toArray()).map(el => ({ ...el, id: el._id }));

  return res.status(200).send({
    status: 'OK',
    requests
  });
}

module.exports = {
  post,
  getSingle,
  put,
  getApplicant,
  getItems,
  get
};
