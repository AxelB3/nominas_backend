var express = require('express');
var router = express.Router();
const nominas  = require('../controllers/nominas.controller')
const { validateCreate }  = require('../validations/nominas.validation')

router.get('/nomina/fechas/:id_empleado', nominas.getAnioMes);
router.post('/nomina/:id_empleado', validateCreate, nominas.getNominasByEmp);
router.post('/nomina/crear', validateCreate, nominas.postNominas);

module.exports = router;
