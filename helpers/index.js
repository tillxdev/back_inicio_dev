/**
 * Funciones helper reutilizables
 */

/**
 * Elimina propiedades undefined o null de un objeto
 */
export const cleanObject = (obj) => {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => value !== undefined && value !== null)
    );
};

/**
 * Convierte snake_case a camelCase
 */
export const snakeToCamel = (str) => {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

/**
 * Convierte camelCase a snake_case
 */
export const camelToSnake = (str) => {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
};

/**
 * Convierte claves de un objeto de snake_case a camelCase
 */
export const objectKeysToCamel = (obj) => {
    if (Array.isArray(obj)) {
        return obj.map(objectKeysToCamel);
    }
    if (obj !== null && typeof obj === 'object') {
        return Object.fromEntries(
            Object.entries(obj).map(([key, value]) => [
                snakeToCamel(key),
                objectKeysToCamel(value)
            ])
        );
    }
    return obj;
};

/**
 * Convierte claves de un objeto de camelCase a snake_case
 */
export const objectKeysToSnake = (obj) => {
    if (Array.isArray(obj)) {
        return obj.map(objectKeysToSnake);
    }
    if (obj !== null && typeof obj === 'object') {
        return Object.fromEntries(
            Object.entries(obj).map(([key, value]) => [
                camelToSnake(key),
                objectKeysToSnake(value)
            ])
        );
    }
    return obj;
};

/**
 * Genera un delay (para testing o rate limiting)
 */
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Parsea parametros de paginacion
 */
export const parsePagination = (query, defaults = { page: 1, limit: 10 }) => {
    const page = Math.max(1, parseInt(query.page) || defaults.page);
    const limit = Math.min(100, Math.max(1, parseInt(query.limit) || defaults.limit));
    const offset = (page - 1) * limit;

    return { page, limit, offset };
};

/**
 * Formatea fecha a ISO string
 */
export const formatDate = (date) => {
    if (!date) return null;
    return new Date(date).toISOString();
};
