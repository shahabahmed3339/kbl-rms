const router = require('express').Router();
let Exposure = require('../models/exposure.model');

router.route('/').get((req, res) => {
  Exposure.find()
    .then(Exposures => res.json(Exposures))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const Exposr = req.body.Exposr;

  const newExposure = new Exposure({
    _id,
    Exposr,
  });

  newExposure.save()
  .then(() => res.json('Exposure added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Exposure.findById(req.params.id)
    .then(Exposure => res.json(Exposure))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Exposure.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exposure deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Exposure.findById(req.params.id)
    .then(exposure => {
      exposure.Exposr = exposure.body.Exposr;

      exposure.save()
        .then(() => res.json('Exposure updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;