const express = require('express');
const router = express.Router();
const CrudController = require("../controllers/crud.controller")

const crud = new CrudController();
const tabla = 'equipos';
const idcampo = 'id_equipo';
//El funcionamiento de estas tablas es dirigirse al crud para dar el funcionamiento de actualizar, eliminar, crear etc.. para las tablas que ingresemos en rutas

router.get('/', async (req, res) => { //Obtener todos los registros de la tabla
    try {
        const equipos = await crud.obtenertodos(tabla);
        res.json(equipos);
    } catch (error) {
        console.error('Error al obtener los equipos: ', error)
        res.status(500).json({ error: 'Error al obtener equipos' })
    }
});

//el :id es que siempre va a apuntar a un id
router.get('/:id', async (req, res) => {//Obtener un registro por ID
    try {
        const dato = await crud.obteneruno(tabla, idcampo, req.params.id)
        res.json(dato);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el equipo' })
    }
})

//Ruta para apuntar a crear un nuevo registro
router.post('/', async (req, res) => {
    try {
        const nuevoDato = await crud.crear(tabla, req.body)
        res.status(201).json(nuevoDato)
    } catch {

    }
});

//Ruta para apuntar hacia la actualizacion de un registro
router.put('/:id', async (req, res) => {
    try {
        const actualizado = await crud.actualizar(tabla, idcampo, req.params.id, req.body)
        res.json(actualizado)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Ruta para proceder a eliminar un registro
router.delete('/:id', async(req,res)=>{
    try{
        const id = req.params.id;  
        const resultado = await crud.eliminar(tabla,idcampo,id)
        res.json(resultado) 
    }catch(error){
        if(error.message.includes('registro no encontrado')){
            res.status(404).json({error: "Dato no encontrado"})
        }else{
            res.status(500).json({error: 'Error al eliminar el dato' + error.message});
        }
    }
});

module.exports = router; // Exportar el router para usuarlo en otras partes de la aplicaion
//Este archivo define las rutas para manejar las operaciones CRUD de la tabla 'requipos' utilizando