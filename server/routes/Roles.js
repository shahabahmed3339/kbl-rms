const router = require('express').Router();
let Role1 = require('../models/roles');

router.route('/').get((req, res) => {
  Role1.find()
    .then(Roles => res.json(Roles))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const role = req.body.role;

  const newRole = new Role1({
    _id,
    role
  });

  newRole.save()
  .then(() => res.json('Role added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Role1.findById(req.params.id)
    .then(role => res.json(role))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Role1.findByIdAndDelete(req.params.id)
    .then(() => res.json('Role deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Role1.findById(req.params.id)
    .then(role => {
      role.role = req.body.role;

      role.save()
        .then(() => res.json('Role updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;