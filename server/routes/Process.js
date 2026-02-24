const router = require('express').Router();
let Process = require('../models/process.model');

router.route('/').get((req, res) => {
  Process.find()
    .then(Processes => res.json(Processes))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const Name = req.body.Name;
  const Departments = req.body.Departments;
  const Designations = req.body.Designations;
  const ProcessOwner = req.body.ProcessOwner;
  const Activities = req.body.Activities;
  const Asset = req.body.Asset;

  const newProcess = new Process({
    _id,
    Name,
    Departments,
    Designations,
    ProcessOwner,
    Activities,
    Asset,
  });

  newProcess.save()
  .then(() => res.json('Process added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Process.findById(req.params.id)
    .then(asset => res.json(asset))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Process.findByIdAndDelete(req.params.id)
    .then(() => res.json('Process deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Process.findById(req.params.id)
    .then(process => {
      process.Name = req.body.Name;
      process.Departments = req.body.Departments;
      process.Designations = req.body.Designations;
      process.ProcessOwner = req.body.ProcessOwner;
      process.Activities = req.body.Activities;
      process.Asset = req.body.Asset;

      process.save()
        .then(() => res.json('Process updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;