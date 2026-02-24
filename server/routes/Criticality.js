const router = require('express').Router();
let Criticality1 = require('../models/criticality.model');

router.route('/').get((req, res) => {
  Criticality1.find()
    .then(Criticalities => res.json(Criticalities))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const Criticality = req.body.Criticality;

  const newCriticality = new Criticality1({
    _id,
    Criticality,
  });

  newCriticality.save()
  .then(() => res.json('Criticality added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Criticality1.findById(req.params.id)
    .then(criticality => res.json(criticality))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Criticality1.findByIdAndDelete(req.params.id)
    .then(() => res.json('Criticality deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Criticality1.findById(req.params.id)
    .then(criticality => {
      criticality.Criticality = req.body.Criticality;

      criticality.save()
        .then(() => res.json('Criticality updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;