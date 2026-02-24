const router = require('express').Router();
let Deduction = require('../models/deduction.model');

router.route('/').get((req, res) => {
  Deduction.find()
    .then(Deductions => res.json(Deductions))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const HRID = req.body.HRID;
  const Mobile = req.body.Mobile;
  const Damage = req.body.Damage;
  const Other = req.body.Other;
  const Miscellaneous = req.body.Miscellaneous;
  const Ariel = req.body.Ariel;
  const Deducted = req.body.Deducted;
  const Month = req.body.Month;

  const newDeduction = new Deduction({
    HRID,
    Mobile,
    Damage,
    Other,
    Miscellaneous,
    Ariel,
    Deducted,
    Month,
  });

  newDeduction.save()
  .then(() => res.json('Deduction added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Deduction.findById(req.params.id)
    .then(deduction => res.json(deduction))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Deduction.findByIdAndDelete(req.params.id)
    .then(() => res.json('Deduction deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Deduction.findById(req.params.id)
    .then(deduction => {
      deduction.HRID = req.body.HRID;
      deduction.Mobile = req.body.Mobile;
      deduction.Damage = req.body.Damage;
      deduction.Other = req.body.Other;
      deduction.Miscellaneous = req.body.Miscellaneous;
      deduction.Ariel = req.body.Ariel;
      deduction.Deducted = req.body.Deducted;
      deduction.Month = req.body.Month;

      deduction.save()
        .then(() => res.json('Deduction updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;