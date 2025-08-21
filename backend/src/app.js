const express = require('express') // esto sirve para importar express y almacenarla en una const llamada express
const cors = require('cors') // esti sirve para importar cors
const path = require('path') // esto sirve para importar path
const app = express() // Esto sirve para crear una instancia de express en una const llamada app

//midddleware
app.use(cors()); // esto sirve para habilitar el modulo CORS
app.use(express.json({limit:'50mb'})) // esto sirve para parsear el cuerpo de las peticiiones JSON 
app.use(express.urlencoded({extended: true, limit: '50mb'})) // esto sirve para parsear el cuerpo de las peticiones URL - encoded

//Rutas
app.use('/api/equipos', require('./routes/equipos.routes')); // esto sirve para importar las rutas de equipos
module.exports = app; // esto sirve para exportar la aplicación
 