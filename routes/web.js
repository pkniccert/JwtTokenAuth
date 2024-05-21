const express = require('express');
const { index } = require('../controller/webController');

const router = express.Router();

router.get('/', index);


module.exports = router;