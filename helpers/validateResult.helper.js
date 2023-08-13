const { validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (err) {

    //ARRAY TRAE LOS ERRORES PERO SE REPITEN
    //EL MAP ES PARA PODER RECORRERLOS Y ORDENARLOS POR CAMPOS
    //ESTO PARA PODER MOSTRARLO DE MANERA MAS FACIL AL USUARIO
   
    let errores = err.array()

    errores_msg = []

    errores.map(item => {
      let aux = {
        campo: item.path,
        errores: [item.msg]
      }

      const existeError = errores_msg.find(error => error.campo === aux.campo);

      if (existeError) {
        existeError.errores.push(item.msg)
      }else{
        errores_msg.push(aux)
      }

    })

    res.status(403);
    res.send({ errors: errores_msg });
  }
};

module.exports = { validateResult };
