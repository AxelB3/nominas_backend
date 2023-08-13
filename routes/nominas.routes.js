var express = require('express');
var router = express.Router();
const nominas  = require('../controllers/nominas.controller')
const { validateCreate, validateGet }  = require('../validations/nominas.validation')

router.get('/nomina/fechas/:id_empleado', nominas.getAnioMes);
router.post('/nomina/crear', validateCreate, nominas.postNominas);
router.post('/nomina/:id_empleado', validateGet, nominas.getNominasByEmp);

module.exports = router;
