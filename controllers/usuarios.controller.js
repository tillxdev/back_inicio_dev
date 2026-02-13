import { usuariosService } from '../services/usuarios.service.js';
import { successResponse, createdResponse, paginatedResponse, noContentResponse } from '../utils/response.js';
import { asyncHandler } from '../middlewares/asyncHandler.middleware.js';

/**
 * Controller de Usuarios
 * Maneja requests HTTP y delega a services
 */

export const usuariosController = {
    /**
     * GET /usuarios
     * Obtiene todos los usuarios o paginados
     */
    getAll: asyncHandler(async (req, res) => {
        const { page, limit } = req.query;

        // Si hay parámetros de paginación, usar paginación
        if (page || limit) {
            const result = await usuariosService.getAllPaginated(page, limit);
            return paginatedResponse(res, result.data, {
                total: result.total,
                page: parseInt(page) || 1,
                limit: parseInt(limit) || 10
            });
        }

        // Sin paginación
        const usuarios = await usuariosService.getAll();
        return successResponse(res, usuarios, 'Usuarios obtenidos correctamente');
    }),

    /**
     * GET /usuarios/:id
     * Obtiene un usuario por ID
     */
    getById: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const usuario = await usuariosService.getById(id);
        return successResponse(res, usuario, 'Usuario obtenido correctamente');
    }),

    /**
     * GET /usuarios/firebase/:uid
     * Obtiene un usuario por UID de Firebase
     */
    getByUidFirebase: asyncHandler(async (req, res) => {
        const { uid } = req.params;
        const usuario = await usuariosService.getByUidFirebase(uid);
        return successResponse(res, usuario, 'Usuario obtenido correctamente');
    }),

    /**
     * POST /usuarios
     * Crea un nuevo usuario
     */
    create: asyncHandler(async (req, res) => {
        const usuarioData = req.body;
        const usuario = await usuariosService.create(usuarioData);
        return createdResponse(res, usuario, 'Usuario creado correctamente');
    }),

    /**
     * PUT /usuarios/:id
     * Actualiza un usuario
     */
    update: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const usuarioData = req.body;
        const usuario = await usuariosService.update(id, usuarioData);
        return successResponse(res, usuario, 'Usuario actualizado correctamente');
    }),

    /**
     * PATCH /usuarios/:id/login
     * Actualiza el último login
     */
    updateLastLogin: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const usuario = await usuariosService.updateLastLogin(id);
        return successResponse(res, usuario, 'Último login actualizado');
    }),

    /**
     * PATCH /usuarios/:id/deactivate
     * Desactiva un usuario (soft delete)
     */
    deactivate: asyncHandler(async (req, res) => {
        const { id } = req.params;
        await usuariosService.deactivate(id);
        return successResponse(res, null, 'Usuario desactivado correctamente');
    }),

    /**
     * DELETE /usuarios/:id
     * Elimina permanentemente un usuario
     */
    delete: asyncHandler(async (req, res) => {
        const { id } = req.params;
        await usuariosService.delete(id);
        return noContentResponse(res);
    })
};
