const router = require('express').Router();
let Register = require('../models/register.model');

router.route('/').get((req, res) => {
  Register.find()
    .then(Registers => res.json(Registers))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const name = req.body.name;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const newRegister = new Register({
    _id,
    name,
    username,
    email,
    password,
  });

  newRegister.save()
  .then(() => res.json('Register added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Register.findById(req.params.id)
    .then(register => res.json(register))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Register.findByIdAndDelete(req.params.id)
    .then(() => res.json('Register deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Register.findById(req.params.id)
    .then(Register => {
      Register.name = req.body.name;
      Register.username = req.body.username;
      Register.email = req.body.email;
      Register.password = req.body.password;

      Register.save()
        .then(() => res.json('Register updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;