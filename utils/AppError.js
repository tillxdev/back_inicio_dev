/**
 * Clase de error personalizada para la aplicación
 * Permite lanzar errores con código de estado HTTP
 */
export class AppError extends Error {
    constructor(message, statusCode = 500, code = 'ERROR') {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

// Errores comunes predefinidos
export const NotFoundError = (message = 'Recurso no encontrado') => 
    new AppError(message, 404, 'NOT_FOUND');

export const BadRequestError = (message = 'Datos inválidos') => 
    new AppError(message, 400, 'BAD_REQUEST');

export const UnauthorizedError = (message = 'No autorizado') => 
    new AppError(message, 401, 'UNAUTHORIZED');

export const ForbiddenError = (message = 'Acceso denegado') => 
    new AppError(message, 403, 'FORBIDDEN');

export const ConflictError = (message = 'El recurso ya existe') => 
    new AppError(message, 409, 'CONFLICT');
