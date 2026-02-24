const router = require('express').Router();
let Quarter1 = require('../models/quarters.model');

router.route('/').get((req, res) => {
  Quarter1.find()
    .then(Quarters => res.json(Quarters))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const Quarter = req.body.Quarter;
  const Start = req.body.Start;
  const End = req.body.End;

  const newQuarter = new Quarter1({
    _id,
    Quarter,
    Start,
    End,
  });

  newQuarter.save()
  .then(() => res.json('Quarter added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Quarter1.findById(req.params.id)
    .then(quarter => res.json(quarter))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Quarter1.findByIdAndDelete(req.params.id)
    .then(() => res.json('Quarter deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Quarter1.findById(req.params.id)
    .then(quarter => {
      quarter.Quarter = req.body.Quarter;
      quarter.Start = req.body.Start;
      quarter.End = req.body.End;

      quarter.save()
        .then(() => res.json('Quarter updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;