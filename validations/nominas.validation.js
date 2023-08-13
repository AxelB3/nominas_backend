const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateResult.helper");

const validateCreate = [
  //ESTA ES UNA FUNCION PARA VALIDAR AL CREAR
  //UNA NOMINA Y VERIFICAR QUE EL USUARIO
  // HAYA ENVIADO TODO DE MANERA CORRECTA

  check("mes")
    .exists()
    .withMessage("Mes no existe")
    .not()
    .isEmpty()
    .withMessage("Mes no seleccionado"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateGet = [
  check("mes")
    .exists()
    .withMessage("Mes no existe")
    .not()
    .isEmpty()
    .withMessage("Mes no seleccionado"),
  check("anio")
    .exists()
    .withMessage("Año no existe")
    .not()
    .isEmpty()
    .withMessage("Año no seleccionado"),

  (req, res, next) => {
    validateResult(req, res, next);
  },
]

module.exports = { validateCreate, validateGet};
