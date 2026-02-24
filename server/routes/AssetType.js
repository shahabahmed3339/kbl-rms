const router = require('express').Router();
let AsstType = require('../models/asset-type.model');

router.route('/').get((req, res) => {
  AsstType.find()
    .then(AssetType => res.json(AssetType))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const Name = req.body.Name;

  const newAsstType = new AsstType({
    _id,
    Name,
  });

  newAsstType.save()
  .then(() => res.json('Asset Type added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  AsstType.findById(req.params.id)
    .then(assttype => res.json(assttype))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  AsstType.findByIdAndDelete(req.params.id)
    .then(() => res.json('Asset Type deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  AsstType.findById(req.params.id)
    .then(assttype => {
      assttype.Name = req.body.Name;

      assttype.save()
        .then(() => res.json('Asset Type updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;