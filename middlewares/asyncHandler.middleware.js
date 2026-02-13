/**
 * Wrapper para manejar errores en funciones async
 * Evita repetir try/catch en cada controller
 */
export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
