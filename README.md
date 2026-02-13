# Backend Template

Template profesional para desarrollo de APIs REST con Node.js, Express y PostgreSQL.

---

## Stack Tecnologico

| Tecnologia    | Detalle                 |
|---------------|-------------------------|
| Runtime       | Node.js (LTS)           |
| Framework     | Express                 |
| Base de datos | PostgreSQL              |
| Driver DB     | pg (node-postgres)      |
| Lenguaje      | JavaScript (ES Modules) |

Este template usa pg (conexion nativa) en lugar de un ORM. Esto brinda mayor control sobre las queries y mejor rendimiento.

---

## Estructura del Proyecto

```
backend-template/
├── constants/
│   └── index.js              # Constantes de la aplicacion
├── controllers/
│   └── *.controller.js       # Manejo de requests/responses
├── database/
│   └── connection.js         # Pool de conexiones PostgreSQL
├── helpers/
│   └── index.js              # Funciones auxiliares
├── middlewares/
│   ├── asyncHandler.middleware.js
│   └── error.middleware.js   # Manejo global de errores
├── repositories/
│   └── *.repository.js       # Acceso a datos (queries SQL)
├── routers/
│   └── *.routes.js           # Definicion de endpoints
├── services/
│   └── *.service.js          # Logica de negocio
├── utils/
│   ├── AppError.js           # Errores personalizados
│   └── response.js           # Respuestas HTTP estandarizadas
├── validators/
│   └── index.js              # Validaciones reutilizables
├── app.js                    # Configuracion de Express
├── routes.js                 # Router principal
├── server.js                 # Entry point
├── .env                      # Variables de entorno
└── .env.example              # Template de variables
```

---

## Instalacion

1. Clonar el repositorio:

```bash
git clone <url-del-repositorio>
cd backend-template
```

2. Instalar dependencias:

```bash
npm install
```

3. Configurar variables de entorno:

```bash
cp .env.example .env
```

4. Editar el archivo .env con tus credenciales:

```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=nombre_base_datos
DB_USER=postgres
DB_PASSWORD=tu_password
```

5. Crear la tabla en PostgreSQL:

```sql
CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    uid_firebase VARCHAR(128) UNIQUE NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    fecha_creacion TIMESTAMPTZ DEFAULT NOW(),
    ultimo_login TIMESTAMPTZ,
    estado BOOLEAN DEFAULT TRUE
);
```

6. Iniciar el servidor:

```bash
# Desarrollo (con hot reload)
npm run dev

# Produccion
npm start
```

---

## Uso

### Health Check

```
GET /health
```

Respuesta:
```json
{"status": "ok"}
```

### Endpoints de Usuarios

| Metodo | Endpoint                      | Descripcion                    |
|--------|-------------------------------|--------------------------------|
| GET    | /api/usuarios                 | Obtener todos los usuarios     |
| GET    | /api/usuarios?page=1&limit=10 | Obtener usuarios paginados     |
| GET    | /api/usuarios/:id             | Obtener usuario por ID         |
| GET    | /api/usuarios/firebase/:uid   | Obtener por UID de Firebase    |
| POST   | /api/usuarios                 | Crear usuario                  |
| PUT    | /api/usuarios/:id             | Actualizar usuario             |
| PATCH  | /api/usuarios/:id/login       | Actualizar ultimo login        |
| PATCH  | /api/usuarios/:id/deactivate  | Desactivar usuario             |
| DELETE | /api/usuarios/:id             | Eliminar usuario               |

### Ejemplo de Request

Crear usuario:

```bash
curl -X POST http://localhost:3000/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{"uid_firebase": "abc123", "email": "usuario@ejemplo.com"}'
```

Respuesta:

```json
{
  "data": {
    "id_usuario": 1,
    "uid_firebase": "abc123",
    "email": "usuario@ejemplo.com",
    "fecha_creacion": "2026-01-22T10:30:00.000Z",
    "ultimo_login": null,
    "estado": true
  },
  "message": "Usuario creado correctamente"
}
```

---

## Arquitectura

### Flujo de datos

```
Request -> Router -> Controller -> Service -> Repository -> Database
                                      |
Response <- Controller <- Service <---+
```

### Responsabilidades por capa

| Capa       | Responsabilidad                                  |
|------------|--------------------------------------------------|
| Router     | Define endpoints y metodos HTTP                  |
| Controller | Valida input, llama servicios, formatea response |
| Service    | Contiene logica de negocio                       |
| Repository | Ejecuta queries SQL                              |

---

## Agregar un Nuevo Modulo

1. Crear el repository en repositories/nombre.repository.js
2. Crear el service en services/nombre.service.js
3. Crear el controller en controllers/nombre.controller.js
4. Crear las routes en routers/nombre.routes.js
5. Registrar en routes.js:

```javascript
import nombreRoutes from './routers/nombre.routes.js';
router.use('/nombre', nombreRoutes);
```

---

## Formato de Respuestas

### Exito

```json
{
  "data": {},
  "message": "Operacion exitosa"
}
```

### Lista paginada

```json
{
  "data": [],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

### Error

```json
{
  "error": "Mensaje de error",
  "code": "ERROR_CODE"
}
```

---

## Manejo de Errores

El template incluye errores personalizados en utils/AppError.js:

```javascript
import { NotFoundError, BadRequestError } from './utils/AppError.js';

// Uso en services
if (!usuario) {
    throw NotFoundError('Usuario no encontrado');
}
```

Errores disponibles:

| Funcion            | Codigo HTTP | Codigo Error   |
|--------------------|-------------|----------------|
| NotFoundError      | 404         | NOT_FOUND      |
| BadRequestError    | 400         | BAD_REQUEST    |
| UnauthorizedError  | 401         | UNAUTHORIZED   |
| ForbiddenError     | 403         | FORBIDDEN      |
| ConflictError      | 409         | CONFLICT       |

---

## Cambiar Motor de Base de Datos

Este template esta disenado para PostgreSQL. Para usar otro motor:

### MySQL / MariaDB

1. Cambiar dependencia:

```bash
npm uninstall pg
npm install mysql2
```

2. Modificar database/connection.js:

```javascript
import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10
});

export const query = async (sql, params) => {
    const [rows] = await pool.execute(sql, params);
    return { rows };
};
```

3. Ajustar sintaxis SQL en los repositories segun el motor.

### SQLite

1. Instalar driver:

```bash
npm uninstall pg
npm install better-sqlite3
```

2. Modificar la conexion segun documentacion de better-sqlite3.

---

## Scripts Disponibles

| Comando       | Descripcion                        |
|---------------|------------------------------------|
| npm run dev   | Inicia servidor con hot reload     |
| npm start     | Inicia servidor en produccion      |

---

LucasEJA
