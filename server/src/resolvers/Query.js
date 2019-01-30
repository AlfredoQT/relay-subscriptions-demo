function listItems(parent, args, context, info) {
  return context.db
    .collection('items')
    .find({})
    .toArray()
    .then(results => {
      return results.map(result => {
        const { _id: id, ...noId } = result;
        return { id, ...noId };
      });
    });
}

function listApplicants(parent, args, context, info) {
  let findFilter = {};
  if (args.filter && args.filter.registrationNumber) {
    findFilter = {
      $text: { $search: args.filter.registrationNumber }
    };
  }
  return context.db
    .collection('applicants')
    .find(findFilter)
    .toArray()
    .then(results => {
      return results.map(result => {
        const { _id: id, ...noId } = result;
        return { id, ...noId };
      });
    });
}

export default {
  listItems,
  listApplicants
};
