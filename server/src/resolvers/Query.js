function clients(parent, args, context, info) {
  return context.db
    .collection('clients')
    .find({})
    .toArray()
    .then(results => {
      return results.map(result => {
        const { _id, ...noId } = result;
        return { id: _id, ...noId };
      });
    });
}

export default {
  clients
};
