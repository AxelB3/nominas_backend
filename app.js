require("dotenv").config()
const http = require('http');
const express = require('express');
const cors = require("cors")
const app = express()
const empleadosRouter = require("./routes/empleados.routes")
const rolesRouter = require("./routes/roles.routes")
const nominasRouter = require("./routes/nominas.routes")

app.use(express.json())
app.use(cors())
app.use(empleadosRouter)
app.use(rolesRouter)
app.use(nominasRouter)

const PORT = 3001

http.createServer(app).listen(PORT, () => {
  console.log(`Servidor listo en el http://localhost:${PORT}`);
});
