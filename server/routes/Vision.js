const router = require('express').Router();
let Vision1 = require('../models/vision.model');

router.route('/').get((req, res) => {
  Vision1.find()
    .then(Visions => res.json(Visions))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const From = req.body.From;
  const To = req.body.To;
  const Vision = req.body.Vision;
  const Description = req.body.Description;
  const Outcome = req.body.Outcome;

  const newVision = new Vision1({
    _id,
    From,
    To,
    Vision,
    Description,
    Outcome,
  });

  newVision.save()
  .then(() => res.json('Vision added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Vision1.findById(req.params.id)
    .then(vision => res.json(vision))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Vision1.findByIdAndDelete(req.params.id)
    .then(() => res.json('Vision deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Vision1.findById(req.params.id)
    .then(vision => {
      vision.From = req.body.From;
      vision.To = req.body.To;
      vision.Vision = req.body.Vision;
      vision.Description = req.body.Description;
      vision.Outcome = req.body.Outcome;

      vision.save()
        .then(() => res.json('Vision updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;