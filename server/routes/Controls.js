const router = require('express').Router();
let Vulnerability = require('../models/vulnerability.model');

router.route('/').get((req, res) => {
  Vulnerability.find()
    .then(Vulnerabilities => res.json(Vulnerabilities))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const Vulnrblt = req.body.Vulnrblt;

  const newVulnerability = new Vulnerability({
    _id,
    Vulnrblt,
  });

  newVulnerability.save()
  .then(() => res.json('Vulnerability added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Vulnerability.findById(req.params.id)
    .then(vulnerability => res.json(vulnerability))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Vulnerability.findByIdAndDelete(req.params.id)
    .then(() => res.json('Vulnerability deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Vulnerability.findById(req.params.id)
    .then(vulnerability => {
      vulnerability.Vulnrblt = req.body.Vulnrblt;

      vulnerability.save()
        .then(() => res.json('Vulnerability updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;