/**
* Project     : Sample Vault
* Author      : Tecnologías Informáticas B - Facultad de Ingeniería - UNMdP
* License     : http://www.gnu.org/licenses/gpl.txt  GNU GPL 3.0
* Date        : Marzo 2026
*/

const db = require('../config/db');

class UserRepository 
{
    // Buscar un usuario por su nombre de usuario (incluye el nombre del rol por el JOIN en el SP)
    async findByUsername(username) 
    {
        // El SP devuelve una lista; tomamos el primer elemento del primer conjunto de resultados
        const [rows] = await db.execute('CALL sp_find_user_by_username(?)', [username]);
        return rows[0][0]; 
    }

    // Crear un nuevo usuario y asignar su rol en una sola operación atómica
    async create(username, hashedPassword, role = 'producer') 
    {
        const [rows] = await db.execute(
            'CALL sp_create_user(?, ?, ?)',
            [username, hashedPassword, role]
        );
        // El SP realiza un SELECT v_user_id as insertId al final
        return rows[0][0].insertId;
    }
    
    // Obtener todos los usuarios con sus respectivos roles
    async findAll()
    { 
        const [rows] = await db.execute('CALL sp_find_all_users()'); 
        return rows[0]; 
    }

    // Borrar un usuario (la integridad referencial se encarga de sus samples y roles)
    async delete(id) 
    {
        const [rows] = await db.execute('CALL sp_delete_user(?)', [id]);
        const result = rows[0] && rows[0][0];
        return Boolean(result && Number(result.affectedRows) > 0);
    }
}

module.exports = new UserRepository();
