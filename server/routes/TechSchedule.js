const router = require('express').Router();
let TechSchedule = require('../models/tech-schedule.model');

router.route('/').get((req, res) => {
  TechSchedule.find()
    .then(techSchedules => res.json(techSchedules))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const CV = req.body.CV;
  const Name = req.body.Name;
  const Designation = req.body.Designation;
  const EvalDate = req.body.EvalDate;
  const EvalTime = req.body.EvalTime;
  const Status = req.body.Status;
  const Evaluators = req.body.Evaluators;

  const newTechSchedule = new TechSchedule({
    _id,
    CV,
    Name,
    Designation,
    EvalDate,
    EvalTime,
    Status,
    Evaluators,
  });

  newTechSchedule.save()
  .then(() => res.json('TechSchedule added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  TechSchedule.findById(req.params.id)
    .then(techschedule => res.json(techschedule))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  TechSchedule.findByIdAndDelete(req.params.id)
    .then(() => res.json('TechSchedule deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  TechSchedule.findById(req.params.id)
    .then(techschedule => {
      techschedule.CV = req.body.CV;
      techschedule.Name = req.body.Name;
      techschedule.Designation = req.body.Designation;
      techschedule.EvalDate = req.body.EvalDate;
      techschedule.EvalTime = req.body.EvalTime;
      techschedule.Status = req.body.Status;
      techschedule.Evaluators = req.body.Evaluators;

      TechSchedule.save()
        .then(() => res.json('TechSchedule updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;