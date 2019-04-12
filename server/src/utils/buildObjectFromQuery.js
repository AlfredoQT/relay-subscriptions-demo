// @flow

function buildObjectFromQuery(body: {}, keys: Array<String>): {} {
  return keys.reduce((previousValue, currentValue) => {
    if (body[currentValue] === undefined) {
      return previousValue;
    }
    return {
      ...previousValue,
      [currentValue]: body[currentValue]
    };
  }, {});
}

module.exports = buildObjectFromQuery;
