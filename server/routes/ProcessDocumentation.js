const router = require('express').Router();
let PrDoc = require('../models/process-documentation.model');

router.route('/').get((req, res) => {
  PrDoc.find()
    .then(ProcessDocumentations => res.json(ProcessDocumentations))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const PrName = req.body.PrName;
  const DocType = req.body.DocType;

  const newPrDoc = new PrDoc({
    _id,
    PrName,
    DocType,
  });

  newPrDoc.save()
  .then(() => res.json('PrDoc added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  PrDoc.findById(req.params.id)
    .then(prdoc => res.json(prdoc))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  PrDoc.findByIdAndDelete(req.params.id)
    .then(() => res.json('PrDoc deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  PrDoc.findById(req.params.id)
    .then(prdoc => {
      prdoc.PrName = req.body.PrName;
      prdoc.DocType = req.body.DocType;

      prdoc.save()
        .then(() => res.json('PrDoc updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;