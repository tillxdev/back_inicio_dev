import { Router } from 'express';
import { usuariosController } from '../controllers/usuarios.controller.js';

const router = Router();

/**
 * Rutas de Usuarios
 * Base: /api/usuarios
 */

// GET /api/usuarios - Obtener todos (con paginación opcional: ?page=1&limit=10)
router.get('/', usuariosController.getAll);

// GET /api/usuarios/:id - Obtener por ID
router.get('/:id', usuariosController.getById);

// GET /api/usuarios/firebase/:uid - Obtener por UID de Firebase
router.get('/firebase/:uid', usuariosController.getByUidFirebase);

// POST /api/usuarios - Crear usuario
router.post('/', usuariosController.create);

// PUT /api/usuarios/:id - Actualizar usuario
router.put('/:id', usuariosController.update);

// PATCH /api/usuarios/:id/login - Actualizar último login
router.patch('/:id/login', usuariosController.updateLastLogin);

// PATCH /api/usuarios/:id/deactivate - Desactivar usuario (soft delete)
router.patch('/:id/deactivate', usuariosController.deactivate);

// DELETE /api/usuarios/:id - Eliminar usuario (hard delete)
router.delete('/:id', usuariosController.delete);

export default router;
