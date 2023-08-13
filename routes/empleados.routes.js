var express = require('express');
var router = express.Router();
const empleados  = require('../controllers/empleados.controller')
const { validateCreate }  = require('../validations/empleados.validation')

router.get('/empleados', empleados.getEmpleados);
router.post('/empleados/crear', validateCreate, empleados.postEmpleados);

module.exports = router;
