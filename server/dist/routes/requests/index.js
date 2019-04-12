"use strict";

var router = require('express').Router();

var _require = require('../../controllers'),
    requests = _require.requests;

router.post('/', requests.post);
router.get('/', requests.get);
router.get('/:id', requests.getSingle);
router.put('/:id', requests.put);
router.get('/:id/applicant', requests.getApplicant);
router.get('/:id/items', requests.getItems);
module.exports = {
  path: '/requests',
  router: router
};