const { createPool } = require("mysql2/promise");

const conexion = createPool({
  host: "localhost",
  user: "root",
  password: "*****",
  port: 3306,
  database: "nominas"
})

module.exports = {
  conexion
}