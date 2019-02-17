// @flow

function buildObjectFromQuery(input: {}, keys: Array<string>): {} {
  return keys.reduce((previousValue, currentValue) => {
    if (input[currentValue] === undefined) {
      return previousValue;
    }
    return {
      ...previousValue,
      [currentValue]: input[currentValue]
    };
  }, {});
}

export default buildObjectFromQuery;
