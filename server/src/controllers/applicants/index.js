const DatabaseConnector = require('../../utils/DatabaseConnector');
const buildObjectFromQuery = require('../../utils/buildObjectFromQuery');
const { ObjectID } = require('mongodb');

async function get(req, res) {
  const { q } = req.query;

  if (!q) {
    // Simply look for applicant's number
    let applicants = (await DatabaseConnector.getInstance()
      .getDatabase()
      .collection('applicants')
      .find({})
      .toArray()).map(el => ({ ...el, id: el._id }));

    return res.status(200).send({
      status: 'OK',
      applicants
    });
  }

  let applicants = (await DatabaseConnector.getInstance()
    .getDatabase()
    .collection('applicants')
    .find({
      registrationNumber: new RegExp(
        `${q.toUpperCase().replace(/[\W_]+/g, '')}`
      )
    })
    .toArray()).map(el => ({ ...el, id: el._id }));

  return res.status(200).send({
    status: 'OK',
    applicants
  });
}

async function post(req, res) {
  const { registrationNumber, name, semester } = req.body;

  const found = await DatabaseConnector.getInstance()
    .getDatabase()
    .collection('applicants')
    .findOne({
      registrationNumber: registrationNumber.toUpperCase()
    });

  if (found) {
    return res.status(404).send({
      status: 'EXISTING_APPLICANT',
      message: 'Applicant with same registration number already exists'
    });
  }

  const applicant = (await DatabaseConnector.getInstance()
    .getDatabase()
    .collection('applicants')
    .insertOne({
      name,
      registrationNumber: registrationNumber.toUpperCase(),
      semester: Number.parseInt(semester, 10)
    })).ops[0];

  const { _id, ...applicantNoId } = applicant;

  res.status(201).send({
    status: 'CREATED',
    applicant: { ...applicantNoId, id: _id }
  });
}

async function put(req, res) {
  let body = req.body;

  if (body.registrationNumber) {
    body = {
      ...body,
      registrationNumber: body.registrationNumber.toUpperCase()
    };
  }

  const update = buildObjectFromQuery(body, [
    'registrationNumber',
    'name',
    'semester'
  ]);
  const { id } = req.params;

  const applicant = (await DatabaseConnector.getInstance()
    .getDatabase()
    .collection('applicants')
    .findOneAndUpdate(
      {
        _id: ObjectID.createFromHexString(id)
      },
      { $set: update },
      {
        returnOriginal: false
      }
    )).value;

  const { _id, ...applicantNoId } = applicant;

  res.status(201).send({
    status: 'UPDATED',
    applicant: { ...applicantNoId, id: _id }
  });
}

module.exports = {
  get,
  post,
  put
};
