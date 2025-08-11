const db = require("../config/conexion_DB");

class CrudController {
  // Obtener todos los registros de una tabla
  async obtenerTodos(tabla) {
    const [resultados] = await db.query(`SELECT * FROM ??`, [tabla]);
    return resultados;
  }

  // Obtener un registro por ID
  async obtenerUno(tabla, idCampo, id) {
    try {
      const [resultado] = await db.query("SELECT * FROM ?? WHERE ?? = ?", [
        tabla,
        idCampo,
        id,
      ]);
      return resultado[0];
    } catch (error) {
      throw error;
    }
  }

  // Crear un nuevo registro
  async crear(tabla, data, idCampo) {
    try {
      const [resultado] = await db.query("INSERT INTO ?? SET ?", [tabla, data]);

      if (resultado.affectedRows === 0) {
        throw new Error("Registro no creado");
      }

      const id = resultado.insertId;
      return await this.obtenerUno(tabla, idCampo, id);
    } catch (error) {
      throw error;
    }
  }

  //Actualizar un registro
  async actualizar(tabla, idcampo, id, datos) {
    try {
      const [resultado] = await db.query(`UPDATE ?? SET ? WHERE ?? = ?`, [
        tabla,
        datos,
        idcampo,
        id,
      ]);
      if (resultado.affectedRows === 0) {
        throw new Error("Registro no encontrado");
      }
      return await this.obtenerUno(tabla, idcampo, id);
    } catch (error) {
      throw error;
    }
  }

  //Eliminar un registro
  async eliminar(tabla, idCampo, id) {
    try {
      const [resultado] = await db.query(`DELETE FROM ?? WHERE ?? = ?`, [
        tabla,
        idCampo,
        id,
      ]);
      if (resultado.affectedRows === 0) {
        throw new Error("Registro no encontrado");
      }
      return { message: "Registro eliminado exitosamente" };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CrudController;
