const express = require('express');
const router = express.Router();


const { registerUser, logoutUser, loginUser ,} = require('../controllers/user.controller');

router.post('/register',   registerUser);

router.post('/login', loginUser);

router.post('/logout', logoutUser);




module.exports = router;
