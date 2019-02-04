import { toGlobalId } from '../utils/globalId';

function id(parent, args, context, info) {
  // To be able to get the type on the node
  return toGlobalId(info.parentType.name, parent._id);
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
