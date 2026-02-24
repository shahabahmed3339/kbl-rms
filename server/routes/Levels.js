const router = require('express').Router();
let Level1 = require('../models/levels.model');

router.route('/').get((req, res) => {
  Level1.find()
    .then(Levels => res.json(Levels))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const Level = req.body.Level;
  const Description = req.body.Description;

  const newLevel = new Level1({
    _id,
    Level,
    Description,
  });

  newLevel.save()
  .then(() => res.json('Level added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Level1.findById(req.params.id)
    .then(level => res.json(level))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Level1.findByIdAndDelete(req.params.id)
    .then(() => res.json('Level deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Level1.findById(req.params.id)
    .then(level => {
      level.Level = req.body.Level;
      level.Description = req.body.Description;

      level.save()
        .then(() => res.json('Level updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;