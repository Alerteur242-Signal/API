var express = require('express');
var router = express.Router();

const { sendSMS } = require('./../controllers/smsController');

/* GET home page. */
// router.get('/', sendSMS);

module.exports = router;
