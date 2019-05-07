const router = require('express').Router();
const { requests } = require('../../controllers');

router.post('/', requests.post);
router.get('/', requests.get);
router.get('/:id', requests.getSingle);
router.put('/:id', requests.put);
router.get('/:id/applicant', requests.getApplicant);
router.get('/:id/items', requests.getItems);
router.put('/:id/items/:itemID', requests.putItem);

module.exports = {
  path: '/requests',
  router
};
