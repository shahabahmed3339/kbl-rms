const router = require('express').Router();
let HREvaluation = require('../models/hr-evaluation.model');

router.route('/').get((req, res) => {
  HREvaluation.find()
    .then(HREvaluations => res.json(HREvaluations))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const CV = req.body.CV;
  const Name = req.body.Name;
  const Designation = req.body.Designation;
  const Status = req.body.Status;
  const Feedback = req.body.Feedback;

  const newHREvaluation = new HREvaluation({
    _id,
    CV,
    Name,
    Designation,
    Status,
    Feedback,
  });

  newHREvaluation.save()
  .then(() => res.json('HREvaluation added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  HREvaluation.findById(req.params.id)
    .then(hrevaluation => res.json(hrevaluation))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  HREvaluation.findByIdAndDelete(req.params.id)
    .then(() => res.json('HREvaluation deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  HREvaluation.findById(req.params.id)
    .then(hrevaluation => {
      hrevaluation.CV = req.body.CV;
      hrevaluation.Name = req.body.Name;
      hrevaluation.Designation = req.body.Designation;
      hrevaluation.Status = req.body.Status;
      hrevaluation.Feedback = req.body.Feedback;

      hrevaluation.save()
        .then(() => res.json('HREvaluation updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;