function createClient(parent, args, context, info) {
  const { name, streetAddress, addressLine, city, zipCode } = args.input;
  return context.db
    .collection('clients')
    .insertOne({
      name,
      streetAddress,
      addressLine,
      city,
      zipCode
    })
    .then(result => {
      const { _id, ...noId } = result.ops[0];
      return { id: _id, ...noId };
    });
}

export default {
  createClient
};
