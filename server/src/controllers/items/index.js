const DatabaseConnector = require('../../utils/DatabaseConnector');
const buildObjectFromQuery = require('../../utils/buildObjectFromQuery');
const { ObjectID } = require('mongodb');

async function get(req, res) {
  const { q } = req.query;

  if (q) {
    let items = (await DatabaseConnector.getInstance()
      .getDatabase()
      .collection('items')
      .find({
        name: new RegExp(`${q.toLowerCase().replace(/[\W_]+/g, '')}`)
      })
      .toArray()).map(el => ({ ...el, id: el._id }));

    return res.status(200).send({
      status: 'OK',
      items
    });
  }

  // Simply look for applicant's number
  let items = (await DatabaseConnector.getInstance()
    .getDatabase()
    .collection('items')
    .find({})
    .toArray()).map(el => ({ ...el, id: el._id }));

  return res.status(200).send({
    status: 'OK',
    items
  });
}

async function post(req, res) {
  const { name, quantity, model } = req.body;

  const item = (await DatabaseConnector.getInstance()
    .getDatabase()
    .collection('items')
    .insertOne({
      name: name.toLowerCase(),
      quantity,
      model
    })).ops[0];

  const { _id, ...itemNoId } = item;

  res.status(200).send({
    status: 'CREATED',
    item: { ...itemNoId, id: _id }
  });
}

async function put(req, res) {
  const update = buildObjectFromQuery(req.body, ['name', 'quantity', 'model']);
  const { id } = req.params;

  const item = (await DatabaseConnector.getInstance()
    .getDatabase()
    .collection('items')
    .findOneAndUpdate(
      {
        _id: ObjectID.createFromHexString(id)
      },
      { $set: update },
      {
        returnOriginal: false
      }
    )).value;

  const { _id, ...itemNoId } = item;

  res.status(200).send({
    status: 'UPDATED',
    item: { ...itemNoId, id: _id }
  });
}

module.exports = {
  get,
  post,
  put
};
