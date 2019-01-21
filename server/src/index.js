// @flow

const capitalize = require('./utils/capitalize');

type Point2D = {
  x: number,
  y: number
};

const muhPoint: Point2D = {
  x: 1,
  y: 4
};

console.log(muhPoint.x, muhPoint.y);
console.log(capitalize('cApitalize ThIs'));
