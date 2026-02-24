const router = require('express').Router();
let Application = require('../models/application.model');
const multer = require('multer');
var folderEncrypt = require('folder-encrypt');

const DIR = './applications/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        // const fileName = file.originalname.toLowerCase().split(' ').join('-');
        const fileName = file.originalname;
        cb(null, fileName)
    }
});

var upload = multer({
    storage: storage
});

router.route('/').get((req, res) => {
  Application.find()
    .then(Application => res.json(Application))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', upload.fields([{
                    name: 'CL', maxCount: 1 }, {
                    name: 'CV', maxCount: 1
                    }]), (req, res) => {
  const url = req.protocol + '://' + req.get('host')

  const newApplication = new Application({
    _id : req.body._id,
    Name : req.body.Name,
    Designation : req.body.Designation,
    Email : req.body.Email,
    Contact : req.body.Contact,
    CL : url + '/applications/' + req.files.CL[0].filename,
    CV : url + '/applications/' + req.files.CV[0].filename,
    ApplDate : req.body.ApplDate,
    Status : req.body.Status,
  });

  newApplication.save()
  .then(() => res.json('Application added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Application.findById(req.params.id)
    .then(application => res.json(application))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Application.findByIdAndDelete(req.params.id)
    .then(() => res.json('Application deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Application.findById(req.params.id)
    .then(application => {
      application.Name = req.body.Name;
      application.Designation = req.body.Designation;
      application.Email = req.body.Email;
      application.Contact = req.body.Contact;
      application.ApplDate = req.body.ApplDate;
      application.Status = req.body.Status;

      application.save()
        .then(() => res.json('Application updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;