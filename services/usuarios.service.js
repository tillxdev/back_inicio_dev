import { usuariosRepository } from '../repositories/usuarios.repository.js';
import { NotFoundError, ConflictError, BadRequestError } from '../utils/AppError.js';

/**
 * Service de Usuarios
 * Capa de lógica de negocio
 */

export const usuariosService = {
    /**
     * Obtiene todos los usuarios activos
     */
    async getAll() {
        return await usuariosRepository.findAll();
    },

    /**
     * Obtiene usuarios con paginación
     */
    async getAllPaginated(page, limit) {
        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 10;

        if (pageNum < 1 || limitNum < 1 || limitNum > 100) {
            throw BadRequestError('Parámetros de paginación inválidos');
        }

        return await usuariosRepository.findAllPaginated(pageNum, limitNum);
    },

    /**
     * Obtiene un usuario por ID
     */
    async getById(id) {
        const usuario = await usuariosRepository.findById(id);
        
        if (!usuario) {
            throw NotFoundError('Usuario no encontrado');
        }
        
        return usuario;
    },

    /**
     * Obtiene un usuario por UID de Firebase
     */
    async getByUidFirebase(uidFirebase) {
        const usuario = await usuariosRepository.findByUidFirebase(uidFirebase);
        
        if (!usuario) {
            throw NotFoundError('Usuario no encontrado');
        }
        
        return usuario;
    },

    /**
     * Crea un nuevo usuario
     */
    async create(usuarioData) {
        const { uid_firebase, email } = usuarioData;

        // Validaciones básicas
        if (!uid_firebase || !email) {
            throw BadRequestError('uid_firebase y email son requeridos');
        }

        // Verificar que no exista por uid_firebase
        const existsByUid = await usuariosRepository.findByUidFirebase(uid_firebase);
        if (existsByUid) {
            throw ConflictError('Ya existe un usuario con este uid_firebase');
        }

        // Verificar que no exista por email
        const existsByEmail = await usuariosRepository.findByEmail(email);
        if (existsByEmail) {
            throw ConflictError('Ya existe un usuario con este email');
        }

        return await usuariosRepository.create(usuarioData);
    },

    /**
     * Actualiza un usuario existente
     */
    async update(id, usuarioData) {
        // Verificar que el usuario existe
        await this.getById(id);

        // Si se actualiza email, verificar que no esté en uso
        if (usuarioData.email) {
            const existsByEmail = await usuariosRepository.findByEmail(usuarioData.email);
            if (existsByEmail && existsByEmail.id_usuario !== parseInt(id)) {
                throw ConflictError('El email ya está en uso por otro usuario');
            }
        }

        const updated = await usuariosRepository.update(id, usuarioData);
        
        if (!updated) {
            throw NotFoundError('Usuario no encontrado');
        }
        
        return updated;
    },

    /**
     * Registra el último login del usuario
     */
    async updateLastLogin(id) {
        const updated = await usuariosRepository.updateLastLogin(id);
        
        if (!updated) {
            throw NotFoundError('Usuario no encontrado');
        }
        
        return updated;
    },

    /**
     * Desactiva un usuario (soft delete)
     */
    async deactivate(id) {
        // Verificar que el usuario existe
        await this.getById(id);
        
        const deleted = await usuariosRepository.softDelete(id);
        
        if (!deleted) {
            throw NotFoundError('Usuario no encontrado');
        }
        
        return deleted;
    },

    /**
     * Elimina permanentemente un usuario (hard delete)
     */
    async delete(id) {
        const deleted = await usuariosRepository.hardDelete(id);
        
        if (!deleted) {
            throw NotFoundError('Usuario no encontrado');
        }
        
        return deleted;
    }
};
