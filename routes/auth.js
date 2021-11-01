var express = require('express');
var router = express.Router();

const { signupWithPhoneNumber, signinWithPhoneNumber } = require('./../controllers/userController')
/* GET users listing. */

router.post('/signup', signupWithPhoneNumber);
router.post('/signin', signinWithPhoneNumber);


module.exports = router;
