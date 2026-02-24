const router = require('express').Router();
let Designation = require('../models/designation.model');

router.route('/').get((req, res) => {
  Designation.find()
    .then(Designations => res.json(Designations))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const Name = req.body.Name;
  const Department = req.body.Department;

  const NewDesignation = new Designation({
    _id,
    Name,
    Department,
  });

  NewDesignation.save()
  .then(() => res.json('Designation added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Designation.findById(req.params.id)
    .then(designation => res.json(designation))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Designation.findByIdAndDelete(req.params.id)
    .then(() => res.json('Designation deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Designation.findById(req.params.id)
    .then(designation => {
      designation.Name = req.body.Name;
      designation.Department = req.body.Department;

      designation.save()
        .then(() => res.json('Designation updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;