const router = require('express').Router();
const { applicants } = require('../../controllers');

router.post('/', applicants.post);
router.get('/', applicants.get);
router.put('/:id', applicants.put);

module.exports = {
  path: '/applicants',
  router
};
