const router = require('express').Router();
let AssetIssue = require('../models/asset-issue.model');

router.route('/').get((req, res) => {
  AssetIssue.find()
    .then(AssetIssues => res.json(AssetIssues))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const IssuedID = req.body.IssuedID;
  const Name = req.body.Name;
  const Category = req.body.Category;
  const SubCategory = req.body.SubCategory;
  const Type = req.body.Type;
  const Department = req.body.Department;
  const Designation = req.body.Designation;
  const IssuedTo = req.body.IssuedTo;
  const Date = req.body.Date;

  const newAssetIssue = new AssetIssue({
    _id,
    IssuedID,
    Name,
    Category,
    SubCategory,
    Type,
    Department,
    Designation,
    IssuedTo,
    Date,
  });

  newAssetIssue.save()
  .then(() => res.json('Asset Issuance added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  AssetIssue.findById(req.params.id)
    .then(assetissue => res.json(assetissue))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  AssetIssue.findByIdAndDelete(req.params.id)
    .then(() => res.json('Asset Issuance deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  AssetIssue.findById(req.params.id)
    .then(assetissue => {
      assetissue.Name = req.body.Name;
      assetissue.Type = req.body.Type;
      assetissue.Category = req.body.Category;
      assetissue.SubCategory = req.body.SubCategory;
      assetissue.Department = req.body.Department;
      assetissue.Designation = req.body.Designation;
      assetissue.IssuedTo = req.body.IssuedTo;
      assetissue.Date = req.body.Date;

      assetissue.save()
        .then(() => res.json('Asset Issuance updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;