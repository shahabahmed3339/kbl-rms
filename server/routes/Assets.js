const router = require('express').Router();
let Asset = require('../models/asset.model');

router.route('/').get((req, res) => {
  Asset.find()
    .then(Assets => res.json(Assets))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const Name = req.body.Name;
  const Category = req.body.Category;
  const SubCategory = req.body.SubCategory;
  const Type = req.body.Type;
  const Criticality = req.body.Criticality;
  const Remarks = req.body.Remarks;
  const Date = req.body.Date;

  const newAsset = new Asset({
    _id,
    Name,
    Category,
    SubCategory,
    Type,
    Criticality,
    Remarks,
    Date,
  });

  newAsset.save()
  .then(() => res.json('Asset added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Asset.findById(req.params.id)
    .then(asset => res.json(asset))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Asset.findByIdAndDelete(req.params.id)
    .then(() => res.json('Asset deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Asset.findById(req.params.id)
    .then(asset => {
      asset.Name = req.body.Name;
      asset.Type = req.body.Type;
      asset.Category = req.body.Category;
      asset.SubCategory = req.body.SubCategory;
      asset.Criticality = req.body.Criticality;
      asset.Remarks = req.body.Remarks;
      asset.Date = req.body.Date;

      asset.save()
        .then(() => res.json('Asset updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;