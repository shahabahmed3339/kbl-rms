const router = require('express').Router();
let Requisition = require('../models/requisition.model');

router.route('/').get((req, res) => {
  Requisition.find()
    .then(Requisitions => res.json(Requisitions))
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
  const ReqsDate = req.body.ReqsDate;

  const newRequisition = new Requisition({
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
    ReqsDate,
  });

  newRequisition.save()
  .then(() => res.json('Requisition added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Requisition.findById(req.params.id)
    .then(requisition => res.json(requisition))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Requisition.findByIdAndDelete(req.params.id)
    .then(() => res.json('Requisition deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Requisition.findById(req.params.id)
    .then(requisition => {
      requisition.RequestedBy = req.body.RequestedBy;
      requisition.Department = req.body.Department;
      requisition.Designation = req.body.Designation;
      requisition.Level = req.body.Level;
      requisition.Title = req.body.Title;
      requisition.Purpose = req.body.Purpose;
      requisition.Type = req.body.Type;
      requisition.RequDate = req.body.RequDate;
      requisition.Facilities = req.body.Facilities;
      requisition.Roles = req.body.Roles;
      requisition.AsgndPrcss = req.body.AsgndPrcss;
      approval.EduCri = req.body.EduCri;
      approval.Expr = req.body.Expr;
      approval.ReqsDate = req.body.ReqsDate;

      requisition.save()
        .then(() => res.json('Requisition updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;