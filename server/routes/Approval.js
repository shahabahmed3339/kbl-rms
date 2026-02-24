const router = require('express').Router();
let Approval = require('../models/approval.model');

router.route('/').get((req, res) => {
  Approval.find()
    .then(Approvals => res.json(Approvals))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const RequestedBy = req.body.RequestedBy;
  const Department = req.body.Department;
  const Designation = req.body.Designation;
  const Level = req.body.Level;
  const Title = req.body.Title;
  const Purpose = req.body.Purpose;
  const Type = req.body.Type;
  const RequDate = req.body.RequDate;
  const Facilities = req.body.Facilities;
  const Roles = req.body.Roles;
  const AsgndPrcss = req.body.AsgndPrcss;
  const EduCri = req.body.EduCri;
  const Expr = req.body.Expr;
  const Status = req.body.Status;
  const Comments = req.body.Comments;
  const ReqsDate = req.body.ReqsDate;

  const newApproval = new Approval({
    _id,
    RequestedBy,
    Department,
    Designation,
    Level,
    Title,
    Purpose,
    Type,
    RequDate,
    Facilities,
    Roles,
    AsgndPrcss,
    EduCri,
    Expr,
    Status,
    Comments,
    ReqsDate,
  });

  newApproval.save()
  .then(() => res.json('Approval added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Approval.findById(req.params.id)
    .then(approval => res.json(approval))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Approval.findByIdAndDelete(req.params.id)
    .then(() => res.json('Approval deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Approval.findById(req.params.id)
    .then(approval => {
      approval.RequestedBy = req.body.RequestedBy;
      approval.Department = req.body.Department;
      approval.Designation = req.body.Designation;
      approval.Level = req.body.Level;
      approval.Title = req.body.Title;
      approval.Purpose = req.body.Purpose;
      approval.Type = req.body.Type;
      approval.RequDate = req.body.RequDate;
      approval.Facilities = req.body.Facilities;
      approval.Roles = req.body.Roles;
      approval.AsgndPrcss = req.body.AsgndPrcss;
      approval.EduCri = req.body.EduCri;
      approval.Expr = req.body.Expr;
      approval.Status = req.body.Status;
      approval.Comments = req.body.Comments;
      approval.ReqsDate = req.body.ReqsDate;

      approval.save()
        .then(() => res.json('Approval updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;