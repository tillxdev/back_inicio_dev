/**
 * Constantes de la aplicacion
 * Valores que no cambian durante la ejecucion
 */

// Codigos de error HTTP
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_ERROR: 500
};

// Codigos de error de la aplicacion
export const ERROR_CODES = {
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    NOT_FOUND: 'NOT_FOUND',
    UNAUTHORIZED: 'UNAUTHORIZED',
    FORBIDDEN: 'FORBIDDEN',
    CONFLICT: 'CONFLICT',
    INTERNAL_ERROR: 'INTERNAL_ERROR',
    DATABASE_ERROR: 'DATABASE_ERROR'
};

// Mensajes genericos
export const MESSAGES = {
    CREATED: 'Recurso creado correctamente',
    UPDATED: 'Recurso actualizado correctamente',
    DELETED: 'Recurso eliminado correctamente',
    NOT_FOUND: 'Recurso no encontrado',
    UNAUTHORIZED: 'No autorizado',
    FORBIDDEN: 'Acceso denegado',
    INTERNAL_ERROR: 'Error interno del servidor'
};

// Configuracion de paginacion
export const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100
};
