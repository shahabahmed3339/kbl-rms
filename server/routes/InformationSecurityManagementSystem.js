const router = require('express').Router();
let ISMS = require('../models/information-security-management-system.model');

router.route('/').get((req, res) => {
  ISMS.find()
    .then(InformationSecurityManagementSystems => res.json(InformationSecurityManagementSystems))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const ClauseID = req.body.ClauseID;
  const Description = req.body.Description;

  const newISMS = new ISMS({
    _id,
    ClauseID,
    Description
  });

  newISMS.save()
  .then(() => res.json('ISMS added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  ISMS.findById(req.params.id)
    .then(isms => res.json(isms))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  ISMS.findByIdAndDelete(req.params.id)
    .then(() => res.json('ISMS deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  ISMS.findById(req.params.id)
    .then(isms => {
      isms.ClauseID = req.body.ClauseID;
      isms.Description = req.body.Description;

      isms.save()
        .then(() => res.json('ISMS updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;