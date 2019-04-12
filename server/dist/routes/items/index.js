"use strict";

var router = require('express').Router();

var _require = require('../../controllers'),
    items = _require.items;

router.post('/', items.post);
router.get('/', items.get);
router.put('/:id', items.put);
module.exports = {
  path: '/items',
  router: router
};