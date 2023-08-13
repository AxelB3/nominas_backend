const { conexion } = require('../config/database')

class rolesController {

     getRoles = async (req, res) =>  {
       const [rows] = await conexion.query('select * from roles')
       res.json(rows)
     }
   }
   
   module.exports = new rolesController();