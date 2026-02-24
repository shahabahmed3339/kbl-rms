const router = require('express').Router();
let Goal1 = require('../models/goal.model');

router.route('/').get((req, res) => {
  Goal1.find()
    .then(Goals => res.json(Goals))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const Goal = req.body.Goal;
  const Description = req.body.Description;
  const Vision = req.body.Vision;
  const Department = req.body.Department;
  const Designation = req.body.Designation;
  const StrgcCont = req.body.StrgcCont;
  const Deadline = req.body.Deadline;
  const Outcome = req.body.Outcome;

  const newGoal = new Goal1({
    _id,
    Goal,
    Description,
    Vision,
    Department,
    Designation,
    StrgcCont,
    Deadline,
    Outcome
  });

  newGoal.save()
  .then(() => res.json('Goal added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Goal1.findById(req.params.id)
    .then(goal => res.json(goal))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Goal1.findByIdAndDelete(req.params.id)
    .then(() => res.json('Goal deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Goal1.findById(req.params.id)
    .then(goal => {
      goal.Goal = req.body.Goal;
      goal.Description = req.body.Description;
      goal.Vision = req.body.Vision;
      goal.Department = req.body.Department;
      goal.Designation = req.body.Designation;
      goal.StrgcCont = req.body.StrgcCont;
      goal.Deadline = req.body.Deadline;
      goal.Outcome = req.body.Outcome;

      goal.save()
        .then(() => res.json('Goal updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;