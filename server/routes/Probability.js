const router = require('express').Router();
let Probability = require('../models/probability.model');

router.route('/').get((req, res) => {
  Probability.find()
    .then(Probabilities => res.json(Probabilities))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const Probab = req.body.Probab;

  const newProbability = new Probability({
    _id,
    Probab,
  });

  newProbability.save()
  .then(() => res.json('Probability added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Probability.findById(req.params.id)
    .then(probability => res.json(probability))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Probability.findByIdAndDelete(req.params.id)
    .then(() => res.json('Probability deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Probability.findById(req.params.id)
    .then(probability => {
      probability.Probab = req.body.Probab;

      probability.save()
        .then(() => res.json('Probability updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;