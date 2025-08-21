const mysql = require('mysql2/promise'); //Importar msyql2 / promise para hacer promesas
const dotenv = require('dotenv'); //Importamos dotenv para manejar variables de entorno
dotenv.config();

const pool = mysql.createPool({  //Crear un pool de conexiones a la base de datos
    host: process.env.DB_HOST, // Usar la variable de entorno que esta en el archivo .env
    user: process.env.DB_USER, // Usar la variable de entorno que esta en el archivo .env
    password: process.env.DB_PASSWORD, // Usar la variable de entorno de la contraseña de la base de datos que esta en el archivo .env
    database: process.env.DB_NAME || 'equipos_futbol', // Nombre de la base de datos que esta en el .env o una por default
    waitForConnections: true, //Esperar conexiones 
    connectionLimit: 10, //Limite de conexiones en el pool
    queueLimit: 0 //Sin limite en la cola de conexiones
});

module.exports = pool; //Exportamos el pool para usarlo en otras partes de la aplicacion
