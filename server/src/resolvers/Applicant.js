function id(parent, args, context, info) {
  return parent._id;
}

function requests(parent, args, context, info) {
  return context.db
    .collection('requests')
    .find({
      _id: { $in: parent.requests }
    })
    .toArray();
}

export default {
  id,
  requests
};
