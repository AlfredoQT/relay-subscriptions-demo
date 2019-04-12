"use strict";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var DatabaseConnector = require('../../utils/DatabaseConnector');

var buildObjectFromQuery = require('../../utils/buildObjectFromQuery');

var _require = require('mongodb'),
    ObjectID = _require.ObjectID;

function get(_x, _x2) {
  return _get.apply(this, arguments);
}

function _get() {
  _get = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var q, _items, items;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            q = req.query.q;

            if (!q) {
              _context.next = 7;
              break;
            }

            _context.next = 4;
            return DatabaseConnector.getInstance().getDatabase().collection('items').find({
              name: new RegExp("".concat(q.toLowerCase().replace(/[\W_]+/g, '')))
            }).toArray();

          case 4:
            _context.t0 = function (el) {
              return _objectSpread({}, el, {
                id: el._id
              });
            };

            _items = _context.sent.map(_context.t0);
            return _context.abrupt("return", res.status(200).send({
              status: 'OK',
              items: _items
            }));

          case 7:
            _context.next = 9;
            return DatabaseConnector.getInstance().getDatabase().collection('items').find({}).toArray();

          case 9:
            _context.t1 = function (el) {
              return _objectSpread({}, el, {
                id: el._id
              });
            };

            items = _context.sent.map(_context.t1);
            return _context.abrupt("return", res.status(200).send({
              status: 'OK',
              items: items
            }));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _get.apply(this, arguments);
}

function post(_x3, _x4) {
  return _post.apply(this, arguments);
}

function _post() {
  _post = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body, name, quantity, model, item, _id, itemNoId;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, quantity = _req$body.quantity, model = _req$body.model;
            _context2.next = 3;
            return DatabaseConnector.getInstance().getDatabase().collection('items').insertOne({
              name: name.toLowerCase(),
              quantity: quantity,
              model: model
            });

          case 3:
            item = _context2.sent.ops[0];
            _id = item._id, itemNoId = _objectWithoutProperties(item, ["_id"]);
            res.status(200).send({
              status: 'CREATED',
              item: _objectSpread({}, itemNoId, {
                id: _id
              })
            });

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _post.apply(this, arguments);
}

function put(_x5, _x6) {
  return _put.apply(this, arguments);
}

function _put() {
  _put = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var update, id, item, _id, itemNoId;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            update = buildObjectFromQuery(req.body, ['name', 'quantity', 'model']);
            id = req.params.id;
            _context3.next = 4;
            return DatabaseConnector.getInstance().getDatabase().collection('items').findOneAndUpdate({
              _id: ObjectID.createFromHexString(id)
            }, {
              $set: update
            }, {
              returnOriginal: false
            });

          case 4:
            item = _context3.sent.value;
            _id = item._id, itemNoId = _objectWithoutProperties(item, ["_id"]);
            res.status(200).send({
              status: 'UPDATED',
              item: _objectSpread({}, itemNoId, {
                id: _id
              })
            });

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _put.apply(this, arguments);
}

module.exports = {
  get: get,
  post: post,
  put: put
};