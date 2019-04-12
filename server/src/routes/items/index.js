const router = require('express').Router();
const { items } = require('../../controllers');

router.post('/', items.post);
router.get('/', items.get);
router.put('/:id', items.put);

module.exports = {
  path: '/items',
  router
};
