const { conexion } = require('../config/database')

class empleadosController {

  getNominasByEmp = async (req, res) =>  {
    const { id_empleado, mes, anio} = req.body
    const [rows] = await conexion.query(`select * from nominas where mes = '${mes}'
    and anio = '${anio}' and id_empleado = ${id_empleado}`)
    res.json(rows[0])
  }

  getAnioMes = async (req, res) =>  {
    const { id_empleado} = req.params
    const [anio] = await conexion.query(`select anio from nominas where
    id_empleado = ${id_empleado} group by anio order by 'asc'`)

    const [mes] = await conexion.query(`select mes from nominas where
    id_empleado = ${id_empleado} group by mes order by 'asc'`)

    res.json({anios: anio, meses: mes})
  }

  postNominas = async (req, res) => {
    try {
      const { entregas, id_empleado, rol_id, mes} = req.body

      const [rows] = await conexion.query(`call crear_nomina('${entregas}', 
      '${id_empleado}', '${rol_id}', '${mes}')`)
      var success = false
  
      let result = []

      if (rows.length > 0) {
        result = await conexion.query(`select * from nominas where id_empleado = ${id_empleado} order by id desc limit 1`)
        success = true
      }

      console.log(result);
  
      res.json({nominas: result[0], success: success})
    }catch(e){
      console.log(e);
    }

  }

}

module.exports = new empleadosController();