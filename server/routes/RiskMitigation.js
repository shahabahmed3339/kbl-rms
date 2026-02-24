const router = require('express').Router();
let RiskMitigation = require('../models/risk-mitigation.model');

router.route('/').get((req, res) => {
  RiskMitigation.find()
    .then(RiskMitigations => res.json(RiskMitigations))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const APType = req.body.APType;
  const APID = req.body.APID;
  const Risk_ID = req.body.Risk_ID;
  const Action = req.body.Action;
  const Mngmnt_System = req.body.Mngmnt_System;
  const Controls = req.body.Controls;
  const Description = req.body.Description;
  const Exposr = req.body.Exposr;
  const Impact = req.body.Impact;
  const Probab = req.body.Probab;
  const Summary = req.body.Summary;
  const Date = req.body.Date;

  const newRiskMitigation = new RiskMitigation({
    _id,
    APType,
    APID,
    Risk_ID,
    Action,
    Mngmnt_System,
    Controls,
    Description,
    Exposr,
    Impact,
    Probab,
    Summary,
    Date,
  });

  newRiskMitigation.save()
  .then(() => res.json('RiskMitigation added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  RiskMitigation.findById(req.params.id)
    .then(riskmitigation => res.json(riskmitigation))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  RiskMitigation.findByIdAndDelete(req.params.id)
    .then(() => res.json('RiskMitigation deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  RiskMitigation.findById(req.params.id)
    .then(riskmitigation => {
      riskmitigation.APType = req.body.APType;
      riskmitigation.APID = req.body.APID;
      riskmitigation.Risk_ID = req.body.Risk_ID;
      riskmitigation.Action = req.body.Action;
      riskmitigation.Mngmnt_System = req.body.Mngmnt_System;
      riskmitigation.Controls = req.body.Controls;
      riskmitigation.Description = req.body.Description;
      riskmitigation.Exposr = req.body.Exposr;
      riskmitigation.Impact = req.body.Impact;
      riskmitigation.Probab = req.body.Probab;
      riskmitigation.Summary = req.body.Summary;
      riskmitigation.Date = req.body.Date;

      RiskMitigation.save()
        .then(() => res.json('RiskMitigation updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;