const multer = require('multer'); //Importamos el modulo multer que nos permitira guardar los archivos subidos por los usuarios desde el frontend

//Almacenamiento en memoria
const storage = multer.memoryStorage(); //Los archivos se almacenan en la memoria en la memoria del servidor temporalmente
const upload = multer({storage}); // Configuracion de multer para usar el almacenamiento en memoria

module.exports = upload; //Exportamos el middleware para usarlo en otras partes de la aplicacion
