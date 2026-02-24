const router = require('express').Router();
let RiskManagementProgram = require('../models/risk-management-program.model');

router.route('/').get((req, res) => {
  RiskManagementProgram.find()
    .then(RiskManagementPrograms => res.json(RiskManagementPrograms))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const StartYear = req.body.StartYear;
  const EndYear = req.body.EndYear;
  const Date = req.body.Date;

  const newRiskManagementProgram = new RiskManagementProgram({
    _id,
    StartYear,
    EndYear,
    Date,
  });

  newRiskManagementProgram.save()
  .then(() => res.json('RiskManagementProgram added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  RiskManagementProgram.findById(req.params.id)
    .then(riskmanagementprogram => res.json(riskmanagementprogram))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  RiskManagementProgram.findByIdAndDelete(req.params.id)
    .then(() => res.json('RiskManagementProgram deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  RiskManagementProgram.findById(req.params.id)
    .then(riskmanagementprogram => {
      riskmanagementprogram.StartYear = req.body.StartYear;
      riskmanagementprogram.EndYear = req.body.EndYear;
      riskmanagementprogram.Date = req.body.Date;

      riskmanagementprogram.save()
        .then(() => res.json('RiskManagementProgram updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;