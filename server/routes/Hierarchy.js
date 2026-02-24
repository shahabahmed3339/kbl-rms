const router = require('express').Router();
let Hierarchy = require('../models/hierarchy.model');

router.route('/').get((req, res) => {
  Hierarchy.find()
    .then(Hierarchys => res.json(Hierarchys))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const Department = req.body.Department;
  const Designation = req.body.Designation;
  const Level = req.body.Level;
  const JobDesc = req.body.JobDesc;
  const Auth = req.body.Auth;

  const newHierarchy = new Hierarchy({
    _id,
    Level,
    Department,
    Designation,
    JobDesc,
    Auth,
  });

  newHierarchy.save()
  .then(() => res.json('Hierarchy added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Hierarchy.findById(req.params.id)
    .then(hierarchy => res.json(hierarchy))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Hierarchy.findByIdAndDelete(req.params.id)
    .then(() => res.json('Hierarchy deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Hierarchy.findById(req.params.id)
    .then(hierarchy => {
      hierarchy.Department = req.body.Department;
      hierarchy.Designation = req.body.Designation;
      hierarchy.Level = req.body.Level;
      hierarchy.JobDesc = req.body.JobDesc;
      hierarchy.Auth = req.body.Auth;

      hierarchy.save()
        .then(() => res.json('Hierarchy updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;