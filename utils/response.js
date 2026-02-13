/**
 * Utilidades para respuestas HTTP consistentes
 */

export const successResponse = (res, data, message = 'Operación exitosa', statusCode = 200) => {
    return res.status(statusCode).json({
        data,
        message
    });
};

export const createdResponse = (res, data, message = 'Recurso creado') => {
    return successResponse(res, data, message, 201);
};

export const noContentResponse = (res) => {
    return res.status(204).send();
};

export const paginatedResponse = (res, data, pagination) => {
    return res.status(200).json({
        data,
        pagination: {
            total: pagination.total,
            page: pagination.page,
            limit: pagination.limit,
            totalPages: Math.ceil(pagination.total / pagination.limit)
        }
    });
};
