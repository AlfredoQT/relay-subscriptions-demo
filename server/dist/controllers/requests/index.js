"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('mongodb'),
    ObjectID = _require.ObjectID;

var DatabaseConnector = require('../../utils/DatabaseConnector');

var buildObjectFromQuery = require('../../utils/buildObjectFromQuery');

function post(_x, _x2) {
  return _post.apply(this, arguments);
}

function _post() {
  _post = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, items, applicant, requestsCount, request;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, items = _req$body.items, applicant = _req$body.applicant;
            _context.next = 3;
            return DatabaseConnector.getInstance().getDatabase().collection('requests').count();

          case 3:
            requestsCount = _context.sent;
            _context.next = 6;
            return DatabaseConnector.getInstance().getDatabase().collection('requests').insertOne({
              applicantNumber: applicant.registrationNumber,
              applicant: ObjectID.createFromHexString(applicant.id),
              items: items.map(function (el) {
                return {
                  item: ObjectID.createFromHexString(el.id),
                  quantityRequested: el.quantityRequested
                };
              }),
              folio: requestsCount + 1,
              dateRequested: new Date(Date.now()),
              delivered: false,
              dateDelivered: new Date(Date.now())
            });

          case 6:
            request = _context.sent.ops[0];
            res.status(201).send({
              status: 'CREATED',
              request: request
            });

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _post.apply(this, arguments);
}

function getSingle(_x3, _x4) {
  return _getSingle.apply(this, arguments);
}

function _getSingle() {
  _getSingle = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var id, request;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id;
            _context2.next = 3;
            return DatabaseConnector.getInstance().getDatabase().collection('requests').findOne({
              _id: ObjectID.createFromHexString(id)
            });

          case 3:
            request = _context2.sent;
            res.status(200).send({
              status: 'OK',
              request: request
            });

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getSingle.apply(this, arguments);
}

function put(_x5, _x6) {
  return _put.apply(this, arguments);
}

function _put() {
  _put = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var id, update, request;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            update = buildObjectFromQuery(req.body, ['delivered', 'dateDelivered']);
            _context3.next = 4;
            return DatabaseConnector.getInstance().getDatabase().collection('requests').findOneAndUpdate({
              _id: ObjectID.createFromHexString(id)
            }, {
              $set: update
            }, {
              returnOriginal: false
            });

          case 4:
            request = _context3.sent.value;
            res.status(200).send({
              status: 'UPDATED',
              request: request
            });

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _put.apply(this, arguments);
}

function getApplicant(_x7, _x8) {
  return _getApplicant.apply(this, arguments);
}

function _getApplicant() {
  _getApplicant = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var id, request, applicant;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.next = 3;
            return DatabaseConnector.getInstance().getDatabase().collection('requests').findOne({
              _id: ObjectID.createFromHexString(id)
            });

          case 3:
            request = _context4.sent;
            _context4.next = 6;
            return DatabaseConnector.getInstance().getDatabase().collection('applicants').findOne({
              _id: request.applicant.id
            });

          case 6:
            applicant = _context4.sent;
            res.status(200).send({
              status: 'OK',
              applicant: applicant
            });

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _getApplicant.apply(this, arguments);
}

function getItems(_x9, _x10) {
  return _getItems.apply(this, arguments);
}

function _getItems() {
  _getItems = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var id, request, items;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.next = 3;
            return DatabaseConnector.getInstance().getDatabase().collection('requests').findOne({
              _id: ObjectID.createFromHexString(id)
            });

          case 3:
            request = _context5.sent;
            _context5.next = 6;
            return DatabaseConnector.getInstance().getDatabase().collection('items').find({
              _id: {
                $in: request.items
              }
            }).toArray();

          case 6:
            items = _context5.sent;
            res.status(200).send({
              status: 'OK',
              items: items
            });

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _getItems.apply(this, arguments);
}

function get(_x11, _x12) {
  return _get.apply(this, arguments);
}

function _get() {
  _get = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(req, res) {
    var requests;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return DatabaseConnector.getInstance().getDatabase().collection('requests').find({}).toArray();

          case 2:
            _context6.t0 = function (el) {
              return _objectSpread({}, el, {
                id: el._id
              });
            };

            requests = _context6.sent.map(_context6.t0);
            return _context6.abrupt("return", res.status(200).send({
              status: 'OK',
              requests: requests
            }));

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _get.apply(this, arguments);
}

module.exports = {
  post: post,
  getSingle: getSingle,
  put: put,
  getApplicant: getApplicant,
  getItems: getItems,
  get: get
};