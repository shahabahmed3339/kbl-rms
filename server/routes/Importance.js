const router = require('express').Router();
let Importance1 = require('../models/importance.model');

router.route('/').get((req, res) => {
  Importance1.find()
    .then(Importances => res.json(Importances))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const Importance = req.body.Importance;

  const newImportance = new Importance1({
    _id,
    Importance,
  });

  newImportance.save()
  .then(() => res.json('Importance added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Importance1.findById(req.params.id)
    .then(importance => res.json(importance))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Importance1.findByIdAndDelete(req.params.id)
    .then(() => res.json('Importance deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Importance1.findById(req.params.id)
    .then(importance => {
      importance.Importance = req.body.Importance;

      importance.save()
        .then(() => res.json('Importance updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;