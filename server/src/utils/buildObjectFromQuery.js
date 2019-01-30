// @flow

function buildObjectFromQuery(input: {}, keys: Array<string>): {} {
  return keys.reduce((previousValue, currentValue) => {
    return {
      ...previousValue,
      ...(input[currentValue] && { [currentValue]: input[currentValue] })
    };
  }, {});
}

export default buildObjectFromQuery;
