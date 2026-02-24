const router = require('express').Router();
let RiskAssessment = require('../models/risk-assessment.model');

router.route('/').get((req, res) => {
  RiskAssessment.find()
    .then(RiskAssessments => res.json(RiskAssessments))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const APType = req.body.APType;
  const APID = req.body.APID;
  const Risk_Name = req.body.Risk_Name;
  const Risk_Details = req.body.Risk_Details;
  const Vulnrblt = req.body.Vulnrblt;
  const Vulnrblt_Details = req.body.Vulnrblt_Details;
  const Exposr = req.body.Exposr;
  const Impact = req.body.Impact;
  const Probab = req.body.Probab;
  const Summary = req.body.Summary;
  const Year = req.body.Year;
  const Quarter = req.body.Quarter;
  const Date = req.body.Date;

  const newRiskAssessment = new RiskAssessment({
    _id,
    APType,
    APID,
    Risk_Name,
    Risk_Details,
    Vulnrblt,
    Vulnrblt_Details,
    Exposr,
    Impact,
    Probab,
    Summary,
    Year,
    Quarter,
    Date,
  });

  newRiskAssessment.save()
  .then(() => res.json('RiskAssessment added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  RiskAssessment.findById(req.params.id)
    .then(riskassessment => res.json(riskassessment))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  RiskAssessment.findByIdAndDelete(req.params.id)
    .then(() => res.json('RiskAssessment deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  RiskAssessment.findById(req.params.id)
    .then(riskassessment => {
      riskassessment.APType = req.body.APType;
      riskassessment.APID = req.body.APID;
      riskassessment.Risk_Name = req.body.Risk_Name;
      riskassessment.Risk_Details = req.body.Risk_Details;
      riskassessment.Vulnrblt = req.body.Vulnrblt;
      riskassessment.Vulnrblt_Details = req.body.Vulnrblt_Details;
      riskassessment.Exposr = req.body.Exposr;
      riskassessment.Impact = req.body.Impact;
      riskassessment.Probab = req.body.Probab;
      riskassessment.Summary = req.body.Summary;
      riskassessment.Year = req.body.Year;
      riskassessment.Quarter = req.body.Quarter;
      riskassessment.Date = req.body.Date;

      riskassessment.save()
        .then(() => res.json('RiskAssessment updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;