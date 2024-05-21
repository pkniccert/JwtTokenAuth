const express = require('express');
const auth = require('../middleware/auth');
const { index, create, unique, ipStatus, update } = require('../controller/ips');

const router = express.Router();

router.get('/ip', auth, index);
router.post('/ip/create', auth, create);
router.post('/ip/unique', auth, unique);
router.post('/ip/status', auth, ipStatus);
router.put('/ip/update/:id', auth, update);


module.exports = router;