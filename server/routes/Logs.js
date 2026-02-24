const router = require('express').Router();
let Log1 = require('../models/logs.model');

router.route('/').get((req, res) => {
  Log1.find()
    .then(Logs => res.json(Logs))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const Log = req.body.Log;

  const newLog = new Log1({
    Log
  });

  newLog.save()
  .then(() => res.json('Log added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Log1.findById(req.params.id)
    .then(log => res.json(log))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Log1.findByIdAndDelete(req.params.id)
    .then(() => res.json('Log deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Log1.findById(req.params.id)
    .then(log => {
      log.Log = req.body.Log;

      log.save()
        .then(() => res.json('Log updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;