const router = require('express').Router();
let ProblemType1 = require('../models/problem-type.model');

router.route('/').get((req, res) => {
  ProblemType1.find()
    .then(ProblemTypes => res.json(ProblemTypes))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const ProbType = req.body.ProbType;

  const newProblemType = new ProblemType1({
    _id,
    ProbType,
  });

  newProblemType.save()
  .then(() => res.json('ProblemType added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  ProblemType1.findById(req.params.id)
    .then(problemtype => res.json(problemtype))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  ProblemType1.findByIdAndDelete(req.params.id)
    .then(() => res.json('ProblemType deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  ProblemType1.findById(req.params.id)
    .then(problemtype => {
      problemtype.ProbType = req.body.ProbType;

      problemtype.save()
        .then(() => res.json('ProblemType updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;