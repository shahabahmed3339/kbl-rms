const router = require('express').Router();
let Log1 = require('../models/logs.model');

router.route('/').get((req, res) => {
  Log1.find()
    .then(Logs => res.json(Logs))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;