const router = require('express').Router();
let HRSchedule = require('../models/hr-schedule.model');

router.route('/').get((req, res) => {
  HRSchedule.find()
    .then(HRSchedules => res.json(HRSchedules))
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

  const newHRSchedule = new HRSchedule({
    _id,
    CV,
    Name,
    Designation,
    EvalDate,
    EvalTime,
    Status,
  });

  newHRSchedule.save()
  .then(() => res.json('HRSchedule added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  HRSchedule.findById(req.params.id)
    .then(HRschedule => res.json(HRschedule))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  HRSchedule.findByIdAndDelete(req.params.id)
    .then(() => res.json('HRSchedule deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  HRSchedule.findById(req.params.id)
    .then(HRschedule => {
      HRschedule.CV = req.body.CV;
      HRschedule.Name = req.body.Name;
      HRschedule.Designation = req.body.Designation;
      HRschedule.EvalDate = req.body.EvalDate;
      HRschedule.EvalTime = req.body.EvalTime;
      HRschedule.Status = req.body.Status;

      HRSchedule.save()
        .then(() => res.json('HRSchedule updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;