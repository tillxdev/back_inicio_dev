/**
 * Router principal - Agrupa todas las rutas de la API
 */
import { Router } from 'express';
import usuariosRoutes from './routers/usuarios.routes.js';

const router = Router();

// Registrar rutas de módulos
router.use('/usuarios', usuariosRoutes);

// Agregar más rutas aquí:
// router.use('/productos', productosRoutes);
// router.use('/ordenes', ordenesRoutes);

export default router;
