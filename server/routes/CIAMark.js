const router = require('express').Router();
let CIAMark = require('../models/cia-mark.model');

router.route('/').get((req, res) => {
  CIAMark.find()
    .then(CIAMarks => res.json(CIAMarks))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const _id = req.body._id;
  const APID = req.body.APID;
  const APType = req.body.APType;
  const Confidentiality = req.body.Confidentiality;
  const Integrity = req.body.Integrity;
  const Availability = req.body.Availability;
  const Mult = req.body.Mult;
  const Class = req.body.Class;
  const Date = req.body.Date;

  const newCIAMark = new CIAMark({
    _id,
    APID,
    APType,
    Confidentiality,
    Integrity,
    Availability,
    Mult,
    Class,
    Date,
  });

  newCIAMark.save()
  .then(() => res.json('CIAMark added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  CIAMark.findById(req.params.id)
    .then(ciamark => res.json(ciamark))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  CIAMark.findByIdAndDelete(req.params.id)
    .then(() => res.json('CIAMark deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  CIAMark.findById(req.params.id)
    .then(ciamark => {
      ciamark.APID = req.body.APID;
      ciamark.APType = req.body.APType;
      ciamark.Confidentiality = req.body.Confidentiality;
      ciamark.Integrity = req.body.Integrity;
      ciamark.Availability = req.body.Availability;
      ciamark.Mult = req.body.Mult;
      ciamark.Class = req.body.Class;
      ciamark.Date = req.body.Date;

      ciamark.save()
        .then(() => res.json('CIAMark updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;