var express = require('express');
var router = express.Router();
const roles  = require('../controllers/roles.controller')

router.get('/roles', roles.getRoles);

module.exports = router;
