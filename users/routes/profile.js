var express = require('express');
var router = express.Router();

const profile = require('../controllers/profile');

router.post('/create/', profile.create);

router.get('/get/', profile.getProfile);

router.put('/update/', profile.update);

router.post('/remove/', profile.remove);

module.exports = router;
