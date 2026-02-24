const router = require('express').Router();
let CaseReport = require('../models/case-report.model');

router.route('/').get((req, res) => {
  CaseReport.find()
    .then(CaseReports => res.json(CaseReports))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const Risk_ID = req.body.Risk_ID;
  const ProbType = req.body.ProbType;
  const Problem = req.body.Problem;
  const ProbDetail = req.body.ProbDetail;
  const Severity = req.body.Severity;
  const Importance = req.body.Importance;
  const ReportedBy = req.body.ReportedBy;
  const AssignedTo = req.body.AssignedTo;
  const Date = req.body.Date;
  const Status = req.body.Status;
  const Remarks = req.body.Remarks;
  const Feedback = req.body.Feedback;

  const newCaseReport = new CaseReport({
    _id,
    Risk_ID,
    ProbType,
    Problem,
    ProbDetail,
    Severity,
    Importance,
    ReportedBy,
    AssignedTo,
    Date,
    Status,
    Remarks,
    Feedback,
  });

  newCaseReport.save()
  .then(() => res.json('CaseReport added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  CaseReport.findById(req.params.id)
    .then(casereport => res.json(casereport))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  CaseReport.findByIdAndDelete(req.params.id)
    .then(() => res.json('CaseReport deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  CaseReport.findById(req.params.id)
    .then(casereport => {
      casereport.Risk_ID = req.body.Risk_ID;
      casereport.ProbType = req.body.ProbType;
      casereport.Problem = req.body.Problem;
      casereport.ProbDetail = req.body.ProbDetail;
      casereport.Severity = req.body.Severity;
      casereport.Importance = req.body.Importance;
      casereport.ReportedBy = req.body.ReportedBy;
      casereport.AssignedTo = req.body.AssignedTo;
      casereport.Date = req.body.Date;
      casereport.Status = req.body.Status;
      casereport.Remarks = req.body.Remarks;
      casereport.Feedback = req.body.Feedback;

      casereport.save()
        .then(() => res.json('CaseReport updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;