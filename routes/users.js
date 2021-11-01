var express = require('express');
var router = express.Router();

const { sendSMS } = require('./../controllers/smsController');

/* GET users listing. */
router.get('/', sendSMS);

module.exports = router;
