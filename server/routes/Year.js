const router = require('express').Router();
let Year1 = require('../models/year.model');

router.route('/').get((req, res) => {
  Year1.find()
    .then(Years => res.json(Years))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const Year = req.body.Year;
  const Description = req.body.Description;

  const newYear = new Year1({
    _id,
    Year,
    Description,
  });

  newYear.save()
  .then(() => res.json('Year added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Year1.findById(req.params.id)
    .then(year => res.json(year))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Year1.findByIdAndDelete(req.params.id)
    .then(() => res.json('Year deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Year1.findById(req.params.id)
    .then(year => {
      year.Year = req.body.Year;
      year.Description = req.body.Description;

      year.save()
        .then(() => res.json('Year updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;