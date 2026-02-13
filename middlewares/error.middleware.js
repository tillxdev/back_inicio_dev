/**
 * Middleware global de manejo de errores
 * Captura todos los errores y devuelve respuesta consistente
 */
export const errorMiddleware = (err, req, res, next) => {
    console.error(`[ERROR] ${err.message}`);
    console.error(err.stack);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Error interno del servidor';
    const code = err.code || 'INTERNAL_ERROR';

    res.status(statusCode).json({
        error: message,
        code: code,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};
