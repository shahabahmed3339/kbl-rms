const router = require('express').Router();
let Department = require('../models/department.model');

router.route('/').get((req, res) => {
  Department.find()
    .then(Departments => res.json(Departments))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const Name = req.body.Name;

  const newDepartment = new Department({
    _id,
    Name,
  });

  newDepartment.save()
  .then(() => res.json('Department added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Department.findById(req.params.id)
    .then(department => res.json(department))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Department.findByIdAndDelete(req.params.id)
    .then(() => res.json('Department deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Department.findById(req.params.id)
    .then(department => {
      department.Name = req.body.Name;

      department.save()
        .then(() => res.json('Department updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;