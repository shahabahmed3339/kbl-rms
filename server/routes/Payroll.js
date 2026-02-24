const router = require('express').Router();
let Payroll = require('../models/payroll.model');

router.route('/').get((req, res) => {
  Payroll.find()
    .then(Payrolls => res.json(Payrolls))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const HRID = req.body.HRID;
  const Salary = req.body.Salary;
  const Tax = req.body.Tax;
  const prvFund = req.body.prvFund;
  const Month = req.body.Month;

  const newPayroll = new Payroll({
    HRID,
    Salary,
    Tax,
    prvFund,
    Month,
  });

  newPayroll.save()
  .then(() => res.json('Payroll added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Payroll.findById(req.params.id)
    .then(payroll => res.json(payroll))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Payroll.findByIdAndDelete(req.params.id)
    .then(() => res.json('Payroll deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Payroll.findById(req.params.id)
    .then(payroll => {
      payroll.HRID = req.body.HRID;
      payroll.Salary = req.body.Salary;
      payroll.Tax = req.body.Tax;
      payroll.prvFund = req.body.prvFund;
      payroll.Month = req.body.Month;

      payroll.save()
        .then(() => res.json('Payroll updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;