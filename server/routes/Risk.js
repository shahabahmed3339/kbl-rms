const router = require('express').Router();
let Risk = require('../models/risk.model');

router.route('/').get((req, res) => {
  Risk.find()
    .then(Risks => res.json(Risks))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const Risk_Name = req.body.Risk_Name;

  const newRisk = new Risk({
    _id,
    Risk_Name,
  });

  newRisk.save()
  .then(() => res.json('Risk added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Risk.findById(req.params.id)
    .then(risk => res.json(risk))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Risk.findByIdAndDelete(req.params.id)
    .then(() => res.json('Risk deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Risk.findById(req.params.id)
    .then(risk => {
      risk.Risk_Name = req.body.Risk_Name;

      risk.save()
        .then(() => res.json('Risk updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;