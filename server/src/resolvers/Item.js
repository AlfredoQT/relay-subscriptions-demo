import { toGlobalId } from '../utils/globalId';

function id(parent, args, context, info) {
  // So the node query knows the type
  return toGlobalId(info.parentType.name, parent._id);
}

function requests(parent, args, context, info) {
  return context.db
    .collection('requests')
    .find({
      _id: { $in: parent.requests }
    })
    .sort({ delivered: 1, dateRequested: -1, dateDelivered: -1 })
    .toArray();
}

export default {
  id,
  requests
};
