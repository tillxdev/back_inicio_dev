import pg from 'pg';
import 'dotenv/config';

export const pool = new pg.Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME || 'database',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    min: parseInt(process.env.DB_POOL_MIN) || 2,
    max: parseInt(process.env.DB_POOL_MAX) || 10
});

// Test connection
pool.on('connect', () => {
    console.log('[DB] Connected successfully');
});

pool.on('error', (err) => {
    console.error('[DB] Unexpected error on idle client', err);
    process.exit(-1);
});

/**
 * Ejecuta una query SQL
 * @param {string} text - Query SQL
 * @param {Array} params - Parámetros de la query
 * @returns {Promise} Resultado de la query
 */
export const query = (text, params) => pool.query(text, params);

/**
 * Obtiene un cliente del pool para transacciones
 * @returns {Promise} Cliente de conexión
 */
export const getClient = () => pool.connect();
