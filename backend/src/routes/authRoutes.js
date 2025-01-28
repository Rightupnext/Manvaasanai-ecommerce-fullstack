const express = require('express');
const { register, login, forgetPassword, promoteRole } = require('../controllers/authController');

const router = express.Router();

// Authentication Routes
router.post('/register', register);
router.post('/login', login);
router.post('/forget-password', forgetPassword);
router.put('/promote-role', promoteRole);

module.exports = router;
