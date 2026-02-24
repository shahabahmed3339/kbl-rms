const router = require('express').Router();
let QMS = require('../models/quality-management-system.model');

router.route('/').get((req, res) => {
  QMS.find()
    .then(QualityManagementSystems => res.json(QualityManagementSystems))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const ClauseID = req.body.ClauseID;
  const Description = req.body.Description;

  const newQMS = new QMS({
    _id,
    ClauseID,
    Description
  });

  newQMS.save()
  .then(() => res.json('QMS added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  QMS.findById(req.params.id)
    .then(qms => res.json(qms))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  QMS.findByIdAndDelete(req.params.id)
    .then(() => res.json('QMS deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  QMS.findById(req.params.id)
    .then(qms => {
      qms.ClauseID = req.body.ClauseID;
      qms.Description = req.body.Description;

      qms.save()
        .then(() => res.json('QMS updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;