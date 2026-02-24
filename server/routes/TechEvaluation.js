const router = require('express').Router();
let TechEvaluation = require('../models/tech-evaluation.model');

router.route('/').get((req, res) => {
  TechEvaluation.find()
    .then(techEvaluations => res.json(techEvaluations))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const CV = req.body.CV;
  const Name = req.body.Name;
  const Designation = req.body.Designation;
  const Status = req.body.Status;
  const Evaluator = req.body.Evaluator;
  const Feedback = req.body.Feedback;

  const newTechEvaluation = new TechEvaluation({
    _id,
    CV,
    Name,
    Designation,
    Status,
    Evaluator,
    Feedback,
  });

  newTechEvaluation.save()
  .then(() => res.json('TechEvaluation added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  TechEvaluation.findById(req.params.id)
    .then(techEvaluation => res.json(techEvaluation))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  TechEvaluation.findByIdAndDelete(req.params.id)
    .then(() => res.json('TechEvaluation deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  TechEvaluation.findById(req.params.id)
    .then(techEvaluation => {
      techEvaluation.CV = req.body.CV;
      techEvaluation.Name = req.body.Name;
      techEvaluation.Designation = req.body.Designation;
      techEvaluation.Status = req.body.Status;
      techEvaluation.Evaluator = req.body.Evaluator;
      techEvaluation.Feedback = req.body.Feedback;

      TechEvaluation.save()
        .then(() => res.json('TechEvaluation updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;