function id(parent, args, context, info) {
  return parent._id;
}

function applicant(parent, args, context, info) {
  return context.db.collection('applicants').findOne({
    _id: parent.applicant
  });
}

function item(parent, args, context, info) {
  return context.db.collection('items').findOne({
    _id: parent.item
  });
}

export default {
  id,
  applicant,
  item
};
