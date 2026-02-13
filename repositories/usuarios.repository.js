import { query } from '../database/connection.js';

/**
 * Repository de Usuarios
 * Capa de acceso a datos - solo queries SQL
 */

export const usuariosRepository = {
    /**
     * Obtiene todos los usuarios
     */
    async findAll() {
        const sql = `
            SELECT id_usuario, uid_firebase, email, fecha_creacion, ultimo_login, estado
            FROM usuarios
            WHERE estado = TRUE
            ORDER BY fecha_creacion DESC
        `;
        const result = await query(sql);
        return result.rows;
    },

    /**
     * Obtiene usuarios con paginación
     */
    async findAllPaginated(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        
        const sqlCount = `SELECT COUNT(*) FROM usuarios WHERE estado = TRUE`;
        const sqlData = `
            SELECT id_usuario, uid_firebase, email, fecha_creacion, ultimo_login, estado
            FROM usuarios
            WHERE estado = TRUE
            ORDER BY fecha_creacion DESC
            LIMIT $1 OFFSET $2
        `;
        
        const [countResult, dataResult] = await Promise.all([
            query(sqlCount),
            query(sqlData, [limit, offset])
        ]);

        return {
            data: dataResult.rows,
            total: parseInt(countResult.rows[0].count)
        };
    },

    /**
     * Busca usuario por ID
     */
    async findById(id) {
        const sql = `
            SELECT id_usuario, uid_firebase, email, fecha_creacion, ultimo_login, estado
            FROM usuarios
            WHERE id_usuario = $1
        `;
        const result = await query(sql, [id]);
        return result.rows[0] || null;
    },

    /**
     * Busca usuario por UID de Firebase
     */
    async findByUidFirebase(uidFirebase) {
        const sql = `
            SELECT id_usuario, uid_firebase, email, fecha_creacion, ultimo_login, estado
            FROM usuarios
            WHERE uid_firebase = $1
        `;
        const result = await query(sql, [uidFirebase]);
        return result.rows[0] || null;
    },

    /**
     * Busca usuario por email
     */
    async findByEmail(email) {
        const sql = `
            SELECT id_usuario, uid_firebase, email, fecha_creacion, ultimo_login, estado
            FROM usuarios
            WHERE email = $1
        `;
        const result = await query(sql, [email]);
        return result.rows[0] || null;
    },

    /**
     * Crea un nuevo usuario
     */
    async create(usuarioData) {
        const { uid_firebase, email } = usuarioData;
        const sql = `
            INSERT INTO usuarios (uid_firebase, email)
            VALUES ($1, $2)
            RETURNING id_usuario, uid_firebase, email, fecha_creacion, ultimo_login, estado
        `;
        const result = await query(sql, [uid_firebase, email]);
        return result.rows[0];
    },

    /**
     * Actualiza un usuario
     */
    async update(id, usuarioData) {
        const { email, estado } = usuarioData;
        const sql = `
            UPDATE usuarios
            SET email = COALESCE($1, email),
                estado = COALESCE($2, estado)
            WHERE id_usuario = $3
            RETURNING id_usuario, uid_firebase, email, fecha_creacion, ultimo_login, estado
        `;
        const result = await query(sql, [email, estado, id]);
        return result.rows[0] || null;
    },

    /**
     * Actualiza el último login
     */
    async updateLastLogin(id) {
        const sql = `
            UPDATE usuarios
            SET ultimo_login = NOW()
            WHERE id_usuario = $1
            RETURNING id_usuario, uid_firebase, email, fecha_creacion, ultimo_login, estado
        `;
        const result = await query(sql, [id]);
        return result.rows[0] || null;
    },

    /**
     * Soft delete - desactiva usuario
     */
    async softDelete(id) {
        const sql = `
            UPDATE usuarios
            SET estado = FALSE
            WHERE id_usuario = $1
            RETURNING id_usuario
        `;
        const result = await query(sql, [id]);
        return result.rows[0] || null;
    },

    /**
     * Hard delete - elimina permanentemente
     */
    async hardDelete(id) {
        const sql = `DELETE FROM usuarios WHERE id_usuario = $1 RETURNING id_usuario`;
        const result = await query(sql, [id]);
        return result.rows[0] || null;
    }
};
