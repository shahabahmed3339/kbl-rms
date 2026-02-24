const router = require('express').Router();
let Severity = require('../models/severity.model');

router.route('/').get((req, res) => {
  Severity.find()
    .then(Severities => res.json(Severities))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const Severt = req.body.Severt;

  const newSeverity = new Severity({
    _id,
    Severt,
  });

  newSeverity.save()
  .then(() => res.json('Severity added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Severity.findById(req.params.id)
    .then(severity => res.json(severity))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Severity.findByIdAndDelete(req.params.id)
    .then(() => res.json('Severity deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Severity.findById(req.params.id)
    .then(severity => {
      severity.Severt = req.body.Severt;

      severity.save()
        .then(() => res.json('Severity updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;