const router = require('express').Router();
let Facility1 = require('../models/facility.model');

router.route('/').get((req, res) => {
  Facility1.find()
    .then(Facilities => res.json(Facilities))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const Facility = req.body.Facility;

  const newFacility = new Facility1({
    _id,
    Facility,
  });

  newFacility.save()
  .then(() => res.json('Facility added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Facility1.findById(req.params.id)
    .then(facility => res.json(facility))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Facility1.findByIdAndDelete(req.params.id)
    .then(() => res.json('Facility deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Facility1.findById(req.params.id)
    .then(facility => {
      facility.Facility = req.body.Facility;

      facility.save()
        .then(() => res.json('Facility updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;