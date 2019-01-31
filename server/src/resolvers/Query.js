function listItems(parent, args, context, info) {
  return context.db
    .collection('items')
    .find({})
    .toArray();
}

function listApplicants(parent, args, context, info) {
  let findFilter = {};
  if (args.filter && args.filter.registrationNumber) {
    const registrationNumber = args.filter.registrationNumber
      .toUpperCase()
      .replace(/[^\w\s]/g, '');
    findFilter = {
      registrationNumber: { $regex: new RegExp(registrationNumber) }
    };
  }
  return context.db
    .collection('applicants')
    .find(findFilter)
    .toArray();
}

export default {
  listItems,
  listApplicants
};
