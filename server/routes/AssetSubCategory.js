const router = require('express').Router();
let AsstSubCat = require('../models/asset-subcategory.model');

router.route('/').get((req, res) => {
  AsstSubCat.find()
    .then(AssetSubCategory => res.json(AssetSubCategory))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const Name = req.body.Name;
  const Type = req.body.Type;
  const Category = req.body.Category;

  const newAsstSubCat = new AsstSubCat({
    _id,
    Name,
    Type,
    Category,
  });

  newAsstSubCat.save()
  .then(() => res.json('Asset Sub Category added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  AsstSubCat.findById(req.params.id)
    .then(asstsubcat => res.json(asstsubcat))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  AsstSubCat.findByIdAndDelete(req.params.id)
    .then(() => res.json('Asset Sub Category deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  AsstSubCat.findById(req.params.id)
    .then(asstsubcat => {
      asstsubcat.Name = req.body.Name;
      asstsubcat.Type = req.body.Type;

      asstsubcat.save()
        .then(() => res.json('Asset Sub Category updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;