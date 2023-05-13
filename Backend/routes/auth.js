const express = require('express');
const { forgotPassword, changePassword } = require('../controllers/auth/forgotPassword');
const { login } = require('../controllers/auth/login');
const { signup, createBulkUsers } = require('../controllers/auth/registration');
const { getroles, getUsers } = require('../controllers/auth/users');
const { verifyemail, resendMail } = require('../controllers/auth/verification');
const { verifyAccessToken } = require('../middlewares/jsonwebtoken');
const router = express.Router();


router.post('/register', signup);
router.get('/verifyaccount', verifyemail);
router.post('/login', login);
router.get('/roles', getroles);
router.post('/resend', resendMail);
router.post('/forgotPassword', forgotPassword);
router.get('/changePassword', changePassword);
router.get('/getUsers', verifyAccessToken, getUsers);
// router.post('/createUsers', createBulkUsers);

module.exports = router