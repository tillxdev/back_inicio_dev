/**
 * Validador generico
 * Funciones de validacion reutilizables
 */

export const isEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const isNotEmpty = (value) => {
    return value !== null && value !== undefined && value !== '';
};

export const isPositiveInteger = (value) => {
    return Number.isInteger(value) && value > 0;
};

export const isString = (value) => {
    return typeof value === 'string';
};

export const hasMinLength = (value, min) => {
    return isString(value) && value.length >= min;
};

export const hasMaxLength = (value, max) => {
    return isString(value) && value.length <= max;
};

/**
 * Valida un objeto contra un esquema de reglas
 * @param {Object} data - Datos a validar
 * @param {Object} rules - Reglas de validacion { campo: [funciones] }
 * @returns {Object} { isValid: boolean, errors: [] }
 */
export const validate = (data, rules) => {
    const errors = [];

    for (const [field, validations] of Object.entries(rules)) {
        for (const validation of validations) {
            const result = validation(data[field], field);
            if (result !== true) {
                errors.push(result);
            }
        }
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

// Funciones de validacion que retornan mensaje de error
export const required = (fieldName) => (value) => {
    return isNotEmpty(value) || `${fieldName} es requerido`;
};

export const email = (fieldName) => (value) => {
    return !value || isEmail(value) || `${fieldName} debe ser un email valido`;
};

export const minLength = (min, fieldName) => (value) => {
    return !value || hasMinLength(value, min) || `${fieldName} debe tener al menos ${min} caracteres`;
};

export const maxLength = (max, fieldName) => (value) => {
    return !value || hasMaxLength(value, max) || `${fieldName} debe tener maximo ${max} caracteres`;
};
