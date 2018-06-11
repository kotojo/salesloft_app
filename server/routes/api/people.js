const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.json({
    firstName: 'fake',
    lastName: 'person',
  });
});

module.exports = router;
