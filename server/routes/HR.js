const router = require('express').Router();
let HR = require('../models/hr.model');
const multer = require('multer');
var folderEncrypt = require('folder-encrypt');

const DIR = './images/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        // const fileName = file.originalname.toLowerCase().split(' ').join('-');
        const fileName = Date.now() + '-' + 'hr-' + req.body._id + "-" + file.originalname + '.jpg';
        cb(null, fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

router.route('/').get((req, res) => {
  HR.find()
    .then(HumanResource => res.json(HumanResource))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', upload.fields([{
                    name: 'Image', maxCount: 1 }, {
                    name: 'CNIC', maxCount: 1
                    }]), (req, res) => {
  const url = req.protocol + '://' + req.get('host')

  const newHR = new HR({
    _id : req.body._id,
    Requisition : req.body.Requisition,
    Name : req.body.Name,
    Designation : req.body.Designation,
    Department : req.body.Department,
    Level : req.body.Level,
    LineManager : req.body.LineManager,
    Image : url + '/images/' + req.files.Image[0].filename,
    CNIC : url + '/images/' + req.files.CNIC[0].filename,
    Salary : req.body.Salary,
    MedAllownce : req.body.MedAllownce,
    RentAllownce : req.body.RentAllownce,
    Miscellaneous : req.body.Miscellaneous,
    TotalSalary : req.body.TotalSalary,
    Date : req.body.Date,
    STATUS: false
  });

  newHR.save()
  .then(() => res.json('HR added!'))
  .catch(err => res.status(400).json('Error: ' + err));
  
  // folderEncrypt.encrypt({
  //   password: 'your-password',
  //   input: './images/' + req.files.Image[0].filename,
  //   output: './uploads/' + req.files.Image[0].filename
  //   }).then(() => {
  //       console.log('Image encrypted!');
  //   }).catch((err) => {
  //       console.log(err);
  //   });
  
  //   folderEncrypt.encrypt({
  //     password: 'your-password',
  //     input: './images/' + req.files.CNIC[0].filename,
  //     output: './uploads/' + req.files.CNIC[0].filename
  //     }).then(() => {
  //         console.log('CNIC encrypted!');
  //     }).catch((err) => {
  //         console.log(err);
  //     });
});

router.route('/:id').get((req, res) => {
  HR.findById(req.params.id)
    .then(hr => res.json(hr))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  HR.findByIdAndDelete(req.params.id)
    .then(() => res.json('HR deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  HR.findById(req.params.id)
    .then(hr => {
      hr.Requisition = req.body.Requisition;
      hr.Name = req.body.Name;
      hr.Department = req.body.Department;
      hr.Designation = req.body.Designation;
      hr.Level = req.body.Level;
      hr.LineManager = req.body.LineManager;
      hr.Image = req.body.Image;
      hr.CNIC = req.body.CNIC;
      hr.Salary = req.body.Salary;
      hr.MedAllownce = req.body.MedAllownce;
      hr.RentAllownce = req.body.RentAllownce;
      hr.Miscellaneous = req.body.Miscellaneous;
      hr.TotalSalary = req.body.TotalSalary;
      hr.Date = req.body.Date;
      hr.Status = req.body.Status;

      hr.save()
        .then(() => res.json('HR updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;