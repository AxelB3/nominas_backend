const { check } = require("express-validator");
const { validateResult } = require('../helpers/validateResult.helper');

const validateCreate = [
  //ESTA ES UNA FUNCION PARA VALIDAR AL CREAR
  //UN EMPLEADO Y VERIFICAR QUE EL USUARIO
  // HAYA ENVIADO TODO DE MANERA CORRECTA

  check("nombre")
    .exists().withMessage('Nombre(s) no existe')
    .not()
    .isEmpty().withMessage('Nombre está vacio')
    .isAlpha('en-US', {ignore: ' '}).withMessage('Nombre(s) solo acepta carácteres sin elementos especiales'),
  
    check("ape_pat")
    .exists().withMessage('Apellido Paterno no existe')
    .not()
    .isEmpty().withMessage('Apellido Paterno está vacio')
    .isAlpha().withMessage('Apellido Paterno solo acepta carácteres sin elementos especiales'),
  
    check("ape_mat")
    .exists().withMessage('Apellido Materno no existe')
    .not()
    .isEmpty().withMessage('Apellido Materno está vacio')
    .isAlpha().withMessage('Apellido Materno solo acepta carácteres sin elementos especiales'),
  
    check("rol_id")
    .exists().withMessage('Rol no existe')
    .not()
    .isEmpty().withMessage('Rol no seleccionado')
    .isNumeric().withMessage('Rol solo acepta númericos'),
  (req, res, next) => {
     validateResult(req, res, next)
  }
];

module.exports = { validateCreate };
