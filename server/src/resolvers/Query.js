function clients(parent, args, context, info) {
  return context.db
    .collection('clients')
    .find({})
    .toArray()
    .then(results => {
      return results.map(result => {
        const { _id: id, ...noId } = result;
        return { id, ...noId };
      });
    });
}

export default {
  clients
};
