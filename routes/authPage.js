const express = require('express');
const auth = require('../middleware/auth');
const { dashboard, profile } = require('../controller/authPage');

const router = express.Router();

router.get('/validate-token', auth, (req, res) => {
    res.status(200).json({ 'status': 'success', 'message': 'Token is valid' });
});

router.post('/dashboard', auth, dashboard);

router.post('/profile', auth, profile);


module.exports = router;