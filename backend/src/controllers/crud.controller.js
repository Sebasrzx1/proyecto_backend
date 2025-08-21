const db = require("../config/conexion_DB") //Importamos la configuracion o la conexion de la base de datos

class CrudController { //Creamos las funciones o metodos para hacer consultas 

    // Crud GET asincronico que Obtiene todos los registros de una tabla
    async obtenertodos(tabla) {
        try {
            const [resultados] = await db.query(`SELECT * FROM ${tabla}`)
            return resultados;
        } catch {
            throw error;
        }
    }


    // Crud GET que Obtiene un registro por ID
    async obteneruno(tabla, idcampo, id) {
        try {
            const [resultado] = await db.query(`SELECT * FROM ?? WHERE ?? = ?`, [tabla, idcampo, id]); //Utilizar consultas parametrizadas
            // SELECT * FROM ?? WHERE ?? = ? siginfica que los valores serán reemplazados por los elementos del array
            return resultado[0];
        }
        catch (error) {
            throw (error)
        }
    };

    // Crud POST para Crear un nuevo equipo de futbol (Nuevo registro)
    async crear(tabla, datos) {
        try {
            const [resultado] = await db.query(`INSERT INTO ?? SET ?`, [tabla, datos])
            return { ...datos, id: resultado.insertId }
        } catch (error) {
            throw error;
        }
    };


    //Crud UPDATE para actualizar un registro por ID
    async actualizar(tabla, idcampo, id, datos) {
        try {
            const [resultado] = await db.query(`UPDATE ?? SET ? WHERE ?? = ?`, [tabla, datos, idcampo, id]);
            if(resultado.affectedRows === 0){
                throw new Error('Registro no encontrado')
            }
            return await this.obteneruno(tabla,idcampo,id)

        } catch(error) {
            throw error;
        }
    }

    //Crud DELETE para eliminar un registro
    async eliminar(tabla, idcampo,id){
        try{
            const [resultado] = await db.query(`DELETE FROM ?? WHERE ?? = ?`,[tabla,idcampo,id]);
            if(resultado.affectedRows === 0){
                throw new Error ('Registro no encontrado')
            }
            return{message: 'Registro eliminado exitosamente'}
        }catch(error){
            throw error;
        }
    }   
};

module.exports = CrudController;