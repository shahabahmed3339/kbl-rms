const router = require('express').Router();
let AsstCat = require('../models/asset-category.model');

router.route('/').get((req, res) => {
  AsstCat.find()
    .then(AssetCategory => res.json(AssetCategory))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const Name = req.body.Name;
  const Type = req.body.Type;

  const newAsstCat = new AsstCat({
    _id,
    Name,
    Type,
  });

  newAsstCat.save()
  .then(() => res.json('Asset Category added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  AsstCat.findById(req.params.id)
    .then(asstcat => res.json(asstcat))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  AsstCat.findByIdAndDelete(req.params.id)
    .then(() => res.json('Asset Category deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  AsstCat.findById(req.params.id)
    .then(asstcat => {
      asstcat.Name = req.body.Name;
      asstcat.Type = req.body.Type;

      asstcat.save()
        .then(() => res.json('Asset Category updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;