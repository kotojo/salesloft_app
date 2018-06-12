const router = require('express').Router();
const peopleService = require('../../services/people_service');
const PeopleService = new peopleService();

router.get('/', async (req, res, next) => {
  const people = await PeopleService.index();
  res.json(people);
});

module.exports = router;
