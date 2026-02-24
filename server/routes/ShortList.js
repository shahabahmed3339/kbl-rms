const router = require('express').Router();
let ShortList = require('../models/shortlist.model');

router.route('/').get((req, res) => {
  ShortList.find()
    .then(ShortLists => res.json(ShortLists))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const CVs = req.body.CVs;
  const Name = req.body.Name;
  const Designation = req.body.Designation;

  const newShortList = new ShortList({
    _id,
    CVs,
    Name,
    Designation,
  });

  newShortList.save()
  .then(() => res.json('ShortList added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  ShortList.findById(req.params.id)
    .then(shortlist => res.json(shortlist))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  ShortList.findByIdAndDelete(req.params.id)
    .then(() => res.json('ShortList deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  ShortList.findById(req.params.id)
    .then(shortlist => {
      shortlist.CVs = req.body.CVs;
      shortlist.Name = req.body.Name;
      shortlist.Designation = req.body.Designation;

      shortlist.save()
        .then(() => res.json('shortlist updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;