/* @flow */
function capitalize(phrase: string) {
  return phrase
    .split(' ')
    .map(el => `${el.slice(0, 1).toUpperCase()}${el.slice(1).toLowerCase()}`)
    .join(' ');
}

module.exports = capitalize;
