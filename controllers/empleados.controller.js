const { conexion } = require('../config/database')

class empleadosController {

  getEmpleados = async (req, res) =>  {
    const [rows] = await conexion.query(`select 
    emp.id, emp.nombre, emp.ape_pat, emp.ape_mat, r.descripcion, emp.rol_id
    from empleados emp
    inner join roles r
    on r.id = emp.rol_id
    where emp.active = true `)
    res.json(rows)
  }

  postEmpleados = async (req, res) => {
    try {
      const { nombre, ape_pat, ape_mat, rol_id } = req.body

      const [rows] = await conexion.query(`call crear_empleado('${nombre}', 
      '${ape_pat}', '${ape_mat}', '${rol_id}')`)
      var success = false
  
      if (rows.length > 0) {
        success = true
      }
  
      res.json({empleados: rows[0], success: success})
    }catch(e){
      console.log(e);
    }
  }

}

module.exports = new empleadosController();