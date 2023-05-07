const express = require('express');
const { forgotPassword, changePassword } = require('../controllers/auth/forgotPassword');
const { login } = require('../controllers/auth/login');
const { signup } = require('../controllers/auth/registration');
const { getroles } = require('../controllers/auth/users');
const { verifyemail, resendMail } = require('../controllers/auth/verification');
const router = express.Router();


router.post('/register', signup);
router.get('/verifyaccount', verifyemail);
router.post('/login', login)
router.get('/roles', getroles);
router.post('/resend', resendMail);
router.post('/forgotPassword', forgotPassword);
router.get('/changePassword', changePassword);

module.exports = router