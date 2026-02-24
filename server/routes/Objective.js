const router = require('express').Router();
let Objective1 = require('../models/objective.model');

router.route('/').get((req, res) => {
  Objective1.find()
    .then(Objectives => res.json(Objectives))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const Objective = req.body.Objective;
  const Description = req.body.Description;
  const Goal = req.body.Goal;
  const AssignedTo = req.body.AssignedTo;
  const Resource = req.body.Resource;
  const Action = req.body.Action;
  const Deadline = req.body.Deadline;
  const ResultInEvidence = req.body.ResultInEvidence;
  const EvalFreq = req.body.EvalFreq;
  const TotalScore = req.body.TotalScore;
  const Priority = req.body.Priority;
  const Outcome = req.body.Outcome;

  const newObjective = new Objective1({
    _id,
    Objective,
    Description,
    Goal,
    AssignedTo,
    Resource,
    Action,
    Deadline,
    ResultInEvidence,
    EvalFreq,
    TotalScore,
    Priority,
    Outcome,
  });

  newObjective.save()
  .then(() => res.json('Objective added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Objective1.findById(req.params.id)
    .then(objective => res.json(objective))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Objective1.findByIdAndDelete(req.params.id)
    .then(() => res.json('Objective deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Objective1.findById(req.params.id)
    .then(objective => {
      objective.Objective = req.body.Objective;
      objective.Description = req.body.Description;
      objective.Goal = req.body.Goal;
      objective.AssignedTo = req.body.AssignedTo;
      objective.Resource = req.body.Resource;
      objective.Action = req.body.Action;
      objective.Deadline = req.body.Deadline;
      objective.ResultInEvidence = req.body.ResultInEvidence;
      objective.EvalFreq = req.body.EvalFreq;
      objective.TotalScore = req.body.TotalScore;
      objective.Priority = req.body.Priority;
      objective.Outcome = req.body.Outcome;

      objective.save()
        .then(() => res.json('Objective updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;