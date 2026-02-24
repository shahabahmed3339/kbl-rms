const router = require('express').Router();
let SMS = require('../models/service-management-system.model');

router.route('/').get((req, res) => {
  SMS.find()
    .then(ServiceManagementSystems => res.json(ServiceManagementSystems))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const ClauseID = req.body.ClauseID;
  const Description = req.body.Description;

  const newSMS = new SMS({
    _id,
    ClauseID,
    Description
  });

  newSMS.save()
  .then(() => res.json('SMS added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  SMS.findById(req.params.id)
    .then(sms => res.json(sms))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  SMS.findByIdAndDelete(req.params.id)
    .then(() => res.json('SMS deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  SMS.findById(req.params.id)
    .then(sms => {
      sms.ClauseID = req.body.ClauseID;
      sms.Description = req.body.Description;

      sms.save()
        .then(() => res.json('SMS updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;