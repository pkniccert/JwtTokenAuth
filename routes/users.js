const express = require('express');
const auth = require('../middleware/auth');
const { signup, signin, getUser, logout } = require('../controller/users');

const router = express.Router();

router.post('/login', signin);
router.post('/register', signup);
router.get('/getUser', auth, getUser);
router.get('/logout', auth, logout);


module.exports = router;
