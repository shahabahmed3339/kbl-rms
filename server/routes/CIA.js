const router = require('express').Router();
let CIA = require('../models/cia.model');

router.route('/').get((req, res) => {
  CIA.find()
    .then(CIAs => res.json(CIAs))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const Confidentiality = req.body.Confidentiality;
  const Integrity = req.body.Integrity;
  const Availability = req.body.Availability;

  const newCIA = new CIA({
    _id,
    Confidentiality,
    Integrity,
    Availability,
  });

  newCIA.save()
  .then(() => res.json('CIA added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  CIA.findById(req.params.id)
    .then(cia => res.json(cia))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  CIA.findByIdAndDelete(req.params.id)
    .then(() => res.json('CIA deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  CIA.findById(req.params.id)
    .then(cia => {
      cia.Confidentiality = req.body.Confidentiality;
      cia.Integrity = req.body.Integrity;
      cia.Availability = req.body.Availability;

      cia.save()
        .then(() => res.json('CIA updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;