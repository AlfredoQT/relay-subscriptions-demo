"use strict";

var router = require('express').Router();

var _require = require('../../controllers'),
    applicants = _require.applicants;

router.post('/', applicants.post);
router.get('/', applicants.get);
router.put('/:id', applicants.put);
module.exports = {
  path: '/applicants',
  router: router
};