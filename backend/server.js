const app = require('./src/app');
require('dotenv').config(); //Cargar las variables de entorno .env

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Mi servidor corriendo en el puerto ${PORT}`)
});